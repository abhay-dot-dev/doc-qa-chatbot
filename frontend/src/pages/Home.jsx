import { apiRequest } from '../services/api'
import React, { useState, useEffect } from 'react'
import ChatBox from '../components/ChatBox'
import PdfUpload from '../components/PdfUpload'
import ChatHistorySidebar from '../components/ChatHistorySidebar'

const Home = () => {

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversationMessage, setConversationMessage] = useState([]);


  async function fetchConversationMessage(conversationId) {
    const response = await apiRequest(`/history/${conversationId}`, {
      method: "GET"
    });

    setConversationMessage(response);
  }

  useEffect(() => {
    if (selectedConversationId) {
      fetchConversationMessage(selectedConversationId);
    }
  }, [selectedConversationId]);

  return (
    <div>
      <ChatHistorySidebar setSelectedConversationId={setSelectedConversationId} />
      <PdfUpload />
      <ChatBox
        conversationMessage={conversationMessage}
        selectedConversationId={selectedConversationId} />
    </div>
  )
}

export default Home