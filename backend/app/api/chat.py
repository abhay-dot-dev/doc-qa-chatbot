from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.api.auth import get_db
from app.core.dependencies import get_current_user
from app.models.conversation import Conversation
from app.models.message import Message
from app.schemas.chat import ChatRequest
from app.langchain.rag_chain import create_rag_chain

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest, current_user = Depends(get_current_user), db : Session = Depends(get_db)):
    if request.conversation_id is None:
        new_conversation = Conversation(
            user_id = current_user.id,
            title = request.question
        )
        db.add(new_conversation)
        db.commit()
        db.refresh(new_conversation)

        conversation = new_conversation
    else:
        existing_conversation = db.query(Conversation).filter(
            and_(
                Conversation.id == request.conversation_id,
                Conversation.user_id == current_user.id
            )
        ).first()

        if existing_conversation is None:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found"
            )

        conversation = existing_conversation

    namespace = f"user_{current_user.id}"
    chain = create_rag_chain(namespace)
    result = chain.invoke(request.question)

    new_message = Message(
        conversation_id = conversation.id,
        role = "user",
        content = request.question
    )
    db.add(new_message)

    assistant_message = Message(
        conversation_id = conversation.id,
        role = "assistant",
        content = result
    )
    db.add(assistant_message)

    db.commit()

    return {"conversation_id":conversation.id, "answer":result}
