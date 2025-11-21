import { useEffect, useState } from 'react'
import DecisionForm from './DecisionForm'
import ResultsView from './ResultsView'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DecisionPage(){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('dtm_user')
    return raw ? JSON.parse(raw) : null
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [nudge, setNudge] = useState('')

  useEffect(()=>{ document.title = 'New Decision • DTM' },[])

  async function handleSubmit(form){
    if(!user){
      setNudge('Create a quick local account to save your decisions. You can still simulate without one.')
    }
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/decision/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId: user?.userId || 'guest' })
      })
      if(!res.ok) throw new Error('Failed to generate')
      const data = await res.json()
      setResult(data)
    }catch(err){
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">Enter a decision</h1>
        {nudge && (
          <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-200">
            {nudge}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <DecisionForm onSubmit={handleSubmit} />
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            {loading ? <p>Generating outcomes…</p> : <ResultsView result={result} />}
          </div>
        </div>
      </div>
    </div>
  )
}
