import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Signup from './Components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Login/> */}
     <Home/>
     {/* <Signup/> */}
    </>
  )
}

export default App
