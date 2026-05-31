import os
import base64

from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend


def derive_key(secret: str, crypto_salt: str):

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=crypto_salt.encode(),
        iterations=100000,
        backend=default_backend()
    )

    return kdf.derive(secret.encode())

def encrypt_password(password: str, key: bytes):

    nonce = os.urandom(12)

    aesgcm = AESGCM(key)

    ciphertext = aesgcm.encrypt(
        nonce,
        password.encode(),
        None
    )

    return (
        base64.b64encode(ciphertext).decode(),
        base64.b64encode(nonce).decode()
    )

def decrypt_password(
    ciphertext: str,
    nonce: str,
    key: bytes
):

    aesgcm = AESGCM(key)

    plaintext = aesgcm.decrypt(
        base64.b64decode(nonce),
        base64.b64decode(ciphertext),
        None
    )

    return plaintext.decode()