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
    <div className='h-screen overflow-hidden'>
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">

        <div className="w-72 h-full border-r bg-white flex flex-col min-h-0">
          <ChatHistorySidebar
            setSelectedConversationId={setSelectedConversationId}
            refreshHistory={refreshHistory}
          />

          <PdfUpload />
        </div>

        <div className='flex-1 flex flex-col min-w-0 bg-gray-50 p-6 gap-4'>

          <div className="flex-1 min-h-0">
            <ChatBox
              conversationMessage={conversationMessage}
              selectedConversationId={selectedConversationId}
              handleRefreshHistory={handleRefreshHistory}
            />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home