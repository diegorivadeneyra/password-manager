import pyotp

def generate_totp_secret():
    return pyotp.random_base32()

def get_totp_uri(username, secret):
    totp = pyotp.TOTP(secret)

    return totp.provisioning_uri(
        name=username,
        issuer_name="PasswordVault"
    )

def verify_totp(
    secret,
    code
):
    totp = pyotp.TOTP(secret)

    return totp.verify(code)