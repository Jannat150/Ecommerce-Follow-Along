import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Signup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Productform from './Components/Productform'
import Edit from './Components/Edit'
import Cart from './Components/Cart'
import SingleProduct from './Components/SingleProduct'
import Profile from './Components/Profile'
import ProductCart from './Components/ProductCart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/addproduct" element={<Productform/>}></Route>
      <Route path="/" element={<Home/>}/>
      <Route path='/products/:id' element={<SingleProduct/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/editproducts/:id" element={<Edit/>}></Route>
      <Route path='/cart' element={<ProductCart/>}/>
      <Route path='/profile' element={<Profile/>}/>
     </Routes>
    </>
  )
}

export default App
