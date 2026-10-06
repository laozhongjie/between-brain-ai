import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { UI, useT } from '../i18n'
import { go } from '../route'
import { useStore } from '../store'
import { DecodeText } from '../ui/DecodeText'
import { ComparisonText } from '../ui/ComparisonText'
import { CHAPTERS, homeState } from './chapters'
import { HomeAI } from './HomeAI'
import { HeroField } from './HeroField'
import { HomeBrain } from './HomeBrain'

const PANEL_GAP = 8
const MARK_GAP_RATIO = 0.11
const clamp = (x: number) => Math.max(0, Math.min(1, x))
const ease = (x: number) => x * x * (3 - 2 * x)

// The page moves in steps: the mark, the five chapters, the closing view. One wheel gesture, swipe or key
// press moves one step, starting on the next frame; the rest of that gesture (trackpad momentum included)
// is ignored, so a strong flick never carries past a chapter. The opening (the mark growing into the first
// chapter) and the closing view are timed tweens; between chapters the switch is immediate and the text
// and camera animate themselves.
// Opening choreography, as fractions of the opening (o = 0 the mark, 1 the first chapter)
const OPENING = 211 // the opening's length in the units below
const op = (x: number) => x / OPENING
const HERO_END = op(59) // the hero's labels, lines and wordmark fade away
const FILL = [op(13), op(86)] // the white disc turns into a window onto brain | AI
const OPEN = [op(20), 1] // the disc grows until it fills the screen
const DISC_TURN = [op(3), op(20)] // portrait: the mark turns a quarter so its halves stack
const CHAPTER_SHOW = 0.82 // the chapter's title and captions come in this far through the opening
const OPEN_MS = 2600
const CLOSE_MS = 1900
const CTA_MS = 1100
// ease-out: moves on the first frame and settles softly
const easeOut = (k: number) => 1 - (1 - k) ** 2
const GESTURE_GAP = 120 // ms without wheel events that end a wheel gesture
const STEP_COOLDOWN = 250 // ms after a step before rising or reversed deltas can count as a new swipe
const TOUCH_SLOP = 12 // px a finger moves before a touch counts as a swipe
/** Steps: -1 the mark, 0 … n-1 the chapters, n the closing view. */
const LAST = CHAPTERS.length
/** Closing headline, one entry per line; its words rise in one after another (see .cta-word). */
const CTA_LINES = ['between what we understand', 'and what we can build']

/** Hero geometry from the stage size: disc radius and how far out the two labels sit. */
const heroGeom = (w: number, h: number) => {
  const portrait = w <= 760 && h > w
  return {
    r: Math.round(Math.max(38, Math.min(70, Math.min(w, h) * 0.075))),
    d: Math.round(portrait ? w * 0.24 : Math.max(150, Math.min(440, w * 0.29))),
    w,
    h,
  }
}

function Mark() {
  return (
    <svg className="home-mark" viewBox="0 0 32 32" aria-hidden>
      <path d="M14.35 1.091026A15 15 0 0 0 14.35 30.908974Z" />
      <path d="M17.65 1.091026A15 15 0 0 1 17.65 30.908974Z" />
    </svg>
  )
}

/** Point where the pointer crossed the button's edge, for the fill to grow from or shrink back to. */
const setOrigin = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/** Closing call to action: on hover a fill spreads from where the pointer entered and recedes to where it left. */
function CtaButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="cta-btn" onClick={onClick} onPointerEnter={setOrigin} onPointerLeave={setOrigin}>
      <span>{label}</span>
    </button>
  )
}

/**
 * The opening: HUMAN BRAIN and MACHINE AI on either side, hairlines carrying signals from each toward the
 * split disc at the centre, the BETWEEN wordmark beneath. Geometry follows the stage size.
 */
