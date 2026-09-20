import os 

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from .retriever import get_retriever

load_dotenv("app/.env")

def get_llm():
    llm = ChatGroq(
        model="openai/gpt-oss-120b",
        temperature = 0.2,
        api_key = os.getenv("GROQ_API_KEY")
    )

    return llm

def create_rag_chain(namespace):
    retriever = get_retriever(namespace)
    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
        """
        Answer the question using only the provided context.

        If the answer cannot be found in the context, say: 
        "I don't know based on the provided document."

        Context:
        {context}

        Question:
        {question}

        Answer:
        """
    )

    chain = (
        {
            "context": retriever,
            "question": RunnablePassthrough()
        }
        |prompt | llm | StrOutputParser()
    )

    return chain