import styles from './Chat.module.css';
import React, { useState, useEffect } from 'react';
import {
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../firebase.js';
import Messages from './Messages';
import ReviewsModal from '../TrustPage/TestPage.js';
import {useAuth} from '../../contexts/AuthContext';


function Chat({ changeUser,user1, user2, userList, product, productId }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState({});
  // const [modal, setModal] = useState(false);
  const [userType, setUserType] = useState('');
  const { modal, setModal} =useAuth();
  const [hasRated, setHasRated] =useState(false);
  // console.log(hasRated)
  useEffect(()=>{
    console.log('Outside deleteConversationModal')
    console.log(modal, 'THIS IS MODAL VALUE')
    console.log(hasRated, 'THIS IS RATED VALUE')
    if(!modal && hasRated){
      console.log('DELETE CONVERSATION FIRED')
      deleteConversations();
      setHasRated(false);
    }

  },[modal])

  useEffect(()=>{
    if (Object.keys(user1).length && Object.keys(user2).length) {
      const roomId =
        user1.uid > user2.uid
          ? `${user1.uid + user2.uid}`
          : `${user2.uid + user1.uid}`;
      getDoc(doc(db, 'conversations', user1?.uid, 'to', user2?.uid)).then(
        (res) => {
          setItemId(res.data()?.item);
        }
      );
    } else{console.log(item)
      if(productId){

        setItemId(productId)
      }
    }
  },[user1,user2])


  // Add a listener
  useEffect(() => {

    if (itemId) {

      let unsubscribe = onSnapshot(doc(db, 'items', itemId), (doc) => {
        console.log('setItem fired',doc.data())
        setItem(doc.data());
      });
      return unsubscribe;
    } else if(productId){
      let unsubscribe = onSnapshot(doc(db, 'items', productId), (doc) => {
        setItem(doc.data());
      });
      return unsubscribe
    }
  }, [itemId]);
  useEffect(() => {

    const roomId =
    user1.uid > user2.uid
      ? `${user1.uid + user2.uid}`
      : `${user2.uid + user1.uid}`;
      const messagesDoc = collection(db, 'messages', roomId, 'chat');
      const q = query(messagesDoc, orderBy('createdAt', 'asc'));
      let unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        setMessages(messages);
      });
      return unsubscribe;

  }, [user1, user2]);

  async function addMessageToConversation() {
    const roomId =
      user1?.uid > user2?.uid
        ? `${user1?.uid + user2?.uid}`
        : `${user2?.uid + user1?.uid}`;
    // const messagesDoc = collection(db,'messages', roomId, 'chat');
    await addDoc(collection(db, 'messages', roomId, 'chat'), {
      messageText,
      from: user1,
      to: user2,
      createdAt: serverTimestamp(),
      image: '',
    });
    await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {
      ...user2,
      lastInteracted: serverTimestamp(),
    });
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {
      ...user1,
      lastInteracted: serverTimestamp(),
    });
  }

  function onChangeTextHandler(e) {
    setMessageText(e.target.value);
  }

  async function sendMessage(e) {
    e.preventDefault();
    addMessageToConversation(messageText);
    setMessageText('');
  }

  let onSellerClick = async (item) => {
    const docToUpdate = doc(db, 'items', itemId);
    await updateDoc(docToUpdate, { isActive: false,
    buyer:user2.uid })
   //load sarahs thing seller, user2
    setUserType('buyer');
    renderModal();
    //console.log('ABOUT TO RENDER MODAL');
  }
  let deleteConversations = async () =>{
    await deleteDoc(doc(db, 'conversations', user1?.uid, 'to', user2?.uid))
   await deleteDoc(doc(db, 'conversations', user2?.uid, 'to', user1?.uid))
  }

  let onBuyerClick = async () => {
    if(itemId){
      const docToUpdate = doc(db, 'items', itemId);
      await updateDoc(docToUpdate, { bought: true })
    } else {
      const docToUpdate = doc(db, 'items', productId);
      await updateDoc(docToUpdate, { bought: true })
    }

   //load sarahs thing seller, user2
   setUserType('seller');
   renderModal();
   setHasRated(true)
   changeUser({});
  }

  let renderModal = () => {
    setModal(true);
  }
  let renderButton = () =>{
    if(item?.sellerInfo===user1?.uid && user1.uid!==user2.uid  && item?.isActive ){

      return(
        <button onClick={()=>{onSellerClick(productId)}} className={styles.rateButton} >SOLD</button>
      )
    } else if( user1.uid===item?.buyer && item?.isActive===false && item?.bought===undefined ){
      return(<button onClick={()=>{onBuyerClick(productId,deleteConversations)}} className={styles.rateButtonBuyer} >RATE SELLER</button>)
    }
  };
  return (
    <div className={styles.messageContainer}>
      <div className={styles.topBar}>
      <div>
      {userList.find((user)=>{if(user.uid===user2.uid){return user.uid}})?.active?<div className={styles.green}></div>:<div className={styles.red}></div>}
      {item?.buyer===user1?.uid|| item?.sellerInfo===user2?.uid?<div>{item.name}</div>:<div></div>}
      <div>{user2?.name}</div>
      </div>
      {renderButton()}

      </div>

      <Messages loggedInUser={user1} messages={messages}></Messages>
      <form className={styles.formContainer} onSubmit={sendMessage}>
        <input
          className={styles.textBox}
          type='text'
          name='messageText'
          value={messageText}
          onChange={onChangeTextHandler}
        />
        <input type='submit' value='submit'></input>
      </form>

      {modal ? <ReviewsModal uid={user2.uid} type={userType}/> : <></>}

    </div>
  );
}

export default Chat;
