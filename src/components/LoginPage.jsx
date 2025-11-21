import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function LoginPage(){
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{ document.title = 'Login • Decision Time Machine' },[])

  function update(e){
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const res = await fetch(`${API}/api/user/${tab}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('dtm_user', JSON.stringify(data))
      setMsg('Success! Redirecting…')
      setTimeout(()=> navigate('/decision'), 600)
    }catch(err){ setMsg(err.message) }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-white">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl">
        <div className="flex gap-4 mb-6">
          <button onClick={()=>setTab('login')} className={`px-3 py-1 rounded ${tab==='login'?'bg-indigo-600':''}`}>Login</button>
          <button onClick={()=>setTab('register')} className={`px-3 py-1 rounded ${tab==='register'?'bg-indigo-600':''}`}>Register</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input name="username" value={form.username} onChange={update} required className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={update} required className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2" />
          </div>
          <button className="w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">{tab==='login'?'Login':'Create Account'}</button>
          {msg && <p className="text-sm opacity-80 mt-2">{msg}</p>}
        </form>
      </div>
    </div>
  )
}
