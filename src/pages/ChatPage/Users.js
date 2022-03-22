import React from 'react'
import User from './User.js'
import styles from './Users.module.css'
function Users({users,changeUser,selectedUser}) {
  return (
    <div className={styles.userList}>
      {users.map((user,i)=>{
        return(
          <User className={styles.User} key={i} user={user} changeUser={changeUser} selectedUser={selectedUser}/>
        )
      })}
    </div>
  )
}

export default Users