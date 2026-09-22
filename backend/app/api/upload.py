from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
import os
import shutil

from app.api.auth import get_db
from app.core.dependencies import get_current_user
from app.models.document import Document
from app.langchain.loader import load_pdf
from app.langchain.splitter import split_documents
from app.langchain.vectorstore import create_vectorstore

router = APIRouter()

@router.post("/upload")
def upload_pdf(file: UploadFile = File(...), current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    upload_dir = "app/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    documents = load_pdf(file_path)
    chunks = split_documents(documents)

    namespace = f"user_{current_user.id}"
    create_vectorstore(chunks, namespace)

    new_document = Document(
        user_id=current_user.id,
        filename=file.filename,
        namespace=namespace
    )

    db.add(new_document)
    db.commit()

    return {"message": f"{file.filename} uploaded successfully"}