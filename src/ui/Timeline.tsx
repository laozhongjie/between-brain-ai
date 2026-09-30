import { useRef } from 'react'
import { DAY, fmtClock } from '../data/scenario'
import { UI, useT } from '../i18n'
import { DAY_START, EVENTS, director, useScenario } from '../sim/director'
import { Icon } from './Icon'

const SPEEDS = [1, 2, 4]
const pct = (tl: number) => `${(tl / 1440) * 100}%`
// Night band on the timeline: 22:30 → 06:30 (end of the 24 h strip)
const NIGHT_FROM = (22.5 * 60 - DAY_START + 1440) % 1440

/** Events closer than ~35 min are staggered vertically so their markers don't overlap. */
const crowded = (i: number) =>
  (i > 0 && EVENTS[i].tl - EVENTS[i - 1].tl < 35) || (i + 1 < EVENTS.length && EVENTS[i + 1].tl - EVENTS[i].tl < 35)

export function Timeline() {
  const t = useT()
  const { tl, playing, speed, current } = useScenario()
  const bar = useRef<HTMLDivElement>(null)

  const seekFromPointer = (e: React.PointerEvent) => {
    const r = bar.current!.getBoundingClientRect()
    director.seek(Math.max(0, Math.min(1439, ((e.clientX - r.left) / r.width) * 1440)))
  }

  const ev = current >= 0 ? DAY[current] : null
  const hours = Array.from({ length: 8 }, (_, i) => i * 3 * 60 + (9 * 60 - DAY_START)) // 09:00, 12:00, …

  return (
    <div className="panel timeline">
      <div className="tl-controls">
        <button className="icon-btn sm" title={t(UI.prevEvent)} onClick={() => director.jump(-1)}><Icon name="skip-back" /></button>
        <button className="play-btn" title={t(playing ? UI.pause : UI.play)} onClick={() => useScenario.setState({ playing: !playing })}>
          <Icon name={playing ? 'pause' : 'play'} size={16} />
        </button>
        <button className="icon-btn sm" title={t(UI.nextEvent)} onClick={() => director.jump(1)}><Icon name="skip-forward" /></button>
        <div className="seg">
          {SPEEDS.map((s) => (
            <button key={s} className={speed === s ? 'on' : ''} onClick={() => useScenario.setState({ speed: s })}>{s}×</button>
          ))}
        </div>
        <span className="clock">{fmtClock(DAY_START + tl)}</span>
        <span className="tl-title">{ev ? <><Icon name={ev.icon} size={16} /><span>{t(ev.title)}</span></> : <span>{t(UI.between)}</span>}</span>
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
        <div className="tl-night" style={{ left: pct(NIGHT_FROM), right: 0 }} />
        <div className="tl-night" style={{ left: 0, width: pct(0) }} />
        <div className="tl-fill" style={{ width: pct(tl) }} />
        {hours.map((h) => (
          <span key={h} className="tl-hour" style={{ left: pct(h) }}>{fmtClock(DAY_START + h)}</span>
        ))}
        {EVENTS.map((e, i) => (
          <button
            key={e.index}
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
        <div className="tl-head" style={{ left: pct(tl) }} />
      </div>
    </div>
  )
}
