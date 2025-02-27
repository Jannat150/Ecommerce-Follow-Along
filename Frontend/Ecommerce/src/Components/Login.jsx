import React, { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData = { username, password }
    
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store the JWT token in localStorage upon successful login
        localStorage.setItem('authToken', data.token)

        // Optionally, you can redirect the user after a successful login
        alert('Login Successful!')
        // Redirect to the dashboard or home page (Example using window.location)
      } else {
        setError(data.message) // Show error message from backend
      }
    } catch (err) {
      setError('An error occurred during login.',err)
    }
  }

  return (
    <div className='w-80 h-60 bg-slate-300 rounded-2xl flex flex-col justify-center items-center mx-auto my-24 shadow-lg'>
      <h1 className='text-4xl'>Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            className='p-3 w-60 m-3 rounded-2xl' 
            type="text" 
            placeholder='Enter your username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <input 
            className='p-3 w-60 m-3 rounded-2xl' 
            type='password' 
            placeholder='Enter your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button className='bg-white p-1 border border-black rounded-2xl hover:shadow-md'>Submit</button>
      </form>
    </div>
  )
}

export default Login
