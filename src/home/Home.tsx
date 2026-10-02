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

// Scroll timeline, laid out in vh of scroll distance and used as fractions of it. Each chapter gets about
// one and a half screens, so a light trackpad flick does not carry past it.
const OPENING_VH = 211
const CHAPTER_VH = 153
const CLOSING_VH = 66
const SCROLL_VH = OPENING_VH + CHAPTERS.length * CHAPTER_VH + CLOSING_VH // the track is this plus one screen
const at = (vh: number) => vh / SCROLL_VH
const HERO_END = at(59) // the hero's labels, lines and wordmark fade away
const FILL = [at(13), at(86)] // the white disc turns into a window onto brain | AI
const OPEN = [at(20), at(OPENING_VH)] // the disc grows until it fills the screen
const CH = [at(OPENING_VH), at(OPENING_VH + CHAPTERS.length * CHAPTER_VH)] // five chapters
const CTA = CH[1] // closing call to action
const CTA_RAMP = at(46)
const chapterAt = (i: number) => CH[0] + ((i + 0.5) / CHAPTERS.length) * (CH[1] - CH[0])
/** Where the arrow keys step: the top, each chapter's centre, the closing view. */
const KEY_STOPS = [0, ...CHAPTERS.map((_, i) => chapterAt(i)), 1]
// ease-out: the glide answers the key press at once and settles softly
const easeOut = (k: number, n: number) => 1 - (1 - k) ** n
const SMOOTH_MS = 110 // the stage eases toward the scroll position, so mouse-wheel steps glide like a trackpad
/** Closing headline, one entry per line; its words rise in one after another (see .cta-word). */
const CTA_LINES = ['between what we understand', 'and what we can build']

