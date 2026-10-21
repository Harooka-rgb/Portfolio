import { useEffect, useState } from 'react'

export default function Intro({ onReveal, onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const leaveAt = reduce ? 300 : 3100
    const doneAt = reduce ? 700 : 4200

    const a = setTimeout(() => {
      setLeaving(true)
      onReveal()
    }, leaveAt)
    const b = setTimeout(onDone, doneAt)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [onReveal, onDone])

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`}>
      <div className="intro-inner">
        <div className="intro-mark" aria-label="BK">
          <span>B</span>
          <span>K</span>
        </div>
        <div className="intro-line" />
        <p className="intro-name">Бекжан Кубатбеков</p>
        <p className="intro-role mono">Frontend-разработчик</p>
        <div className="intro-progress">
          <i />
        </div>
      </div>
    </div>
  )
}
