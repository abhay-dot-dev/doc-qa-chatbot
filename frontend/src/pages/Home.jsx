import React, { useState, useEffect } from 'react'
import { apiRequest } from '../services/api'
import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'
import PdfUpload from '../components/PdfUpload'
import ChatHistorySidebar from '../components/ChatHistorySidebar'

const Home = () => {

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversationMessage, setConversationMessage] = useState([]);
  const [refreshHistory, setRefreshHistory] = useState(0);

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

  function handleRefreshHistory() {
    setRefreshHistory(previous => previous + 1);
  }

  return (
    <div>
      <Navbar/>
      <ChatHistorySidebar
        setSelectedConversationId={setSelectedConversationId}
        refreshHistory={refreshHistory}
      />
      <PdfUpload />
      <ChatBox
        conversationMessage={conversationMessage}
        selectedConversationId={selectedConversationId}
        handleRefreshHistory={handleRefreshHistory}
      />
    </div>
  )
}

export default Home