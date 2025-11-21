import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function Charts({ scenarios }){
  const probRef = useRef(null)
  const riskRef = useRef(null)

  useEffect(()=>{
    if(!scenarios?.length) return

    const labels = scenarios.map(s=>s.type)
    const probabilities = scenarios.map(s=>s.probability)
    const impact = scenarios.map(s=>s.impactScore)

    const pctx = probRef.current.getContext('2d')
    const rctx = riskRef.current.getContext('2d')

    const pChart = new Chart(pctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Probability %', data: probabilities, backgroundColor: ['#22c55e','#60a5fa','#f97316'] }
        ]
      }, options: { scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: { labels: { color: '#fff' } } } }
    })

    const rChart = new Chart(rctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          { label: 'Impact', data: impact, borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,0.2)' }
        ]
      }, options: { scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#fff' }, angleLines: { color: 'rgba(255,255,255,0.1)' }, suggestedMin: 0, suggestedMax: 100 } } }
    })

    return ()=>{ pChart.destroy(); rChart.destroy() }
  }, [scenarios])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
        <h3 className="font-semibold mb-3">Probability distribution</h3>
        <canvas ref={probRef} height="140"/>
      </div>
      <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
        <h3 className="font-semibold mb-3">Impact radar</h3>
        <canvas ref={riskRef} height="140"/>
      </div>
    </div>
  )
}
