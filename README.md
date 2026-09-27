# 📄 DocQA Chatbot

A full-stack Document Question Answering application that allows users to upload PDF documents and ask questions about their content using a Retrieval-Augmented Generation (RAG) pipeline.

## ✨ Features

- User signup and login
- JWT-based authentication
- Protected application routes
- PDF upload
- PDF text extraction and chunking
- Hugging Face embeddings
- Pinecone vector storage
- MMR-based document retrieval
- Groq LLM for answer generation
- User-specific document namespaces
- Conversation history
- Conversation message history
- New Chat functionality
- Uploaded document list in the sidebar
- PostgreSQL persistence

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- JavaScript

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- JWT
- pwdlib

### RAG

- LangChain
- PyPDFLoader
- RecursiveCharacterTextSplitter
- Hugging Face Embeddings
- Pinecone
- Groq

## 📁 Project Structure

```text
doc-qa-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── ...
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── langchain/
│   │   ├── models/
│   │   └── schemas/
│   ├── requirements.txt
│   └── .env
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔄 RAG Workflow

```text
PDF
 ↓
PyPDFLoader
 ↓
Text Splitting
 ↓
Hugging Face Embeddings
 ↓
Pinecone
 ↓
MMR Retriever
 ↓
Prompt + Retrieved Context
 ↓
Groq LLM
 ↓
Answer
```

## ⚙️ Backend Setup

### 1. Create and activate a virtual environment

From the `backend` directory:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create:

```text
backend/app/.env
```

Add the required configuration:

```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/doc_qa_chatbot
SECRET_KEY=<your-secret-key>
PINECONE_API_KEY=<your-pinecone-api-key>
GROQ_API_KEY=<your-groq-api-key>
```

`HF_TOKEN` may be added if required by the Hugging Face setup.

Do not commit `.env` or API keys to the repository.

### 4. Start the backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## 💻 Frontend Setup

From the `frontend` directory:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🗄️ Database

The application uses PostgreSQL.

The main tables are:

- `users`
- `documents`
- `conversations`
- `messages`

Documents are associated with users, and conversations/messages are stored in PostgreSQL.

## 🔐 Authentication

Authentication uses JWT access tokens.

The frontend stores the access token in `localStorage` and sends it with protected API requests using:

```text
Authorization: Bearer <token>
```

Protected resources include user information, PDF uploads, chat, and conversation history.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and receive an access token |
| GET | `/me` | Get the authenticated user |

### Documents

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload a PDF |
| GET | `/documents` | Get the authenticated user's documents |

### Chat

| Method | Endpoint | Description |
|---|---|---|
| POST | `/chat` | Ask a question and create/continue a conversation |

### History

| Method | Endpoint | Description |
|---|---|---|
| GET | `/history` | Get the authenticated user's conversations |
| GET | `/history/{conversation_id}` | Get messages for a conversation |

## 👤 User-Specific Documents

Uploaded documents are stored in Pinecone using a user-specific namespace:

```text
user_<user_id>
```

This keeps document retrieval scoped to the authenticated user.

## ▶️ Running the Application

Start PostgreSQL first, then start the backend:

```bash
cd backend
uvicorn app.main:app --reload
```

In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open the frontend in the browser and create an account or log in.

## 🔒 Environment & Security

- Keep API keys and database credentials in `.env`.
- Do not commit secrets to Git.
- Use a strong `SECRET_KEY`.
- The backend validates authenticated users before accessing protected resources.
