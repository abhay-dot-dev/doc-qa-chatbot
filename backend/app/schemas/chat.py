from pydantic import BaseModel

class ChatRequest(BaseModel):
    conversation_id : int | None = None
    question : str
