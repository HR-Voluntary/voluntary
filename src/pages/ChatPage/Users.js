import React from 'react'
import User from './User.js'
function Users({users,changeUser}) {
  return (
    <div>
      {users.map((user,i)=>{
        return(
          <User key={i} user={user} changeUser={changeUser}/>
        )
      })}
    </div>
  )
}

export default Users