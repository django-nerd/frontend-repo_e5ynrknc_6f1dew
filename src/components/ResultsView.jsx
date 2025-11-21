import Charts from './Charts'
import MermaidDiagram from './MermaidDiagram'

export default function ResultsView({ result }){
  if(!result) return null
  const { scenarios, decisionClarityScore, riskScore, outcomeStabilityScore } = result

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {label:'Decision Clarity', value:decisionClarityScore, color:'from-emerald-400 to-emerald-600'},
          {label:'Risk', value:riskScore, color:'from-rose-400 to-rose-600'},
          {label:'Outcome Stability', value:outcomeStabilityScore, color:'from-sky-400 to-sky-600'},
        ].map((c,i)=> (
          <div key={i} className="rounded-xl p-[1px] bg-gradient-to-r from-white/20 to-white/5">
            <div className="rounded-xl p-5 bg-slate-950/80">
              <p className="text-sm opacity-75">{c.label}</p>
              <p className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${c.color}`}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Charts scenarios={scenarios} />
      <MermaidDiagram scenarios={scenarios} />

      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((s,i)=> (
          <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold capitalize">{s.type} case</h3>
            <p className="text-sm mt-2"><span className="opacity-70">Risk:</span> {s.risk}</p>
            <p className="text-sm"><span className="opacity-70">Opportunity:</span> {s.opportunity}</p>
            <p className="text-sm"><span className="opacity-70">Probability:</span> {s.probability}%</p>
            <p className="text-sm"><span className="opacity-70">Impact:</span> {s.impactScore}</p>
            <div className="mt-3 text-sm">
              <p className="opacity-70 mb-1">Timeline:</p>
              <ul className="list-disc ml-5 space-y-1">
                {s.timeline.map((t,idx)=> (<li key={idx}>{t}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-4">
        <p className="font-semibold">How scores are calculated</p>
        <ul className="text-sm mt-2 text-slate-200 list-disc ml-5 space-y-1">
          <li>Decision Clarity = 50% importance alignment + 50% typical probability.</li>
          <li>Risk Score = 60% worst-case probability + 40% effort strain proxy.</li>
          <li>Outcome Stability = 100 - weighted spread of probabilities and impacts.</li>
        </ul>
      </div>
    </div>
  )
}
