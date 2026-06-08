from pydantic import BaseModel,EmailStr,Field

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(
        min_length=8
    )

class UserLogin(BaseModel):
    username: str
    password: str = Field(
        min_length=8
    )

class CredentialCreate(BaseModel):
    user_id: int
    service: str
    account: str
    password: str = Field(
        min_length=8
    )
    master_password: str

class SecretRequest(BaseModel):
    secret: str

class TOTPVerify(BaseModel):
    user_id: int
    credential_id: int
    code: str = Field(
        min_length=6,
        max_length=6
    )
    master_password: str