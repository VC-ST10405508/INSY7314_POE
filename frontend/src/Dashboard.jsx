import { useEffect, useState } from 'react'
import { getToken, removeToken } from './auth'
import { useNavigate } from 'react-router-dom'
//(freecodecamp.org, 2024):

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [message, setMessage] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const token = getToken()

    // Fetch user transactions (no checks, ProtectedRoute handles access)
    fetch('/api/transactions/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setMessage('No transactions found.')
        } else {
          setTransactions(data)
        }
      })
      .catch(err => {
        console.error('Error fetching transactions:', err)
        setMessage('Error fetching transactions')
      })
  }, [])
  //(freecodecamp.org, 2024):

  const logout = () => {
    removeToken()
    localStorage.removeItem('role')
    nav('/login')
  }
  //(freecodecamp.org, 2024):

  const goToAddTransaction = () => {
  nav('/newtransaction')
  }
  //(freecodecamp.org, 2024):


  return (
    <div style={{ padding: 20 }}>
      <h2>User Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <h3>My Transactions</h3>

      {message && <p>{message}</p>}

      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            ID: {tx.transactionID} | {tx.type} | Amount: {tx.amount} | Status: {tx.status}
          </li>
        ))}
      </ul>

      <button onClick={goToAddTransaction}>Add Transaction</button>
      {/* (freecodecamp.org, 2024): */}
    </div>
  )
}
//(freecodecamp.org, 2024):

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].

