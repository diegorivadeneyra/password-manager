from pydantic import BaseModel

class UserRegister(BaseModel):
    username: str
    password: str
    secret: str

class UserLogin(BaseModel):
    username: str
    password: str

class CredentialCreate(BaseModel):
    user_id: int
    service: str
    account: str
    password: str
    secret: str

class SecretRequest(BaseModel):
    secret: str