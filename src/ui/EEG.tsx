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
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
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
      ctx.strokeStyle = '#7fe3c4'
      ctx.lineWidth = 1.2 * devicePixelRatio
      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="eeg" />
}
