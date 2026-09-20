import os

from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv("app/.env")

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index = pc.Index("vectors")

print(index.describe_index_stats())

print(pc.describe_index("vectors"))