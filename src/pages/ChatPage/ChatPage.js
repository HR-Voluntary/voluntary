import React, { useEffect, useState } from 'react';
import styles from './ChatPage.module.css';
import Chat from './Chat.js';
import ReactLoading from 'react-loading';
import {
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, auth } from '../../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import Users from './Users';
import { useLocation } from 'react-router';

function ChatPage() {
  const { state } = useLocation();
  const userb = { uid: state?.product?.sellerInfo };
  const [user, loading, error] = useAuthState(auth);
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  let [userList, setUserList] = useState([]);
  useEffect(() => {

    user &&
      getDoc(doc(db, 'users', user?.uid)).then((res) => {
        setUser1(res.data());

      });

      if(userb.uid!==user2.uid){
        getDoc(doc(db, 'users', userb?.uid)).then((res) => {
          setUser2(res.data())

      })}
  }, [user]);

  useEffect(() => {

    if (user1?.uid!==userb?.uid && userb?.uid!== undefined) {



      if (Object.keys(user1).length && Object.keys(user2).length) {
        setItemtoUser(user1, user2);
      }
    }

  }, [user1]);


  useEffect(() => {
    if (Object.keys(user1).length && Object.keys(user2).length) {
      addUserstoLists(user1, user2);
      renderList(user1);
    } else{
      renderList(user1)
    }
  }, [user1, user2]);

  let changeUser = (user) => {
    setUser2(user);
  };
  let setItemtoUser = async (user1, user2) => {
    if (Object.keys(user1).length && Object.keys(user2).length) {
    await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {
      ...user2,
      item: state.productId,
      lastInteracted: serverTimestamp(),
    });
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {
      ...user1,
      item: state.productId,
      lastInteracted: serverTimestamp(),
    });
  }
  };

  async function getDocument(coll, uid, coll2, id2) {
    const snap = await getDoc(doc(db, coll, uid, coll2, id2));
    if (snap.exists()) return snap.data();
    else return null;
  }

  async function addUserstoLists(user1, user2) {

      try {
        let toUserConversation = await getDocument(
          'conversations',
          user1.uid,
          'to',
          user2.uid
        );
        if (!toUserConversation) {
          await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {
            ...user2,
            item: state.productId,
            lastInteracted: serverTimestamp(),
          });
        }
        let fromUserConversation = await getDocument(
          'conversations',
          user2.uid,
          'to',
          user1.uid
        );
        if (!fromUserConversation) {
          await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {
            ...user1,
            item: state.productId,
            lastInteracted: serverTimestamp(),
          });
        }
      } catch (e) {
        // console.log('errror',e)
      }

  }
  async function renderList(user1) {
    try {
      if (Object.keys(user1).length) {
        let userConversation = collection(db, 'conversations', user1.uid, 'to');
        const q = query(userConversation, orderBy('lastInteracted', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          setUserList(result);
          return unsubscribe;
        });
      }
    } catch (e) {
      // console.log('errrrror',e)
    }
  }
  let renderChat = () => {
    if (userList.length) {
      return (
        <Chat
        changeUser={changeUser}
          user1={user1}
          product={state?.product}
          productId={state?.productId}
          userList={userList}
          user2={Object.keys(user2).length ? user2 : userList[0]}
        />
      );
    } else {
      return (
        <div >
        </div>
      );
    }
  };

  return (
    <div className={styles.chatBody}>
      {/* sideBar */}
      <div className={styles.sideBar}>
        {/* <div className={styles.searchBar}>Persons...</div> */}
        <div className={styles.userChat}>
          <Users
            users={userList}
            changeUser={changeUser}
            selectedUser={user2}
          />
        </div>
      </div>
      {/* Chat */}
      {renderChat()}
    </div>
  );
}

export default ChatPage;
