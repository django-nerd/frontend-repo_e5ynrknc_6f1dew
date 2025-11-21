import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export default function MermaidDiagram({ scenarios }){
  const ref = useRef(null)

  useEffect(()=>{
    if(!scenarios?.length) return
    mermaid.initialize({ startOnLoad: false, theme: 'dark' })

    const best = scenarios.find(s=>s.type==='best')
    const typical = scenarios.find(s=>s.type==='typical')
    const worst = scenarios.find(s=>s.type==='worst')

    const lines = [
      'flowchart LR',
      'A[Start] --> B{Decision}',
      `B -->|Best ${best?.probability || 0}%| C[Best: Impact ${best?.impactScore || 0}]`,
      `B -->|Typical ${typical?.probability || 0}%| D[Typical: Impact ${typical?.impactScore || 0}]`,
      `B -->|Worst ${worst?.probability || 0}%| E[Worst: Impact ${worst?.impactScore || 0}]`,
      'C --> F[Reflect & Scale]',
      'D --> F',
      'E --> F'
    ]

    const code = lines.join('\n')
    ref.current.innerHTML = `<div class="mermaid">${code}</div>`
    mermaid.run({ nodes: [ref.current] })
  }, [scenarios])

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4 overflow-auto">
      <h3 className="font-semibold mb-3">Scenario branching map</h3>
      <div ref={ref} />
    </div>
  )
}
