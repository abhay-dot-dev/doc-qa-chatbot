from pydantic import BaseModel
from datetime import datetime

class ConversationHistory(BaseModel):
    id : int
    title : str
    created_at : datetime

class UserHistory(BaseModel):
    user_id : int
    history : list[ConversationHistory]