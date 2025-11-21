import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'
import DecisionPage from './components/DecisionPage'
import LoginPage from './components/LoginPage'
import HistoryPage from './components/HistoryPage'

function Shell({ children }){
  const user = (()=>{ try { return JSON.parse(localStorage.getItem('dtm_user')) } catch { return null } })()
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-bold">DTM</Link>
            <Link to="/decision" className="opacity-80 hover:opacity-100">New Decision</Link>
            <Link to="/history" className="opacity-80 hover:opacity-100">History</Link>
          </div>
          <div>
            {user ? <span className="text-sm opacity-80">Hi, {user.username}</span> : <Link to="/login" className="px-3 py-1 rounded bg-indigo-600">Login</Link>}
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell><App /></Shell>} />
        <Route path="/test" element={<Shell><Test /></Shell>} />
        <Route path="/decision" element={<Shell><DecisionPage /></Shell>} />
        <Route path="/login" element={<Shell><LoginPage /></Shell>} />
        <Route path="/history" element={<Shell><HistoryPage /></Shell>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
