from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield(db)
    finally:
        db.close()

# SIGNUP
@router.post("/signup", status_code=201)
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # fetches a user object upon a successfull match.
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )
    else:
        hashed_password = hash_password(user.password)
        new_user = User(
            email = user.email, 
            password_hash = hashed_password
        )
        # adding the object to the current db session.
        db.add(new_user)
        # finally saves it to PostgreSQL DB.
        db.commit()

        return {"message": "User registered successfully"}

# LOGIN
@router.post("/login")
def login(user: UserLogin, db : Session = Depends(get_db)):
    current_user = db.query(User).filter(User.email == user.email).first()

    if current_user:
        if verify_password(user.password, current_user.password_hash):
            access_token = create_access_token(
                {"sub": str(current_user.id)}
            )
            return {"message":"Login sucessfull", "access_token": access_token}
        else:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )