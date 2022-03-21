import styles from './Chat.module.css'
import styles2 from './Messages.module.css'
import React, {useState,useEffect,useRef} from 'react'
import {collection,serverTimestamp, Timestamp, doc, onSnapshot, orderBy, query, addDoc,setDoc} from "firebase/firestore";
import {db} from '../../firebase.js';
import Messages from './Messages';


function Chat({user1, user2}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Add a listener
  useEffect(()=> {
    const roomId = user1.uid > user2.uid ? `${user1.uid + user2.uid}` : `${user2.uid + user1.uid}`;
    const messagesDoc = collection(db, "messages", roomId, "chat");
    const q = query(messagesDoc, orderBy("createdAt", "asc"));
    let unsubscribe =onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      let messages = [];
      querySnapshot.forEach((doc)=>{

        messages.push(doc.data())
      });
      setMessages(messages)
    });
    return unsubscribe
  },[user1,user2])

  async function addMessageToConversation(){
    const roomId = user1?.uid > user2?.uid ? `${user1?.uid + user2?.uid}` : `${user2?.uid + user1?.uid}`;
    console.log(roomId)
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
    if(messageText.length){
      addMessageToConversation(messageText);
      setMessageText('')
    }

  }
  return (
    <div className={styles.messageContainer} >
      <div>{user2.name}</div>
      <Messages loggedInUser={user1} messages={messages} ></Messages>
      <form className={styles.formContainer} onSubmit={sendMessage} >
        <input className={styles.textBox} type='text' name='messageText' value={messageText} onChange={onChangeTextHandler}/>
        <input className={styles.submitButton} type='submit' value="" ></input>
      </form>
    </div>

  )
}

export default Chat