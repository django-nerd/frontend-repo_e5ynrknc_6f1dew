import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HistoryPage(){
  const [items, setItems] = useState([])
  const [user] = useState(()=>{
    const raw = localStorage.getItem('dtm_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(()=>{ document.title = 'History • DTM' },[])
  useEffect(()=>{
    async function load(){
      if(!user) return
      const res = await fetch(`${API}/api/decision/history/${user.userId}`)
      const data = await res.json()
      setItems(data)
    }
    load()
  }, [user])

  if(!user){
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-white">
        <p>Please login to see your history.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Decisions</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((d)=> (
            <div key={d.id} className="bg-slate-900 border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{d.decisionTitle}</h3>
                  <p className="text-sm opacity-80">{new Date(d.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70">Clarity</p>
                  <p className="text-lg font-bold">{d.decisionClarityScore}</p>
                </div>
              </div>
              <p className="mt-3 text-sm opacity-90 line-clamp-3">{d.description}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-800 rounded p-2">Risk {d.riskScore}</div>
                <div className="bg-slate-800 rounded p-2">Stability {d.outcomeStabilityScore}</div>
                <div className="bg-slate-800 rounded p-2">TF {d.timeframe}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
