import { useState } from 'react'
import { getToken } from './auth'
import { useNavigate } from 'react-router-dom'
import "./NewTransaction.css";
//(freecodecamp.org, 2024):

export default function NewTransaction() {
  const [type, setType] = useState('payment') // default option
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const nav = useNavigate()
  //(freecodecamp.org, 2024):

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getToken()
    //(freecodecamp.org, 2024):

    const data = {
      type,
      amount: Number(amount),
      recipient,
      description
      //(freecodecamp.org, 2024)
    }

    try {
      const res = await fetch('/api/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      //(freecodecamp.org, 2024):

      if (res.ok) {
        setMessage('Transaction added successfully!')
        // Clear inputs
        setType('payment')
        setAmount('')
        setRecipient('')
        setDescription('')
        // Redirect after short delay
        setTimeout(() => nav('/dashboard'), 1000)
      } else {
        const err = await res.json()
        setMessage(err.message || 'Error adding transaction')
      }
    } catch (err) {
      console.error('Error:', err)
      setMessage('Server error occurred.')
    }
  }
  //(freecodecamp.org, 2024):

  return (
    <div className="new-transaction-container">
      <div className="new-transaction-card">
        <h2>Add New Transaction</h2>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group type-select">
            <label className="label">Type:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="type"
                  value="payment"
                  checked={type === "payment"}
                  onChange={(e) => setType(e.target.value)}
                />
                Payment
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="type"
                  value="request"
                  checked={type === "request"}
                  onChange={(e) => setType(e.target.value)}
                />
                Request
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Amount (R):</label>
            <input
              type="number"
              required
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Recipient:</label>
            <input
              type="text"
              required
              placeholder="Enter recipient name or ID"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Description:</label>
            <input
              type="text"
              required
              placeholder="Enter a short note"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="save-btn">
            Save Transaction
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
