from fastapi import FastAPI

# models get imported
from app.db.database import Base, engine
from app.models.user import User
from app.models.message import Message
from app.models.document import Document
from app.models.conversation import Conversation
from app.api import auth
from app.api import upload

# tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(upload.router)