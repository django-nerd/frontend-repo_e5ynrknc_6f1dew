import { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

function App() {
  useEffect(() => {
    document.title = 'Decision Time Machine'
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-slate-950/20 to-slate-950 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">Decision Time Machine</h1>
          <p className="mt-4 text-slate-200 max-w-2xl">Simulate future outcomes, compare alternate paths, and choose with clarity. Psychology, probabilities, and visual maps — in one place.</p>
          <div className="mt-8 flex gap-4">
            <Link to="/decision" className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold">Start a Decision</Link>
            <Link to="/login" className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition">Login</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {title: 'Outcome Simulation', desc: 'Best, typical, worst-case futures with probabilities, risks and opportunities.'},
            {title: 'Decision Scores', desc: 'Clarity, Risk, and Stability scores built from behavior-aware heuristics.'},
            {title: 'Visual Maps', desc: 'Timelines, branching diagrams, and charts powered by Chart.js and Mermaid.'},
          ].map((c, i) => (
            <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-slate-300">{c.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
