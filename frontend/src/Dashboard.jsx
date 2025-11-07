import { useEffect, useState } from 'react'
import { getToken, removeToken } from './auth'
import { useNavigate } from 'react-router-dom'
import "./Dashboard.css";
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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>My Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="transactions-card">
        <div className="transactions-header">
          <h3>My Transactions</h3>
          <button className="add-btn" onClick={goToAddTransaction}>
            + Add Transaction
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.transactionID}</td>
                <td>{tx.type}</td>
                <td>R{tx.amount?.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${tx.status?.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
//(freecodecamp.org, 2024):

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].