function Hero({ g }: { g: ReturnType<typeof heroGeom> }) {
  const t = useT()
  const cx = g.w / 2
  const cy = g.h / 2
  const top = cy - g.r - 96 // label baseline area
  const lines = [
    `M${cx - g.d},${top + 22} L${cx - g.r - 22},${cy}`,
    `M${cx + g.d},${top + 22} L${cx + g.r + 22},${cy}`,
  ]
  return (
    <div className="home-hero">
      <svg className="hero-lines" viewBox={`0 0 ${g.w} ${g.h}`} aria-hidden>
        {lines.map((d, i) => (
          <g key={i}>
            <path className="hl-base" d={d} pathLength={1} />
            <path className="hl-signal" d={d} pathLength={1} style={{ animationDelay: `${2 + i * 0.9}s` }} />
          </g>
        ))}
        <circle className="hl-node" cx={cx - g.d} cy={top + 22} r="2.5" />
        <circle className="hl-node" cx={cx + g.d} cy={top + 22} r="2.5" />
        <circle className="hl-end" cx={cx - g.r - 22} cy={cy} r="3.5" />
        <circle className="hl-end" cx={cx + g.r + 22} cy={cy} r="3.5" />
      </svg>

      <div className="hero-label left" style={{ right: `calc(50% + ${g.d - 12}px)`, top: top - 76 }}>
        <span className="hl-k">HUMAN</span>
        <span className="hl-name">Brain</span>
        <span className="hl-fact" title={t({
          zh: '典型成人大脑的估算值：约 860 亿个神经元，功耗约 20 W。神经元数量与模型参数量并不等价。',
          en: 'Estimates for a typical adult human brain: about 86 billion neurons and 20 W of power consumption. Neuron counts and model parameter counts are not equivalent.',
        })}>86 billion neurons · 20 W</span>
      </div>
      <div className="hero-label right" style={{ left: `calc(50% + ${g.d - 12}px)`, top: top - 76 }}>
        <span className="hl-k">MACHINE</span>
        <span className="hl-name">AI</span>
        <span className="hl-fact" title={t({
          zh: 'Kimi K3：2.8 万亿总参数，每个 token 激活 1040 亿参数。推理配置：一台 DGX B300（8 张 B300 GPU）。15,000 W 为整机额定功耗上限，并非模型实测推理功耗；实际功耗随负载变化。数据核对日期：2026 年 9 月 30 日。',
          en: 'Kimi K3: 2.8 trillion total parameters, 104 billion active per token. Inference configuration: one DGX B300 (8 B300 GPUs). 15,000 W is the rated whole-system maximum, not measured model inference power; actual draw varies with workload. Checked September 30, 2026.',
        })}>2.8 trillion parameters · 15,000 W max</span>
      </div>

      <div className="hero-copy" style={{ top: cy + g.r + 46 }}>
        <div className="hero-wordmark">BETWEEN</div>
        <p className="hero-lede">Exploring what lies between the brain and AI</p>
        <p className="hero-lede zh">探索人脑与人工智能的异同</p>
      </div>

      <div className="hero-foot left">09 DOMAINS · 26 TOPICS · 17 MECHANISMS</div>
      <div className="hero-foot right">SCROLL TO OPEN</div>
    </div>
  )
}

function SingleLineText({ text, perChar, trail }: { text: string; perChar: number; trail: number }) {
  const wrapper = useRef<HTMLSpanElement>(null)
  const measure = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const container = wrapper.current!
    const content = measure.current!
    const fit = () => {
      const width = content.getBoundingClientRect().width
      container.style.setProperty('--text-scale', String(width ? Math.min(1, container.getBoundingClientRect().width / width) : 1))
    }
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    observer.observe(content)
    fit()
    return () => observer.disconnect()
  }, [text])

  return (
    <span ref={wrapper} className="single-line-text">
      <span ref={measure} className="text-measure" aria-hidden>{text}</span>
      <DecodeText className="text-fit" text={text} perChar={perChar} trail={trail} />
    </span>
  )
}

