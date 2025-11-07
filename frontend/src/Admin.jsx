import { useEffect, useState } from 'react'
import { getToken } from './auth'
import { useNavigate } from 'react-router-dom'
import "./AdminDashboard.css";
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
    <div className="admin-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="transactions-card">
        <div className="transactions-header">
          <h3>All Transactions</h3>
          <div className="actions-bar">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="export-btn">Export</button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}

        <table className="transactions-table">
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
                <td>
                  <div className="user-cell">
                    <div className="avatar">{tx.userId?.userFullName?.[0] || "?"}</div>
                    <div>
                      <div className="user-name">{tx.userId?.userFullName || "N/A"}</div>
                      <div className="user-role">Student</div>
                    </div>
                  </div>
                </td>
                <td>{tx.userId?.email || "N/A"}</td>
                <td>R{tx.amount?.toFixed(2) || "0.00"}</td>
                <td>{tx.description || "—"}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td className={`status ${tx.status?.toLowerCase() || "pending"}`}>
                  {tx.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch
