import { useEffect, useRef } from 'react'
import { EEG_LEN, engine } from '../sim/engine'

/** Scrolling 4-second trace of the cortical mean field. */
export function EEG() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    let raf = 0
    const draw = () => {
      const w = (cv.width = cv.clientWidth * devicePixelRatio)
      const h = (cv.height = cv.clientHeight * devicePixelRatio)
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(170,195,230,0.08)'
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      ctx.lineTo(w, h / 2)
      ctx.stroke()
      ctx.beginPath()
      const { eeg, eegHead } = engine
      for (let i = 0; i < EEG_LEN; i++) {
        const v = eeg[(eegHead + i) % EEG_LEN]
        const x = (i / (EEG_LEN - 1)) * w
        const y = h / 2 - v * h * 2.6
        if (i) ctx.lineTo(x, y)
        else ctx.moveTo(x, y)
      }
      const g = ctx.createLinearGradient(0, 0, w, 0)
      g.addColorStop(0, 'rgba(125,211,252,0)')
      g.addColorStop(0.35, 'rgba(125,211,252,0.55)')
      g.addColorStop(1, '#7dd3fc')
      ctx.strokeStyle = g
      ctx.lineWidth = 1.3 * devicePixelRatio
      ctx.shadowColor = 'rgba(125,211,252,0.8)'
      ctx.shadowBlur = 6 * devicePixelRatio
      ctx.stroke()
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="eeg" />
}
