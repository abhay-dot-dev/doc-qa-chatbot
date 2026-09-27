import React, { useState, useEffect } from 'react'
import { apiRequest } from '../services/api';
import Message from './Message.jsx'

const ChatBox = ({ conversationMessage, selectedConversationId, handleRefreshHistory }) => {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        if (conversationMessage.length > 0) {
            const formattedMessage = [];

            for (let i = 0; i < conversationMessage.length; i += 2) {
                formattedMessage.push(
                    {
                        question: conversationMessage[i].content,
                        answer: conversationMessage[i + 1]?.content
                    }
                )
            }

            setMessages(formattedMessage);
        } else {
            setMessages([]);
        }

    }, [conversationMessage])

    useEffect(() => {
        setConversationId(selectedConversationId);

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

                if (conversationId == null) {
                    // if true, that means it's new conversation, and we update the state.
                    handleRefreshHistory();
                }

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
        <div className='h-full flex flex-col'>

            <div className='flex-1 min-h-0 overflow-y-auto p-2'>
                {
                    messages.map((message, index) => (
                        <Message key={index} message={message} />
                    ))
                }
            </div>

            <div className='shrink-0 flex gap-2 border-t pt-4'>
                <input
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
                    type="text"
                    placeholder='Ask about your document...'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)} />

                <button
                    className='px-5 py-2 text-white border border-gray-300 bg-green-500 rounded-md outline-none cursor-pointer hover:bg-green-600 transition-colors duration-300'
                    onClick={handleSubmit}>Send →</button>
            </div>

        </div>
    )
}

export default ChatBox