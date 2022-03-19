import React from 'react'

function Messages({messages}) {
  return (
    <div>
      {messages.map((message, i) => {
        return <div key={i}>{message.messageText}</div>
      })}
    </div>
  )
}

export default Messages