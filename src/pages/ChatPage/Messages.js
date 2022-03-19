import React from 'react'

function Messages({messages}) {
  return (
    <div>
      {messages.map((message, i) => {
        return <div>{message.messageText}</div>
      })}
    </div>
  )
}

export default Messages