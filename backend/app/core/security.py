import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from jose import JWTError, jwt
from pwdlib import PasswordHash

load_dotenv("app/.env")

# JWT Configuration
ALGORITHM = "HS256"
SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRATION_MINUTES = 30

password_hash = PasswordHash.recommended()


# created a secure hash during signup
def hash_password(password: str):
    hashed = password_hash.hash(password)
    return hashed


# used to check a login password against a stored hash
def verify_password(password: str, hashed: str):
    verified = password_hash.verify(password, hashed)
    return verified


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRATION_MINUTES
    )
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None

    return payload
