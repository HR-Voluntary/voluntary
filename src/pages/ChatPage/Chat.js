import styles from './Chat.module.css'
import React, {useState,useEffect} from 'react'
import {collection,serverTimestamp, doc, onSnapshot, orderBy, query, getDoc,updateDoc, addDoc,setDoc} from "firebase/firestore";
import {db} from '../../firebase.js';
import Messages from './Messages';

function Chat({user1, user2,userList,product,productId}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [itemId, setItemId] = useState('')
  const [item, setItem] =useState({})

  // Add a listener
  useEffect(()=>{
    let unsubscribe =onSnapshot(doc(db, "items", productId),(doc) => {
      setItem(doc.data())

    });
    return unsubscribe


  },[productId])
  useEffect(()=> {
    if(Object.keys(user1).length && Object.keys(user2).length){
      const roomId = user1.uid > user2.uid ? `${user1.uid + user2.uid}` : `${user2.uid + user1.uid}`;
      getDoc(doc(db, 'conversations', user1?.uid, 'to', user2?.uid)).then((res)=>{setItemId(res.data().item)})
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
    await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), { ...user2,lastInteracted: serverTimestamp()})
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {...user1,lastInteracted: serverTimestamp()})
  }

  function onChangeTextHandler(e){
    setMessageText(e.target.value);
  }

  async function sendMessage(e) {
    e.preventDefault();
    addMessageToConversation(messageText);
    setMessageText('')
  }

  let onSellerClick =async (productId) => {
    const docToUpdate = doc(db, 'items', productId);
    await updateDoc(docToUpdate, { isActive: false })
   //load sarahs thing seller, user2

  }
  let onBuyerClick =async (productId) => {
    const docToUpdate = doc(db, 'items', productId);
    await updateDoc(docToUpdate, { isRated: true })
   //load sarahs thing seller, user2

  }

  let renderButton = () =>{
    // console.log(item===productId)
    // console.log('iamsellerinfo', product?.sellerInfo, 'user.uid', user1?.uid)
    // console.log(product?.sellerInfo===user1.uid)
    console.log(item.isActive, item.isRated)

    if(product?.sellerInfo===user1?.uid && user1!==user2 &&itemId===productId && item.isActive ){
      return(
        <button onClick={()=>{onSellerClick(productId)}} className={styles.rateButton} >MARK AS SOLD</button>
      )
    } else if(itemId===productId && item.isActive===false && item.isRated===undefined ){
      return(<button onClick={()=>{onBuyerClick(productId)}} className={styles.rateButtonBuyer} >RATE BUYER</button>)
    }
     else {
      return(
        <div></div>
      )
    }

  }
  return (
    <div className={styles.messageContainer}>
      <div className={styles.topBar}>
      <div>
      {userList.find((user)=>{if(user.uid===user2.uid){return user.uid}}).active?<div className={styles.green}></div>:<div className={styles.red}></div>}
      <div>{user2.name}</div>
      </div>
      {renderButton()}

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