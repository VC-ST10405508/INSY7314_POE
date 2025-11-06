import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState('')
  const [identity,setID]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState(null)
  const nav = useNavigate()
  //(freecodecamp.ord, 2024):

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userFullName: name, userID: identity, email, password})
    })
    const json = await res.json().catch(()=>null)
    //(freecodecamp.ord, 2024):
    if (res.ok && json?.success) {
      setMsg('Registered. Please login.')
      setTimeout(()=>nav('/login'), 900)
    } else {
      setMsg(json?.message || 'Registration failed')
    }
    // throws user input to backend to allow them to register new details(freecodecamp.ord, 2024):
  }

  return (
    <div style={{padding:20}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><input required placeholder="User ID" value={identity} onChange={e=>setID(e.target.value)} /></div>
        <div><input required placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
    //front end visuals to allow user to enter details(freecodecamp.ord, 2024):
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].