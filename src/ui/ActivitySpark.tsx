import { useEffect, useRef } from 'react'
import { UI, useT } from '../i18n'
import { engine } from '../sim/engine'
import { ink } from '../theme'

const LEN = 240

/** Scrolling trace of one node's activation (last ~4 s). */
export function ActivitySpark({ index, color }: { index: number; color: string }) {
  const t = useT()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    const hist = new Float32Array(LEN)
    let raf = 0
    const draw = () => {
      hist.copyWithin(0, 1)
      hist[LEN - 1] = engine.activity[index]
      const w = (cv.width = cv.clientWidth * devicePixelRatio)
      const h = (cv.height = cv.clientHeight * devicePixelRatio)
      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()
      for (let i = 0; i < LEN; i++) {
        const x = (i / (LEN - 1)) * w
        const y = h - 2 - Math.min(1, hist[i]) * (h - 4)
        if (i) ctx.lineTo(x, y)
        else ctx.moveTo(x, y)
      }
      ctx.strokeStyle = ink(color, 0.3)
      ctx.lineWidth = 1.5 * devicePixelRatio
      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [index, color])

  return (
    <div className="spark">
      <span className="spark-label">{t(UI.activity)}</span>
      <canvas ref={ref} />
    </div>
  )
}
