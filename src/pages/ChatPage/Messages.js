import React,{useEffect,useRef} from 'react'
import styles from './Messages.module.css'
function Messages({loggedInUser,messages}) {
  let mesRef = useRef(null);

  let scrollToBottom = () => {
		mesRef.current.scrollTop = mesRef.current.scrollHeight;
	};
  useEffect(()=>{
    scrollToBottom()
  },[messages])

  return (

    <div ref={mesRef} className={styles.messageContainer}>
      {messages.map((message, i) => {
        return <div className={message.from.name===loggedInUser.name?styles.fromMessage: styles.toMessage} key={i}>{message.messageText}</div>
      })}
    </div>
  )
}

export default Messages