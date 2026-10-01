import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DAY, fmtClock } from '../data/scenario'
import { UI, useT } from '../i18n'
import { DAY_START, EVENTS, director, useScenario } from '../sim/director'
import { DecodeText } from './DecodeText'
import { Icon } from './Icon'

const SPEEDS = [1, 2, 4]
const pct = (tl: number) => `${(tl / 1440) * 100}%`
/** Sky tint by clock hour: bright around midday, warm at sunset, darkest after midnight. */
const SKY: [number, string][] = [
  [6.5, 'rgba(84,100,160,0.30)'], // the strip starts at dawn
  [7.5, 'rgba(130,160,215,0.24)'],
  [9, 'rgba(160,212,248,0.32)'],
  [12.5, 'rgba(190,228,255,0.46)'], // midday, brightest
  [16, 'rgba(160,212,248,0.32)'],
  [18.5, 'rgba(230,165,120,0.20)'], // sunset
  [20.5, 'rgba(70,80,140,0.26)'],
  [22.5, 'rgba(22,30,64,0.55)'],
  [2, 'rgba(10,15,38,0.66)'], // deepest night
  [5, 'rgba(40,52,105,0.45)'],
]
/** The sky tints as a gradient laid out on the strip (which starts at DAY_START and wraps after 24 h). */
const SKY_GRADIENT = (() => {
  const at = (h: number) => (((h * 60 - DAY_START) % 1440) + 1440) % 1440 / 1440
  const stops = SKY.map(([h, c]) => [at(h), c] as const).sort((a, b) => a[0] - b[0])
  const first = stops[0][1]
  return `linear-gradient(90deg, ${[...stops.map(([p, c]) => `${c} ${(p * 100).toFixed(1)}%`), `${first} 100%`].join(', ')})`
})()

/** Events closer than ~35 min are staggered vertically so their markers don't overlap. */
/**
 * A marker pops as the playhead touches its edge (px before its centre) and shrinks once the playhead has
 * fully left the enlarged marker (px past its centre, ≈ its radius at 1.45×).
 */
const HIT_BEFORE = 12
const HIT_AFTER = 17
const isHit = (dxPx: number) => dxPx > -HIT_BEFORE && dxPx < HIT_AFTER

const crowded = (i: number) =>
  (i > 0 && EVENTS[i].tl - EVENTS[i - 1].tl < 35) || (i + 1 < EVENTS.length && EVENTS[i + 1].tl - EVENTS[i].tl < 35)

/**
 * Outline of the bottom box when the controls sit in a tab rising from its right end (schematic layout):
 * one path with rounded outer corners and a concave fillet where the tab meets the track, so the border
 * and fill run continuously. Hidden (CSS) in layouts where the controls stay inside the box.
 */
