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

  const goToAddTransaction = () => {
  nav('/newtransaction')
  }



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
      {/* confirmation that user was able to login(freecodecamp.org, 2024): */}
    </div>
  )
}
