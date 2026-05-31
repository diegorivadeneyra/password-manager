import secrets
import models
import schemas

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
from crypto_utils import (
    derive_key,
    encrypt_password,
    decrypt_password
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

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    password_hash = hash_password(user.password)
    secret_hash = hash_password(user.secret)
    crypto_salt = secrets.token_hex(16)

    new_user = models.User(
        username=user.username,
        password_hash=password_hash,
        secret_hash=secret_hash,
        crypto_salt=crypto_salt
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User created successfully"
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

    if not verify_password(
        credential.secret,
        user.secret_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid secret"
        )

    key = derive_key(
        credential.secret,
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

@app.get("/crypto-test")
def crypto_test():

    key = derive_key(
        "MiPerroToby",
        "abc123"
    )

    ciphertext, nonce = encrypt_password(
        "PasswordGmail123",
        key
    )

    recovered = decrypt_password(
        ciphertext,
        nonce,
        key
    )

    return {
        "ciphertext": ciphertext,
        "nonce": nonce,
        "recovered": recovered
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

@app.post("/credentials/{credential_id}/decrypt")
def decrypt_credential(
    credential_id: int,
    request: schemas.SecretRequest,
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
    
    user = (
        db.query(models.User)
        .filter(
            models.User.id == credential.user_id
        )
        .first()
    )

    if not verify_password(
        request.secret,
        user.secret_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid secret"
        )
    
    key = derive_key(
        request.secret,
        user.crypto_salt
    )

    password = decrypt_password(
        credential.ciphertext,
        credential.nonce,
        key
    )

    return {
        "service": credential.service,
        "account": credential.account,
        "password": password
    }