function useTabOutline(panel: React.RefObject<HTMLDivElement | null>, tab: React.RefObject<HTMLDivElement | null>) {
  const [shape, setShape] = useState<{ d: string; top: number; w: number; h: number } | null>(null)
  useLayoutEffect(() => {
    const p = panel.current
    const tb = tab.current
    if (!p || !tb) return
    const measure = () => {
      const P = p.getBoundingClientRect()
      const T = tb.getBoundingClientRect()
      if (T.bottom > P.top + 2 || !P.width) return setShape(null) // tab not raised: nothing to draw
      const W = P.width
      const ht = P.top - T.top // tab height above the track
      const h = ht + P.height
      const tw = T.width
      const r = 24 // matches the panels' corner radius
      const i = 0.5 // half the stroke, keeps the line crisp and inside the box
      const x0 = W - tw
      const d = [
        `M${r},${ht + i}`,
        `L${x0 - r},${ht + i}`,
        `A${r - i},${r - i} 0 0 0 ${x0 + i},${ht - r}`, // concave fillet into the tab
        `L${x0 + i},${r}`,
        `A${r - i},${r - i} 0 0 1 ${x0 + r},${i}`,
        `L${W - r},${i}`,
        `A${r - i},${r - i} 0 0 1 ${W - i},${r}`,
        `L${W - i},${h - r}`,
        `A${r - i},${r - i} 0 0 1 ${W - r},${h - i}`,
        `L${r},${h - i}`,
        `A${r - i},${r - i} 0 0 1 ${i},${h - r}`,
        `L${i},${ht + r}`,
        `A${r - i},${r - i} 0 0 1 ${r},${ht + i}`,
        'Z',
      ].join(' ')
      setShape({ d, top: -ht - 1, w: W, h })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(p)
    ro.observe(tb)
    measure()
    return () => ro.disconnect()
  }, [panel, tab])
  return shape
}

export function Timeline() {
  const t = useT()
  const { tl, playing, speed, current } = useScenario()
  const bar = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const tab = useRef<HTMLDivElement>(null)
  const outline = useTabOutline(panel, tab)
  const head = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const marks = useRef<(HTMLButtonElement | null)[]>([])

  // Playhead, fill and marker hits follow the director every frame (the React state is throttled)
  useEffect(() => {
    let raf = 0
    const frame = () => {
      const now = director.tl
      const pxPerMin = (bar.current?.clientWidth ?? 1000) / 1440
      // Transforms, not left/width: inside an event the playhead moves ~0.01 px per frame, which a
      // pixel-snapped left would turn into a one-pixel jump every second or so
      if (head.current) head.current.style.transform = `translateX(${now * pxPerMin}px)`
      if (fill.current) fill.current.style.transform = `scaleX(${now / 1440})`
      EVENTS.forEach((e, i) => marks.current[i]?.classList.toggle('hit', isHit((now - e.tl) * pxPerMin)))
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  const seekFromPointer = (e: React.PointerEvent) => {
    const r = bar.current!.getBoundingClientRect()
    director.seek(Math.max(0, Math.min(1439, ((e.clientX - r.left) / r.width) * 1440)))
  }

  const ev = current >= 0 ? DAY[current] : null
  const hours = Array.from({ length: 8 }, (_, i) => i * 3 * 60 + (9 * 60 - DAY_START)) // 09:00, 12:00, …

  return (
    <div className={`panel timeline ${outline ? 'has-tab' : ''}`} ref={panel}>
      {outline && (
        // Same glass as the panels: the outline clips a backdrop blur and is filled with the panel tint
        <svg className="tl-shape" style={{ top: outline.top, width: outline.w, height: outline.h, clipPath: `path('${outline.d}')` }} viewBox={`0 0 ${outline.w} ${outline.h}`} aria-hidden>
          <defs>
            <linearGradient id="tl-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(150,175,210)" stopOpacity="0.035" />
              <stop offset="1" stopColor="rgb(150,175,210)" stopOpacity="0.012" />
            </linearGradient>
          </defs>
          <path d={outline.d} />
        </svg>
      )}
      <div className="tl-controls" ref={tab}>
        <button className="icon-btn sm" title={t(UI.prevEvent)} onClick={() => director.jump(-1)}><Icon name="skip-back" /></button>
        <button className="play-btn" title={t(playing ? UI.pause : UI.play)} onClick={() => useScenario.setState({ playing: !playing })}>
          <Icon name={playing ? 'pause' : 'play'} size={16} />
        </button>
        <button className="icon-btn sm" title={t(UI.nextEvent)} onClick={() => director.jump(1)}><Icon name="skip-forward" /></button>
        <div className="seg">
          {SPEEDS.map((s) => (
            <button key={s} className={speed === s ? 'on' : ''} onClick={() => useScenario.setState({ speed: s })}>{s}x</button>
          ))}
        </div>
        {/* the colon is drawn (.clock-colon), so its dots are larger and centred on the digits' height */}
        <span className="clock" aria-label={fmtClock(DAY_START + tl)}>
          {fmtClock(DAY_START + tl).split(':').map((part, i) => (i ? [<span key="c" className="clock-colon" aria-hidden />, part] : part))}
        </span>
        <span className="tl-title">{ev && <Icon name={ev.icon} size={16} />}<DecodeText text={ev ? t(ev.title) : t(UI.between)} /></span>
      </div>
      <div
        className="tl-bar"
        ref={bar}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          seekFromPointer(e)
        }}
        onPointerMove={(e) => e.buttons && seekFromPointer(e)}
      >
        {/* sky and progress line are clipped to the track's rounded ends */}
        <div className="tl-clip">
          <div className="tl-sky" style={{ background: SKY_GRADIENT }} />
          <div className="tl-fill" ref={fill} />
        </div>
        {hours.map((h) => (
          <span key={h} className="tl-hour" style={{ left: pct(h) }}>{fmtClock(DAY_START + h)}</span>
        ))}
        {EVENTS.map((e, i) => (
          <button
            key={e.index}
            ref={(el) => { marks.current[i] = el }}
            className={`tl-event ${current === e.index ? 'on' : ''}`}
            style={{ left: pct(e.tl), marginTop: crowded(i) ? (i % 2 ? -15 : 15) : 0 }}
            title={`${DAY[e.index].time} ${t(DAY[e.index].title)}`}
            onPointerDown={(x) => {
              x.stopPropagation()
              director.seek(e.tl)
            }}
          >
            <Icon name={DAY[e.index].icon} />
          </button>
        ))}
        <div className="tl-head" ref={head} />
      </div>
    </div>
  )
}
