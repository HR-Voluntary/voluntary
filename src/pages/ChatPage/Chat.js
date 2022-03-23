import styles from './Chat.module.css'
import React, {useState,useEffect} from 'react'
import {collection,serverTimestamp, doc, onSnapshot, orderBy, query, addDoc,setDoc} from "firebase/firestore";
import {db} from '../../firebase.js';
import Messages from './Messages';

function Chat({user1, user2}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  // console.log(user2)
  // Add a listener
  useEffect(()=> {
    if(Object.keys(user1).length && Object.keys(user2).length){
      // console.log(user2)
      const roomId = user1.uid > user2.uid ? `${user1.uid + user2.uid}` : `${user2.uid + user1.uid}`;

      const messagesDoc = collection(db, "messages", roomId, "chat");
      const q = query(messagesDoc, orderBy("createdAt", "asc"));
      let unsubscribe =onSnapshot(q, (querySnapshot) => {

        let messages = [];
        querySnapshot.forEach((doc)=>{
          messages.push(doc.data())
        });
        setMessages(messages);
      });
      return unsubscribe

    } else{
      // console.log(user2)
    }

  },[user1,user2])
  async function addMessageToConversation(){
    const roomId = user1?.uid > user2?.uid ? `${user1?.uid + user2?.uid}` : `${user2?.uid + user1?.uid}`;
    // const messagesDoc = collection(db,'messages', roomId, 'chat');
    await addDoc(collection(db, "messages", roomId, "chat"), {
      messageText,
      from: user1,
      to: user2,
      createdAt: serverTimestamp(),
      image: "",
    });
    await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {uid:user2.uid,name:user2.name,photo:user2.photo||'',lastInteracted: serverTimestamp()})
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {uid:user1.uid,name:user1.name,photo:user1.photo||'',lastInteracted: serverTimestamp()})
  }
  function onChangeTextHandler(e){
    setMessageText(e.target.value);
  }
  async function sendMessage(e) {
    e.preventDefault();
    addMessageToConversation(messageText);
    setMessageText('')
  }
  return (
    <div className={styles.messageContainer}>
      <div>
      <div></div>
      <div>{user2.name}</div>
      </div>
      <Messages loggedInUser={user1} messages={messages}></Messages>
      <form className={styles.formContainer} onSubmit={sendMessage} >
        <input className={styles.textBox} type='text' name='messageText' value={messageText} onChange={onChangeTextHandler}/>
        <input type='submit' value='submit'></input>
      </form>
    </div>

  )
}

export default Chat