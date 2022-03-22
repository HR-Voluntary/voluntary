import React,{useEffect,useState} from 'react'
import styles from './ChatPage.module.css';
import Chat from './Chat.js'
// import {userb} from './dummydata.js'
import {collection, serverTimestamp, doc, onSnapshot, orderBy, query, setDoc, getDoc } from "firebase/firestore";
import {db,auth} from '../../firebase.js'
import { useAuthState } from "react-firebase-hooks/auth";
import Users from './Users'
import { useLocation } from 'react-router';


function ChatPage(  ) {
  const { state } = useLocation();
  // console.log(state.product.sellerInfo, 'THESE ARE THE PASSED IN PARAMS');
  const userb = {uid:state?.product?.sellerInfo};
  console.log(userb)
  const [user, loading, error] = useAuthState(auth);
  const[user1, setUser1]= useState({})
  const[user2, setUser2] =useState({})
  let [userList,setUserList] = useState([])

  useEffect(()=>{
    user&&
   getDoc(doc(db,'users',user.uid)).then((res)=>{
    setUser1(res.data())
    renderList(res.data())
   }
    )

  },[user])
  useEffect(()=>{
    if(userb.uid!==undefined){
      getDoc(doc(db,'users',userb.uid)).then(res=>
        setUser2(res.data())
      )
    }
  },[])

  useEffect(() => {
    if(Object.keys(user1).length && Object.keys(user2)){
      addUserstoLists(user1,user2);
      renderList(user1)
    }
   }, [user1])


  let changeUser = (user) => {
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
    if(Object.keys(user1).length && Object.keys(user2).length){
      try{
        console.log('wee in')
        let toUserConversation= await getDocument('conversations', user1.uid, 'to',user2.uid);
        if(!toUserConversation){
          await setDoc(doc(db, 'conversations', user1.uid, 'to', user2.uid), {uid:user2.uid,name:user2.name,photo:user2.photo||'',lastInteracted: serverTimestamp()})
        }
        let fromUserConversation = await getDocument('conversations', user2.uid, 'to', user1.uid);
        if(!fromUserConversation){
        await setDoc(doc(db, 'conversations', user2.uid, 'to', user1.uid), {uid:user1.uid,name:user1.name,photo:user1.photo||'',lastInteracted: serverTimestamp()})
        }}catch(e){
          console.log('errror',e)
        }
    }
  }
  async function renderList(user1){

    try{
      if(Object.keys(user1).length){
        let userConversation = collection(db, 'conversations', user1.uid,'to')
        const q = query(userConversation, orderBy("lastInteracted", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let result =[];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          setUserList(result)
          return unsubscribe;
        });
      }
    } catch(e){
      console.log("errrrror",e)
    }
  }

  return (
    <div className={styles.chatBody}>
      {/* sideBar */}
      <div className={styles.sideBar}>
        <div className={styles.searchBar}>Persons...</div>
        <div className={styles.userChat}>
          <Users users={userList} changeUser={changeUser} selectedUser={user2}/>
        </div>
      </div>
      {/* Chat */}
      {userList.length&&<Chat user1={user1} user2={Object.keys(user2).length?user2:userList[0]}/>}
    </div>
  )
}

export default ChatPage