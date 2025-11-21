import { useState } from 'react'

export default function DecisionForm({ onSubmit }){
  const [form, setForm] = useState({
    decisionTitle: '',
    description: '',
    timeframe: '4 weeks',
    importanceLevel: 3,
    emotionalState: 'Calm',
    effortLevel: 3,
  })

  function update(e){
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  function submit(e){
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Decision title</label>
        <input name="decisionTitle" value={form.decisionTitle} onChange={update} required className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2" placeholder="e.g., Switch to a new career path"/>
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={update} required className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2" rows={4} placeholder="Context, constraints, goals"/>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Timeframe</label>
          <input name="timeframe" value={form.timeframe} onChange={update} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Importance level (1-5)</label>
          <input type="number" min="1" max="5" name="importanceLevel" value={form.importanceLevel} onChange={update} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Effort level (1-5)</label>
          <input type="number" min="1" max="5" name="effortLevel" value={form.effortLevel} onChange={update} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2"/>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Emotional state</label>
        <input name="emotionalState" value={form.emotionalState} onChange={update} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2"/>
      </div>

      <button className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-semibold">Generate Outcomes</button>
    </form>
  )
}
