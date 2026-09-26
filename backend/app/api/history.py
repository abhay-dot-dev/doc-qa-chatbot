from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.api.auth import get_db
from app.schemas.history import UserHistory
from app.models.message import Message
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

@router.get("/history/{conversation_id}")
def message(conversation_id: int, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    conversation = db.query(Conversation).filter(
        and_(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id
        )
    ).first()

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="The conversation ID doesn't exist"
        )

    messages = db.query(Message).filter(Message.conversation_id == conversation.id).all()

    return messages