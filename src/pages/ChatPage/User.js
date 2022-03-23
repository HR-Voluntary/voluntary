import React, { useState,useEffect } from 'react'
import styles from './User.module.css'

function User({user,changeUser,selectedUser}) {
  let [date, setDate] = useState('');
  useEffect(() => {
    ChangeTime(user)
  }, [user])

  let ChangeTime= (user1) =>{
    let OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
    let OneWeek= new Date().getTime() + (1 * 24 * 60 * 60 * 1000* 7)
    let dateInteracted = new Date(user.lastInteracted?.seconds*1000)
    if (OneDay > dateInteracted) {
      return setDate(dateInteracted?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).slice(0,-3))
  }
  else if (OneWeek > dateInteracted) {
    let days= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      return setDate(days[dateInteracted?.getDay()])
  } else if(dateInteracted>OneWeek){
    return setDate(`${dateInteracted?.getMonth()}/${dateInteracted.getDate()}`)
  }
}


    // console.log(.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  return (
<div className={selectedUser.uid===user.uid?styles.selectedContainer:styles.userContainer} onClick={()=>{changeUser(user)}}>
      <div className={styles.photoText}>

      <img className={styles.photo} src={user.photo} alt='' />
      <div className={styles.name}>{user.name}</div>
      </div>
      <div className={styles.date}>{date}</div>

    </div>
  )
}

export default User