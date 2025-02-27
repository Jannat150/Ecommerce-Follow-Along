import React, { useEffect } from 'react'

const Profile = () => {
    useEffect(()=>{
        fetch("http://localhost:8088/user/profile"),{
            method:"GET",
            Headers:{"Content-Type":"application/json"}

        }.then((res)=>res.json()).then((res)=>console.log(res))
    })
  return (
    <div>
      <img src=" " alt=""/>
      <h2></h2>
      <h3></h3>

    </div>
  )
}

export default Profile
