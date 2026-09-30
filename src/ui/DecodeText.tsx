import { useEffect, useRef } from 'react'

const GLYPHS = '░▒▓▁▂▃▄▅'
const DURATION = 460 // ms for a short string to resolve
const SHUFFLE = 50 // ms between noise refreshes (every frame would be needless relayout)

/**
 * Text that "decodes" when it changes: characters resolve left to right while unresolved positions show
 * shifting block glyphs (styled by .decode-noise). Honours prefers-reduced-motion.
 *
 * - default: the whole string resolves in ~460 ms, every unresolved position shown as noise
 * - `perChar`: typewriter pace (ms per character) with only a short `trail` of noise ahead of the cursor
 * - `animate={false}`: show the text at once (e.g. lines that already existed when a panel mounted)
 * - `once`: animate only the first time; later text changes (e.g. a language switch) swap instantly
 */
export function DecodeText({ text, className, perChar, trail, animate = true, once = false }: {
  text: string
  className?: string
  perChar?: number
  trail?: number
  animate?: boolean
  once?: boolean
}) {
  const done = useRef<HTMLSpanElement>(null)
  const noise = useRef<HTMLSpanElement>(null)
  const first = useRef<string | null>(null) // text of the first run
  const changed = useRef(false) // has the text changed since (then `once` never animates again)

  useEffect(() => {
    const a = done.current!
    const b = noise.current!
    // `once`: after the first text, any change swaps instantly in either direction (switching language and
    // back included); the same text re-running, as in StrictMode's double effect, still animates
    if (first.current === null) first.current = text
    else if (first.current !== text) changed.current = true
    const skip = !animate || (once && changed.current) || matchMedia('(prefers-reduced-motion: reduce)').matches
    if (skip) {
      a.textContent = text
      b.textContent = ''
      return
    }
    const dur = perChar ? Math.max(DURATION, text.length * perChar) : DURATION
    const shuffle = perChar ? Math.min(SHUFFLE, perChar * 1.5) : SHUFFLE
    const start = performance.now()
    let last = -Infinity
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      if (p < 1 && now - last < shuffle) {
        raf = requestAnimationFrame(tick)
        return
      }
      last = now
      const r = Math.floor(p * text.length)
      a.textContent = text.slice(0, r)
      const end = trail === undefined ? text.length : Math.min(text.length, r + trail)
      let s = ''
      for (let i = r; i < end; i++) s += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      b.textContent = s
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, perChar, trail, animate, once])

  return (
    <span className={className} aria-label={text}>
      <span ref={done} aria-hidden />
      <span ref={noise} className="decode-noise" aria-hidden />
    </span>
  )
}
