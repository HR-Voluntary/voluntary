import React, { useState } from 'react'

function User({user,changeUser}) {
  let [date, setDate] = useState('');
  console.log('list',user)
  let ChangeTime= (user1) =>{
    let OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
    let dateInteracted = new Date(user1.lastInteracted?.seconds*1000)
    if (OneDay > dateInteracted) {
      console.log(dateInteracted.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

  }
  else if (OneDay < dateInteracted) {
      console.log('more than a day')


  }
}
ChangeTime(user)

    // console.log(.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  return (

    <div onClick={()=>{changeUser(user)}}>{user.name}</div>
  )
}

export default User