import styles from './Chat.module.css'
import React, {useState,useEffect} from 'react'
import {collection, Timestamp, doc, onSnapshot, orderBy, query, addDoc, setDoc} from "firebase/firestore";
import {db} from '../../firebase.js'
import Messages from './Messages';

function Chat({user1, user2}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const roomId = user1.uid > user2.uid ? `${user1.uid + user2.uid}` : `${user2.uid + user1.uid}`;

  // Add a listener
  useEffect(()=> {

    const messagesDoc = collection(db, "messages", roomId, "chat");

    const q = query(messagesDoc, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      console.log(querySnapshot)
      querySnapshot.forEach((doc)=>{
        messages.push(doc.data())

      });
      setMessages(messages);
      console.log(messages);
    });
  },[])
  async function AddMessageToConversation(){
    const roomId = user1?.uid > user2?.uid ? `${user1?.uid + user2?.uid}` : `${user2?.uid + user1?.uid}`;
    console.log(roomId)
    // const messagesDoc = collection(db,'messages', roomId, 'chat');
    await addDoc(collection(db, "messages", roomId, "chat"), {
      messageText,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      image: "",
    });
  }
  function onChangeTextHandler(e){
    setMessageText(e.target.value);
  }
  async function sendMessage(e) {
    e.preventDefault();
    AddMessageToConversation(messageText);
    setMessageText('')
  }

  return (
    <div >
      <div>YOU ARE A MAD LAD</div>
      <Messages messages={messages}></Messages>

      <form onSubmit={sendMessage} >
        <input type='text' name='messageText' value={messageText} onChange={onChangeTextHandler}/>
        <input type='submit' value='submit'></input>
      </form>




    </div>

  )
}

export default Chat