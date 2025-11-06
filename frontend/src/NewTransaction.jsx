import { useState } from 'react'
import { getToken } from './auth'
import { useNavigate } from 'react-router-dom'
//(freecodecamp.org, 2024):

export default function NewTransaction() {
  const [transactionID, setTransactionID] = useState('')
  const [type, setType] = useState('payment') // default option
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getToken()

    const data = {
      type,
      amount: Number(amount),
      recipient,
      description
      // status is automatically set to "pending" in the backend (freecodecamp.org, 2024)
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

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label><br />
          <label>
            <input
              type="radio"
              name="type"
              value="payment"
              checked={type === 'payment'}
              onChange={(e) => setType(e.target.value)}
            />
            Payment
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="type"
              value="request"
              checked={type === 'request'}
              onChange={(e) => setType(e.target.value)}
            />
            Request
          </label>
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>Recipient:</label>
          <input
            type="text"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    //bare-bone input interface(freecodecamp.org, 2024):
  )
}

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
