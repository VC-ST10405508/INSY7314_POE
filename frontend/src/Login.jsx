import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from './auth'
import "./Login.css";

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
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Securely access your account</p>

        <form onSubmit={submit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          {msg && <p className="message">{msg}</p>}
        </form>

      </div>
    </div>
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
