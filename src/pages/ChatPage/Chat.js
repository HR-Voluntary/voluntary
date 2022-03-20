import styles from './Chat.module.css'
import React, {useState,useEffect} from 'react'
import {collection, serverTimestamp, Timestamp, doc, onSnapshot, orderBy, query, addDoc,setDoc} from "firebase/firestore";
import {db} from '../../firebase.js'
import Messages from './Messages';

function Chat({user1, user2}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  // Add a listener
  useEffect(()=> {
    const roomId = user1.uid > user2.uid ? `${user1.uid + user2.uid}` : `${user2.uid + user1.uid}`;
    const messagesDoc = collection(db, "messages", roomId, "chat");
    const q = query(messagesDoc, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc)=>{
        messages.push(doc.data())
      });
      setMessages(messages);
    });
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
    await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {uid:user2.uid,name:user2.name,photo:user2.photo||'',lastInteracted: Timestamp.fromDate(new Date())})
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {uid:user1.uid,name:user1.name,photo:user1.photo||'',lastInteracted: Timestamp.fromDate(new Date())})
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
    <div >
      <div></div>
      <Messages messages={messages}></Messages>
      <form onSubmit={sendMessage} >
        <input type='text' name='messageText' value={messageText} onChange={onChangeTextHandler}/>
        <input type='submit' value='submit'></input>
      </form>
    </div>

  )
}

export default Chat