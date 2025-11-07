import { useEffect, useState } from 'react'
import { getToken } from './auth'
import { useNavigate } from 'react-router-dom'
//(freecodecamp.org, 2024):

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState([])
  const [message, setMessage] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const token = getToken()

    // Fetch all transactions (ProtectedRoute enforces admin access)
    fetch('/api/transactions/all', {
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
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    nav('/login')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>All User Transactions</h3>
      {message && <p>{message}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.userId?.userFullName || 'N/A'}</td>
              <td>{tx.userId?.email || 'N/A'}</td>
              <td>{tx.amount}</td>
              <td>{tx.description}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.status || 'pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* displays all transactions for admin(freecodecamp.org, 2024): */}
    </div>
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch
