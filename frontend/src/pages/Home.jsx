import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import AuthContext from '../context/AuthContext'
import ChatBox from '../components/ChatBox'
import PdfUpload from '../components/PdfUpload'
import ChatHistorySidebar from '../components/ChatHistorySidebar'

const Home = () => {

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversationMessage, setConversationMessage] = useState([]);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

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

  function handleLogoutUser() {
    logout();        // removes the access token 
    navigate("/login");  // navigates to login 
  }

  return (
    <div>
      <div className="logout-btn">
        <button onClick={() => handleLogoutUser()}>↪</button>
      </div>
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