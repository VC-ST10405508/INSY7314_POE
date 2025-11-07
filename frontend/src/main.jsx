import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHome from './AppHome'
import Login from './Login'
import Dashboard from './Dashboard'
import NewTransaction from './NewTransaction'
import AdminDashboard from './Admin'
import { getToken } from './auth'
import './index.css'
//(freecodecamp.ord, 2024):

function ProtectedRoute({ children }) {
  if (!getToken()) return <Navigate to="/login" replace />
  return children;
  //(freecodecamp.ord, 2024):
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/newtransaction" element={<ProtectedRoute><NewTransaction /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  //(freecodecamp.ord, 2024):
)

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
