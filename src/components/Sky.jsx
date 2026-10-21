import { useEffect, useRef } from 'react'

export default function Sky({ revealed }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let stars = []
    let raf = 0
    let tx = 0
    let ty = 0
    let mx = 0
    let my = 0

    const build = () => {
      const count = Math.min(520, Math.floor((w * h) / 3800))
      stars = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + depth * 1.05,
          depth,
          base: 0.3 + Math.random() * 0.7,
          speed: 0.5 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          warm: Math.random() < 0.18,
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const onMove = (e) => {
      tx = e.clientX / w - 0.5
      ty = e.clientY / h - 0.5
    }

    const draw = (time) => {
      const t = time / 1000
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        const tw = reduce ? 1 : 0.62 + 0.38 * Math.sin(t * s.speed + s.phase)
        const alpha = s.base * tw
        const px = s.x - mx * s.depth * 26
        const py = s.y - my * s.depth * 18
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.warm
          ? `rgba(255, 238, 214, ${alpha})`
          : `rgba(204, 219, 255, ${alpha})`
        if (s.r > 1.1) {
          ctx.shadowColor = s.warm ? 'rgba(255,238,214,0.8)' : 'rgba(157,180,255,0.9)'
          ctx.shadowBlur = 7
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className={`sky ${revealed ? 'is-revealed' : ''}`} aria-hidden="true">
      <div className="sky-gradient" />
      <div className="sky-glow" />
      <canvas ref={canvasRef} className="sky-stars" />
      <div className="moon">
        <div className="moon-halo" />
        <div className="moon-body" />
      </div>
      <div className="sky-vignette" />
    </div>
  )
}
