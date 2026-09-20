import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore

from .embeddings import get_embeddings

load_dotenv()

INDEX_NAME = "doc-qa-chatbot"
EMBEDDING_DIMENSION = 768

def get_pinecone_client():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

    if not pc.has_index(INDEX_NAME):
        pc.create_index(
            name=INDEX_NAME,
            dimension=EMBEDDING_DIMENSION,
            metric='cosine',
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    return pc

def create_vectorstore(documents, namespace):
    get_pinecone_client()
    
    embeddings = get_embeddings()

    vectorstore = PineconeVectorStore.from_documents(
        documents, 
        embedding=embeddings,
        index_name = INDEX_NAME,
        namespace=namespace
    )
    return vectorstore

def get_vectorstore(namespace):
    get_pinecone_client()

    embeddings = get_embeddings()
    vectorstore = PineconeVectorStore(
        index_name = INDEX_NAME,
        embedding = embeddings,
        namespace = namespace
    )
    return vectorstore