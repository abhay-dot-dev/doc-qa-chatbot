from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import get_db
from app.schemas.history import UserHistory
from app.models.conversation import Conversation
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("/history", response_model=UserHistory)
def history(current_user = Depends(get_current_user), db : Session = Depends(get_db)):
    conversations = db.query(Conversation).filter(
        Conversation.user_id == current_user.id
    ).all()

    return {
        "user_id": current_user.id,
        "history": conversations
    }