from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# models get imported
from app.db.database import Base, engine
from app.models.user import User
from app.models.message import Message
from app.models.document import Document
from app.models.conversation import Conversation
from app.api import auth, upload, chat, history

# tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI()

# middleware to all request from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(history.router)