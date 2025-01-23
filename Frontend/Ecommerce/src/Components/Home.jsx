import React from 'react'

import card from "./data.json"
import Card from './Card'

const Home = () => {
  return (
    <>
    
    <div>
      <Card data={card}/>
    </div>
    </>
  )
}

export default Home
