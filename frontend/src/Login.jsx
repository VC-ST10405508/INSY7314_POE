import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from './auth'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState(null)
  const nav = useNavigate()
  //(freecodecamp.ord, 2024):

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email, password})
    })
    //(freecodecamp.ord, 2024):
    const json = await res.json().catch(()=>null)
    //(freecodecamp.ord, 2024):
    if (res.ok && json?.success && json.token) {
      saveToken(json.token)
      const role = json?.user?.role || 'user'
      if (role === 'admin') {
        nav('/Admin')
      } else {
        nav('/Dashboard')
      }
    } else {
      setMsg(json?.message || 'Login failed')
    }
    //confirmation that user details is valid (freecodecamp.ord, 2024):
  }

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
    //(freecodecamp.ord, 2024):
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
