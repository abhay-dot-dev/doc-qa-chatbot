import React from 'react'
import ChatHistorySidebar from '../components/ChatHistorySidebar'
import PdfUpload from '../components/PdfUpload'
import ChatBox from '../components/ChatBox'

const Home = () => {
  return (
    <div>
        <ChatHistorySidebar/>
        <PdfUpload />
        <ChatBox />
    </div>
  )
}

export default Home