/** Hero geometry from the stage size: disc radius and how far out the two labels sit. */
const heroGeom = (w: number, h: number) => ({
  r: Math.round(Math.max(38, Math.min(70, Math.min(w, h) * 0.075))),
  d: Math.round(Math.max(150, Math.min(440, w * 0.29))),
  w,
  h,
})

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
          zh: 'Kimi K3：2.8 万亿总参数，每个 token 激活 1040 亿参数。推理配置：一台 DGX B300（8 张 B300 GPU）。15,000 W 为整机额定功耗上限，并非模型实测推理功耗；实际功耗随负载变化。数据核对日期：2026-09-30。',
          en: 'Kimi K3: 2.8 trillion total parameters, 104 billion active per token. Inference configuration: one DGX B300 (8 B300 GPUs). 15,000 W is the rated whole-system maximum, not measured model inference power; actual draw varies with workload. Checked 2026-09-30.',
        })}>2.8 trillion parameters · 15,000 W max</span>
      </div>

      <div className="hero-copy" style={{ top: cy + g.r + 46 }}>
        <div className="hero-wordmark">BETWEEN</div>
        <p className="hero-lede">Exploring what lies between the brain and AI</p>
        <p className="hero-lede zh">探索人脑与人工智能的异同</p>
      </div>

      <div className="hero-foot left">05 LAYERS · 28 CARDS · 05 LABS · 93 REFERENCES</div>
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
  const keyGlide = useRef(false) // an arrow-key glide is already smooth: the stage follows it without easing
  const [chapter, setChapter] = useState(-1)
  const [geom, setGeom] = useState(() => heroGeom(window.innerWidth, window.innerHeight))

  // Scroll drives CSS variables directly (no re-render per frame); only the chapter index is React state
  useEffect(() => {
    const sc = scroller.current!
    const st = stage.current!
    let raf = 0
    let p = -1 // displayed progress; -1 until the first frame, which jumps straight to the scroll position
    let last = 0
    const update = (now: number) => {
      raf = 0
      const max = sc.scrollHeight - sc.clientHeight
      const target = max > 0 ? sc.scrollTop / max : 0
      const dt = last ? Math.min(64, Math.max(0, now - last)) : 16
      p = p < 0 || keyGlide.current ? target : p + (target - p) * (1 - Math.exp(-dt / SMOOTH_MS))
      if (Math.abs(target - p) < 1e-4) p = target
      last = p === target ? 0 : now
      const h = clamp(p / HERO_END)
      const fill = 1 - clamp((p - FILL[0]) / (FILL[1] - FILL[0]))
      const open = ease(clamp((p - OPEN[0]) / (OPEN[1] - OPEN[0])))
      const g = heroGeom(st.clientWidth, st.clientHeight)
      const cover = Math.hypot(st.clientWidth / 2, st.clientHeight / 2) + PANEL_GAP
      const cta = clamp((p - CTA) / CTA_RAMP)
      for (const el of [sc, st]) el.style.setProperty('--hero', h.toFixed(3))
      st.style.setProperty('--fill', fill.toFixed(3))
      st.style.setProperty('--reveal', (1 - fill).toFixed(3))
      st.style.setProperty('--open', open.toFixed(3))
      st.style.setProperty('--half-gap', `${g.r * MARK_GAP_RATIO * (1 - open) + PANEL_GAP / 2 * open}px`)
      st.style.setProperty('--r', `${(g.r + open * open * (cover - g.r)).toFixed(1)}px`)
      st.style.setProperty('--cta', cta.toFixed(3))
      st.classList.toggle('cta-on', cta > 0.5)
      homeState.hero = h
      homeState.reveal = 1 - fill
      const c = p < CH[0] ? -1 : Math.min(CHAPTERS.length - 1, Math.floor(((p - CH[0]) / (CH[1] - CH[0])) * CHAPTERS.length))
      homeState.chapter = c
      homeState.open = open
      setChapter(c)
      if (p !== target) raf = requestAnimationFrame(update)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onResize = () => { setGeom(heroGeom(st.clientWidth, st.clientHeight)); onScroll() }
    sc.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    update(performance.now())
    return () => {
      sc.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
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

  const toChapter = (i: number) => {
    const sc = scroller.current!
    sc.scrollTo({ top: chapterAt(i) * (sc.scrollHeight - sc.clientHeight), behavior: 'smooth' })
  }

  // Arrow up / down glide one stop (our own eased tween: a browser smooth scroll rushes the long opening).
  // Presses during a glide count from where it is heading; any other input (wheel, touch, click) stops it
  useEffect(() => {
    const sc = scroller.current!
    let aim: number | null = null
    let glide = 0
    const stop = () => { cancelAnimationFrame(glide); glide = 0; aim = null; keyGlide.current = false }
    const onKey = (e: KeyboardEvent) => {
      if ((e.key !== 'ArrowDown' && e.key !== 'ArrowUp') || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const max = sc.scrollHeight - sc.clientHeight
      if (max <= 0) return
      e.preventDefault()
      const from = aim ?? sc.scrollTop / max
      const to = e.key === 'ArrowDown' ? KEY_STOPS.find((s) => s > from + 1e-3) : KEY_STOPS.findLast((s) => s < from - 1e-3)
      if (to === undefined) return
      cancelAnimationFrame(glide)
      aim = to
      const y0 = sc.scrollTop
      const y1 = to * max
      // through the opening: longer and a softer curve, so the unfold is spread out rather than front-loaded
      const opening = Math.min(from, to) < CH[0]
      const dur = opening ? 2600 : 900
      const n = opening ? 2 : 3
      const t0 = performance.now()
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur)
        sc.scrollTop = y0 + (y1 - y0) * easeOut(k, n)
        if (k < 1) glide = requestAnimationFrame(step)
        else { glide = 0; aim = null; keyGlide.current = false }
      }
      keyGlide.current = true
      glide = requestAnimationFrame(step)
    }
    window.addEventListener('keydown', onKey)
    for (const t of ['wheel', 'touchstart', 'pointerdown'] as const) window.addEventListener(t, stop, { passive: true })
    return () => {
      cancelAnimationFrame(glide)
      window.removeEventListener('keydown', onKey)
      for (const t of ['wheel', 'touchstart', 'pointerdown'] as const) window.removeEventListener(t, stop)
    }
  }, [])

  const ch = chapter >= 0 ? CHAPTERS[chapter] : null

  return (
    <div className="home" ref={scroller}>
      <header className="home-head">
        <button className="home-brand" onClick={() => scroller.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
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

      <div className="home-track" style={{ height: `${SCROLL_VH + 100}vh` }}>
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
              <button key={i} className={i === chapter ? 'on' : ''} onClick={() => toChapter(i)} title={t(c.title)}>
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
