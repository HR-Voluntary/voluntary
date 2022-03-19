import React from 'react'
import styles from './ChatPage.module.css';
import Chat from './Chat.js'
import {user1, user2} from './dummydata.js'


function ChatPage() {
  return (
    <div className={styles.chatBody}>
      {/* sideBar */}
      <div className={styles.sideBar}>
        <div className={styles.searchBar}>Persons...</div>
        <div className={styles.userChat}>
          <div className={styles.user}>
            <img className={styles.userPic}  alt='guy'/>
            <div className={styles.userName}>Raul Fernandez</div>
          </div>
        </div>
      </div>
      {/* Chat */}
      <Chat user1={user1} user2={user2}/>
    </div>
  )
}

export default ChatPage