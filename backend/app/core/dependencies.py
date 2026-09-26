from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import decode_access_token
from app.models.user import User

http_bearer = HTTPBearer()

def get_current_user(credentials = Depends(http_bearer), db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")

    current_user = db.query(User).filter(User.id == int(user_id)).first()

    if current_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )
    return current_user