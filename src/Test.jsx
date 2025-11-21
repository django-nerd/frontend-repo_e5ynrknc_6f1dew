import { useEffect } from 'react'

export default function Test(){
  useEffect(()=>{ document.title='Test Page' },[])
  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Test Route</h1>
        <p className="opacity-70">If you can see this, routing works.</p>
      </div>
    </div>
  )
}
