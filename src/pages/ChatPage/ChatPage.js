import React,{useEffect,useState} from 'react'
import styles from './ChatPage.module.css';
import Chat from './Chat.js'
import {userb} from './dummydata.js'
import {collection, Timestamp, doc, onSnapshot, orderBy, query, addDoc,setDoc, getDoc, getDocs} from "firebase/firestore";
import {db,auth} from '../../firebase.js'
import { useAuthState } from "react-firebase-hooks/auth";
import Users from './Users'



function ChatPage() {
  const [user, loading, error] = useAuthState(auth);
  const[user1, setUser1]= useState({})
  const[user2, setUser2] =useState({})
  let [userList,setUserList] = useState([])
  useEffect(()=>{
   setUser2(userb)
  },[userb])
  useEffect(()=>{
    user&&
    getDoc(doc(db,'users',user.uid)).then(res=>
      setUser1(res.data())
    )
  },[user])
  let changeUser = (user) => {
    console.log('clicked',user)
    setUser2(user)
  }
  async function getDocument (coll, id,coll2,id2) {
    const snap = await getDoc(doc(db, coll, id, coll2, id2))
    if (snap.exists())
      return snap.data()
    else
      return null;
  }
  async function addUserstoLists(user1, user2) {
    try{
    let toUserConversation= await getDocument('conversations', user1.uid, 'to',user2.uid);
    if(!toUserConversation){
      await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {uid:user2.uid,name:user2.name,photo:user2.photo||'',lastInteracted: Timestamp.fromDate(new Date())})
    }
    let fromUserConversation = await getDocument('conversations', user2.uid, 'to', user1.uid);
    if(!fromUserConversation){
    await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {uid:user1.uid,name:user1.name,photo:user1.photo||'',lastInteracted: Timestamp.fromDate(new Date())})
    }}catch(e){
      console.log('errror',e)
    }
  }
  async function renderList(user1){
    try{
      let userConversation = collection(db, 'conversations', user1.uid,'to')
      const q = query(userConversation, orderBy("lastInteracted", "desc"));
      // const querySnapshot = await getDocs(q);
      onSnapshot(q, (querySnapshot) => {
        let result =[];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        setUserList(result)
      });
    } catch(e){
      console.log("errrrror",e)
    }
  }
  useEffect(() => {
   if(user1!==null){
    renderList(user1);
    addUserstoLists(user1,user2);
   }
  }, [user1])
  return (
    <div className={styles.chatBody}>
      {/* sideBar */}
      <div className={styles.sideBar}>
        <div className={styles.searchBar}>Persons...</div>
        <div className={styles.userChat}>
          <Users users={userList} changeUser={changeUser}/ >
        </div>
      </div>
      {/* Chat */}
      {Object.keys(user1)!==0&&<Chat user1={user1} user2={user2}/>}
    </div>
  )
}

export default ChatPage