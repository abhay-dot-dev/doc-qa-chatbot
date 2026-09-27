import React, { useEffect, useState } from 'react'
import { apiRequest } from '../services/api';

const ChatHistorySidebar = ({ setSelectedConversationId, refreshHistory }) => {

    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await apiRequest("/history", {
                    method: "GET"
                });
                setChatHistory(response.history); // upading the chatHistory by usung the setter fn
            } catch (error) {
                console.error("error", error)
            }
        }
        fetchHistory();
    }, [refreshHistory])

    return (
        <div className='flex-1 min-h-0 p-4 flex flex-col'>
            <h2 className="text-md font-semibold text-gray-500 mb-3">
                Chat history
            </h2>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 hide-scrollbar">
                {
                    chatHistory.map((h) => (
                        <p
                            className='px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-200'
                            onClick={() => setSelectedConversationId(h.id)}
                            key={h.id}>
                            {h.title}
                        </p>
                    ))
                }
            </div>

            <div className="mt-4 pt-4 border-t">
                <h2 className="text-md font-semibold text-gray-500 mb-3">
                    Documents
                </h2>
            </div>
        </div>
    )
}

export default ChatHistorySidebar