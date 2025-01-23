import React from 'react'
import { Link } from 'react-router-dom'
import card from "./data.json"
import Card from './Card'

const Home = () => {
  return (
    <>
    <div>
      <nav className='flex justify-end border-2 border-b-black h-16' >
        <button className='pr-11 text-2xl'><Link to={"/login"}>login</Link></button>
        <button className='text-2xl'><Link to={"/signup"}>Signup</Link></button>
      </nav>
    </div>
    <div>
      <Card data={card}/>
    </div>
    </>
  )
}

export default Home
