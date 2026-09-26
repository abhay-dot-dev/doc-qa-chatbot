import React, { useEffect, useState } from 'react'
import { apiRequest } from '../services/api';

const ChatHistorySidebar = () => {

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
    }, [])
    return (
        <div>
            {
                chatHistory.map((h) => (
                    <p key={h.id}>title: {h.title}</p>
                ))
            }
        </div>
    )
}

export default ChatHistorySidebar