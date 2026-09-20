from .vectorstore import get_vectorstore

def get_retriever(namespace):
    vectorstore = get_vectorstore(namespace)

    retriever = vectorstore.as_retriever(
        search_type = "mmr",
        search_kwargs = {
            "k": 4,
            "fetch_k" : 12,
            "lambda_mult" : 0.5
        }
    )
    return retriever
