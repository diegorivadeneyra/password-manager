from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    secret_hash = Column(
        String,
        nullable=False
    )

    crypto_salt = Column(
        String,
        nullable=False
    )   

class Credential(Base):
    __tablename__ = "credentials"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    service = Column(
        String,
        nullable=False
    )

    account = Column(
        String,
        nullable=False
    )

    ciphertext = Column(
        String,
        nullable=False
    )

    nonce = Column(
        String,
        nullable=False
    )