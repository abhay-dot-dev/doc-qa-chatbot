import React from 'react'

const Message = ({ message }) => {
  return (
    <div className='flex flex-col gap-4 mb-4'>
      <p
        className='self-end bg-green-500 text-white px-4 py-2 rounded-lg max-w-[70%] wrap-break-word'>
        {message.question}
      </p>
      <p
        className='self-start bg-white border border-gray-200 px-4 py-2 rounded-lg max-w-[70%] wrap-break-word'
      >{message.answer}</p>
    </div>
  )
}

export default Message