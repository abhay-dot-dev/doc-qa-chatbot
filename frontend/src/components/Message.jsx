import React from 'react'

const Message = ({message}) => {
  return (
    <div>
        <p>{message.question}</p>
        <p>{message.answer}</p>
    </div>
  )
}

export default Message