export function Home() {
  const t = useT()
  const lang = useStore((s) => s.lang)
  const setLang = useStore((s) => s.setLang)
  const scroller = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(-1)
  const [geom, setGeom] = useState(() => heroGeom(window.innerWidth, window.innerHeight))
  // set by the effect below: jump to a chapter, or back to the mark
  const nav = useRef({ toChapter: (_i: number) => {}, toTop: () => {} })

  // Steps and tweens drive CSS variables directly (no re-render per frame); only the chapter index is React state
  useEffect(() => {
    const sc = scroller.current!
    const st = stage.current!
    let raf = 0
    /** A value eased toward a target over a fixed time; retargeting starts from where it is. */
    const tween = (v: number) => ({ v, from: v, to: v, t0: 0, dur: 0 })
    const o = tween(0) // opening
    const cta = tween(0) // closing view
    let step = -1
    let chapterIdx = 0
    const aim = (tw: ReturnType<typeof tween>, to: number, ms: number) => {
      if (tw.to === to) return
      Object.assign(tw, { from: tw.v, to, t0: performance.now(), dur: ms * Math.abs(to - tw.v) })
    }
    const advance = (tw: ReturnType<typeof tween>, now: number) => {
      const k = tw.dur > 0 ? clamp((now - tw.t0) / tw.dur) : 1
      tw.v = tw.from + (tw.to - tw.from) * easeOut(k)
      return k < 1
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(update) }
    const goTo = (k: number) => {
      step = Math.max(-1, Math.min(LAST, k))
      if (step >= 0 && step < LAST) chapterIdx = step
      if (step < 0) chapterIdx = 0
      aim(o, step < 0 ? 0 : 1, o.to === 1 && step < 0 ? CLOSE_MS : OPEN_MS)
      aim(cta, step === LAST ? 1 : 0, CTA_MS)
      kick()
    }

    const update = (now: number) => {
      raf = 0
      const moving = [advance(o, now), advance(cta, now)].some(Boolean)
      const h = clamp(o.v / HERO_END)
      const fill = 1 - clamp((o.v - FILL[0]) / (FILL[1] - FILL[0]))
      const open = ease(clamp((o.v - OPEN[0]) / (OPEN[1] - OPEN[0])))
      const g = heroGeom(st.clientWidth, st.clientHeight)
      const portrait = st.clientWidth <= 760 && st.clientHeight > st.clientWidth
      const cover = Math.hypot(st.clientWidth / 2, st.clientHeight / 2) + PANEL_GAP
      for (const el of [sc, st]) el.style.setProperty('--hero', h.toFixed(3))
      st.style.setProperty('--fill', fill.toFixed(3))
      // the windows stay hidden until the white starts to fade, so nothing shows through the slit before then
      st.style.setProperty('--shown', fill < 1 ? '1' : '0')
      st.style.setProperty('--open', open.toFixed(3))
      if (portrait) st.style.setProperty('--disc-angle', `${-90 * (1 - ease(clamp((o.v - DISC_TURN[0]) / (DISC_TURN[1] - DISC_TURN[0]))))}deg`)
      else st.style.removeProperty('--disc-angle')
      st.style.setProperty('--half-gap', `${g.r * MARK_GAP_RATIO * (1 - open) + PANEL_GAP / 2 * open}px`)
      st.style.setProperty('--r', `${(g.r + open * open * (cover - g.r)).toFixed(1)}px`)
      st.style.setProperty('--cta', cta.v.toFixed(3))
      st.classList.toggle('cta-on', cta.to === 1 && cta.v > 0.15)
      homeState.hero = h
      homeState.reveal = 1 - fill
      const c = o.v >= CHAPTER_SHOW ? chapterIdx : -1
      homeState.chapter = c
      homeState.open = open
      setChapter(c)
      if (moving) raf = requestAnimationFrame(update)
    }

    // Wheel: the first event of a gesture steps at once; the rest of it is ignored, so trackpad momentum never
    // carries past a chapter. A new gesture starts after a short pause, on a change of direction, or when
    // the deltas climb again while the last swipe's momentum is still dying away (a new swipe on top of it),
    // so the next step never waits for the momentum to run out
    let lastWheel = 0
    let lastSign = 0
    let stepAt = 0
    const recent: number[] = [] // |deltaY| of the current gesture's last few events
    const mean = (xs: number[]) => xs.reduce((a, x) => a + x, 0) / xs.length
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return // pinch zoom, sideways swipes
      const now = performance.now()
      const d = Math.abs(e.deltaY)
      const sign = Math.sign(e.deltaY)
      if (!sign) return
      const paused = now - lastWheel > GESTURE_GAP
      lastWheel = now
      if (paused) recent.length = 0
      recent.push(d)
      if (recent.length > 8) recent.shift()
      const settled = now - stepAt > STEP_COOLDOWN
      const reversed = settled && sign !== lastSign && d > 2
      const rising = settled && recent.length >= 6 && mean(recent.slice(-3)) > Math.max(6, 1.5 * mean(recent.slice(0, -3)))
      lastSign = sign
      if (!paused && !reversed && !rising) return
      stepAt = now
      recent.length = 0
      goTo(step + sign)
    }
    let touchY: number | null = null
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches.length === 1 ? e.touches[0].clientY : null }
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return
      const dy = touchY - e.touches[0].clientY // positive: swiping up, i.e. forward
      if (Math.abs(dy) < TOUCH_SLOP) return
      touchY = null // one step per swipe
      goTo(step + Math.sign(dy))
    }
    const onTouchEnd = () => { touchY = null }
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const k = e.key
      const dir = k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey) ? 1
        : k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey) ? -1 : 0
      if (k === 'Home' || k === 'End') { e.preventDefault(); goTo(k === 'Home' ? -1 : LAST); return }
      if (!dir || e.repeat) return
      e.preventDefault()
      goTo(step + dir)
    }

    nav.current = { toChapter: (i) => goTo(i), toTop: () => goTo(-1) }

    const onResize = () => { setGeom(heroGeom(st.clientWidth, st.clientHeight)); kick() }
    sc.addEventListener('wheel', onWheel, { passive: true })
    sc.addEventListener('touchstart', onTouchStart, { passive: true })
    sc.addEventListener('touchmove', onTouchMove, { passive: true })
    sc.addEventListener('touchend', onTouchEnd, { passive: true })
    sc.addEventListener('touchcancel', onTouchEnd, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    update(performance.now())
    return () => {
      sc.removeEventListener('wheel', onWheel)
      sc.removeEventListener('touchstart', onTouchStart)
      sc.removeEventListener('touchmove', onTouchMove)
      sc.removeEventListener('touchend', onTouchEnd)
      sc.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      homeState.chapter = -1
      homeState.open = 0
      homeState.hero = 0
      homeState.reveal = 0
    }
  }, [])

  // The systems chapter colours the brain by function; restore the atlas setting on the way out
  useEffect(() => {
    const saved = useStore.getState().view.colorMode
    return () => useStore.getState().setView({ colorMode: saved })
  }, [])
  useEffect(() => {
    if (chapter < 0) return
    useStore.getState().setView({ colorMode: CHAPTERS[chapter].systems ? 'system' : 'anatomy' })
  }, [chapter])

  const ch = chapter >= 0 ? CHAPTERS[chapter] : null

  return (
    <div className="home" ref={scroller}>
      <header className="home-head">
        <button className="home-brand" onClick={() => nav.current.toTop()}>
          <Mark /><span className="wordmark">BETWEEN</span>
        </button>
        <div className="home-head-r">
          <div className="seg lang">
            <button className={lang === 'zh' ? 'on' : ''} onClick={() => setLang('zh')}>中文</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className="home-explore" onClick={() => go('/atlas')}>EXPLORE</button>
        </div>
      </header>

      <div className="home-track">
        <div className="home-stage" ref={stage}>
          {/* the two worlds, seen through the split disc */}
          <div className="home-half left">
            <HomeBrain />
            <div className="home-caption">
              <span className="hc-side">BRAIN</span>
              {ch && <p><SingleLineText text={t(ch.brain)} perChar={16} trail={4} /></p>}
            </div>
          </div>
          <div className="home-half right">
            <HomeAI />
            <div className="home-caption">
              <span className="hc-side">AI</span>
              {ch && <p><SingleLineText text={t(ch.ai)} perChar={16} trail={4} /></p>}
            </div>
          </div>

          {/* the mark itself: white halves that turn into windows as the page scrolls */}
          <div className="hero-fill left" />
          <div className="hero-fill right" />
          <HeroField />
          <Hero g={geom} />

          {ch && (
            <div className="home-chapter">
              <div className="hc-tag">{String(chapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · <ComparisonText text={ch.tag} /></div>
              <h2><SingleLineText text={t(ch.title)} perChar={34} trail={5} /></h2>
            </div>
          )}

          <nav className="home-steps" aria-label="chapters">
            {CHAPTERS.map((c, i) => (
              <button key={i} className={i === chapter ? 'on' : ''} onClick={() => nav.current.toChapter(i)} title={t(c.title)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </nav>

          <div className="home-cta">
            <p className="cta-line">
              {CTA_LINES.map((line, l) => (
                <span key={l} className="cta-row">
                  {line.split(' ').map((w, i) => (
                    <span key={i} className="cta-word" style={{ '--i': l * 4 + i } as React.CSSProperties}>{w}</span>
                  ))}
                </span>
              ))}
            </p>
            <p className="cta-line zh">在理解与创造之间</p>
            <div className="cta-actions">
              <CtaButton label={t(UI.navAtlas)} onClick={() => go('/atlas')} />
              <CtaButton label={t(UI.navAi)} onClick={() => go('/ai')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
