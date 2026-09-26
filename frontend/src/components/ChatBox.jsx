import React, { useState, useEffect } from 'react'
import { apiRequest } from '../services/api';

const ChatBox = ({ conversationMessage, selectedConversationId }) => {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(()=>{
        if(conversationMessage.length > 0){
            const formattedMessage = [];

            for (let i = 0; i < conversationMessage.length; i+=2){
                formattedMessage.push(
                    {
                        question : conversationMessage[i].content,
                        answer : conversationMessage[i+1]?.content
                    }
                )
            }

            setMessages(formattedMessage);
        }

    }, [conversationMessage])

    useEffect(()=>{
        if (selectedConversationId) {
            setConversationId(selectedConversationId);
        }
    }, [selectedConversationId])

    async function handleSubmit() {
        try {
            if (question) {
                const response = await apiRequest("/chat", {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            conversation_id: conversationId,
                            question: question
                        }
                    )
                });

                setConversationId(response.conversation_id);

                setMessages([
                    ...messages,
                    {
                        question: question,
                        answer: response.answer
                    }
                ]);

                setQuestion("");
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Ask about your document...'
                value={question}
                onChange={(e) => setQuestion(e.target.value)} />

            <button onClick={handleSubmit}>Send →</button>

            {
                messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.question}</p>
                        <p>{message.answer}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatBox