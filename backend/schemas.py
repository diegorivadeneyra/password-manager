from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=8)

class UserLogin(BaseModel):
    username: str
    password: str = Field(min_length=8)

class CredentialCreate(BaseModel):
    service: str
    account: str
    password: str = Field(min_length=8)
    master_password: str
    client_secret: str

class CredentialUpdate(BaseModel):
    service: Optional[str] = None
    account: Optional[str] = None
    password: Optional[str] = Field(default=None, min_length=8)
    master_password: str
    client_secret: str

class SecretRequest(BaseModel):
    secret: str

class TOTPVerify(BaseModel):
    credential_id: int
    code: str = Field(min_length=6, max_length=6)
    master_password: str
    client_secret: str