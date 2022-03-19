import React from 'react'

function User({user,changeUser}) {
  console.log(user)
  return (

    <div onClick={()=>{changeUser(user)}}>{user.name}</div>
  )
}

export default User