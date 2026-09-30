import { useEffect, useRef } from 'react'

const GLYPHS = '░▒▓▁▂▃▄▅'
const DURATION = 460 // ms for the whole string to resolve
const SHUFFLE = 50 // ms between noise refreshes (every frame would be needless relayout)

/**
 * Text that "decodes" when it changes: characters resolve left to right while the rest is shown as
 * shifting block glyphs (tinted by .decode-noise). Honours prefers-reduced-motion.
 */
export function DecodeText({ text, className }: { text: string; className?: string }) {
  const done = useRef<HTMLSpanElement>(null)
  const noise = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const a = done.current!
    const b = noise.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      a.textContent = text
      b.textContent = ''
      return
    }
    const start = performance.now()
    let last = -Infinity
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      if (p < 1 && now - last < SHUFFLE) {
        raf = requestAnimationFrame(tick)
        return
      }
      last = now
      const r = Math.floor(p * text.length)
      a.textContent = text.slice(0, r)
      let s = ''
      for (let i = r; i < text.length; i++) s += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      b.textContent = s
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])

  return (
    <span className={className} aria-label={text}>
      <span ref={done} aria-hidden />
      <span ref={noise} className="decode-noise" aria-hidden />
    </span>
  )
}
