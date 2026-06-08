import secrets
import models
import schemas
import qrcode
import io

from fastapi import FastAPI
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import Base
from database import engine
from database import get_db

from auth import hash_password
from auth import verify_password

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from crypto_utils import (
    derive_key,
    encrypt_password,
    decrypt_password
)

from totp_utils import (
    generate_totp_secret,
    get_totp_uri,
    verify_totp
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Password Manager API"
    }

@app.post("/register")
def register(
    user: schemas.UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    existing_email = (
        db.query(models.User)
        .filter(
            models.User.email ==
            user.email
        )
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    password_hash = hash_password(user.password)
    crypto_salt = secrets.token_hex(16)
    totp_secret = generate_totp_secret()
    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=password_hash,
        crypto_salt=crypto_salt,
        totp_secret=totp_secret
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User created ",
        "user_id": new_user.id
    }

@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "message": "Login successful",
        "user_id": existing_user.id,
        "username": existing_user.username
    }

@app.post("/credentials")
def create_credential(
    credential: schemas.CredentialCreate,
    db: Session = Depends(get_db)
): 
    user = (
        db.query(models.User)
        .filter(
            models.User.id == credential.user_id
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    key = derive_key(
        credential.master_password,
        user.crypto_salt
    )

    ciphertext, nonce = encrypt_password(
        credential.password,
        key
    )

    new_credential = models.Credential(
        user_id=credential.user_id,
        service=credential.service,
        account=credential.account,
        ciphertext=ciphertext,
        nonce=nonce
    )

    db.add(new_credential)
    db.commit()

    return {
        "message": "Credential stored"
    }

@app.get("/credentials/{user_id}")
def get_credentials(
    user_id: int,
    db: Session = Depends(get_db)
):

    credentials = (
        db.query(models.Credential)
        .filter(
            models.Credential.user_id == user_id
        )
        .all()
    )

    return [
        {
            "id": credential.id,
            "service": credential.service,
            "account": credential.account
        }
        for credential in credentials
    ]

@app.post("/credentials/decrypt")
def decrypt_credential(
    data: schemas.TOTPVerify,
    db: Session = Depends(get_db)
):
    user = (
        db.query(models.User)
        .filter(models.User.id == data.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    if not verify_totp(
        user.totp_secret,
        data.code
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid TOTP code"
        )
    
    credential = (
        db.query(models.Credential)
        .filter(
            models.Credential.id ==
            data.credential_id
        )
        .first()
    )

    if not credential:
        raise HTTPException(
            status_code=404,
            detail="Credential not found"
        )
    if credential.user_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    key = derive_key(
        data.master_password,
        user.crypto_salt
    )

    try:
        password = decrypt_password(
            credential.ciphertext,
            credential.nonce,
            key
        )
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid master password"
        )

    return {
        "password": password
    }

@app.delete("/credentials/{credential_id}/{user_id}")
def delete_credential(
    credential_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):

    credential = (
        db.query(models.Credential)
        .filter(
            models.Credential.id == credential_id
        )
        .first()
    )

    if not credential:
        raise HTTPException(
            status_code=404,
            detail="Credential not found"
        )
    
    if credential.user_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )

    db.delete(credential)

    db.commit()

    return {
        "message": "Deleted"
    }

@app.get("/totp/{user_id}/qr")
def get_qr(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    uri = get_totp_uri(
        user.username,
        user.totp_secret
    )

    img = qrcode.make(uri)

    buffer = io.BytesIO()

    img.save(
        buffer,
        format="PNG"
    )

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="image/png"
    )
