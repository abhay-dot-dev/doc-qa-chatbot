from .loader import load_pdf
from .splitter import split_documents
from .vectorstore import create_vectorstore
from .rag_chain import create_rag_chain

PDF_PATH = "app/uploads/test.pdf"
NAMESPACE = "test"

# loading the pdf
documents = load_pdf(PDF_PATH)
print(f"Loaded {len(documents)} pages")

# splitting into chunks
chunks = split_documents(documents)
print(f"Created {len(chunks)} chunks")

# storing chunks in pinecone
vectorstore = create_vectorstore(chunks, NAMESPACE)
print("Documents stored in Pinecone")

# create rag chain
chain = create_rag_chain(NAMESPACE)
print("RAG chain created")

# ask a question
question = "What is package for the advanced ASE role ?"

answer = chain.invoke(question)

print("\nAnswer:")
print(answer)