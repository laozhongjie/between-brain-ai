import { useEffect, useRef, useState } from 'react'
import { UI, useT } from '../i18n'
import { go } from '../route'
import { useStore } from '../store'
import { DecodeText } from '../ui/DecodeText'
import { CHAPTERS, homeState } from './chapters'
import { HomeAI } from './HomeAI'
import { HeroField } from './HeroField'
import { HomeBrain } from './HomeBrain'

const GAP = 8 // px, the slit between the two halves (the logo's gap, scaled up)
const clamp = (x: number) => Math.max(0, Math.min(1, x))
const ease = (x: number) => x * x * (3 - 2 * x)

// Scroll timeline (fractions of the whole page)
const HERO_END = 0.09 // the hero's labels, lines and wordmark fade away
const FILL = [0.02, 0.13] // the white disc turns into a window onto brain | AI
const OPEN = [0.03, 0.32] // the disc grows until it fills the screen
const CH = [0.32, 0.9] // five chapters
const CTA = 0.9 // closing call to action

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
      <path d="M15.35 1.014A15 15 0 0 0 15.35 30.986Z" />
      <path d="M16.65 1.014A15 15 0 0 1 16.65 30.986Z" />
    </svg>
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
        <span className="hl-fact">86 billion neurons · 20 W</span>
      </div>
      <div className="hero-label right" style={{ left: `calc(50% + ${g.d - 12}px)`, top: top - 76 }}>
        <span className="hl-k">MACHINE</span>
        <span className="hl-name">AI</span>
        <span className="hl-fact" title={t({
          zh: 'Kimi K3：2.8 万亿总参数，每个 token 激活 1040 亿参数。推理配置：一台 DGX B300（8 张 B300 GPU）。15,000 W 为整机额定功耗上限，并非模型实测推理功耗；实际功耗随负载变化。数据核对于 2026-09-30。',
          en: 'Kimi K3: 2.8 trillion total parameters, 104 billion active per token. Inference configuration: one DGX B300 (8 B300 GPUs). 15,000 W is the rated whole-system maximum, not measured model inference power; actual draw varies with workload. Checked 2026-09-30.',
        })}>2.8 trillion parameters · 15,000 W max</span>
      </div>

      <div className="hero-copy" style={{ top: cy + g.r + 46 }}>
        <div className="hero-wordmark">BETWEEN</div>
        <p className="hero-lede">Exploring what lies between brains and machines</p>
        <p className="hero-lede zh">探索人脑与人工智能之间</p>
      </div>

      <div className="hero-foot left">05 LAYERS · 28 CARDS · 05 LABS · 93 REFERENCES</div>
      <div className="hero-foot right">SCROLL TO OPEN</div>
    </div>
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

  // Scroll drives CSS variables directly (no re-render per frame); only the chapter index is React state
  useEffect(() => {
    const sc = scroller.current!
    const st = stage.current!
    let raf = 0
    const update = () => {
      raf = 0
      const max = sc.scrollHeight - sc.clientHeight
      const p = max > 0 ? sc.scrollTop / max : 0
      const h = clamp(p / HERO_END)
      const fill = 1 - clamp((p - FILL[0]) / (FILL[1] - FILL[0]))
      const open = ease(clamp((p - OPEN[0]) / (OPEN[1] - OPEN[0])))
      const g = heroGeom(st.clientWidth, st.clientHeight)
      const cover = Math.hypot(st.clientWidth / 2, st.clientHeight / 2) + GAP
      const cta = clamp((p - CTA) / 0.07)
      for (const el of [sc, st]) el.style.setProperty('--hero', h.toFixed(3))
      st.style.setProperty('--fill', fill.toFixed(3))
      st.style.setProperty('--reveal', (1 - fill).toFixed(3))
      st.style.setProperty('--open', open.toFixed(3))
      st.style.setProperty('--r', `${(g.r + open * open * (cover - g.r)).toFixed(1)}px`)
      st.style.setProperty('--cta', cta.toFixed(3))
      st.classList.toggle('cta-on', cta > 0.5)
      homeState.hero = h
      const c = p < CH[0] ? -1 : Math.min(CHAPTERS.length - 1, Math.floor(((p - CH[0]) / (CH[1] - CH[0])) * CHAPTERS.length))
      homeState.chapter = c
      homeState.open = open
      setChapter(c)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onResize = () => { setGeom(heroGeom(st.clientWidth, st.clientHeight)); onScroll() }
    sc.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    update()
    return () => {
      sc.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      homeState.chapter = -1
      homeState.open = 0
      homeState.hero = 0
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
    const max = sc.scrollHeight - sc.clientHeight
    const p = CH[0] + ((i + 0.5) / CHAPTERS.length) * (CH[1] - CH[0])
    sc.scrollTo({ top: p * max, behavior: 'smooth' })
  }

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

      <div className="home-track">
        <div className="home-stage" ref={stage}>
          {/* the two worlds, seen through the split disc */}
          <div className="home-half left">
            <HomeBrain />
            <div className="home-caption">
              <span className="hc-side">BRAIN</span>
              {ch && <p><DecodeText text={t(ch.brain)} perChar={16} trail={4} /></p>}
            </div>
          </div>
          <div className="home-half right">
            <HomeAI />
            <div className="home-caption">
              <span className="hc-side">AI</span>
              {ch && <p><DecodeText text={t(ch.ai)} perChar={16} trail={4} /></p>}
            </div>
          </div>

          {/* the mark itself: white halves that turn into windows as the page scrolls */}
          <div className="hero-fill left" />
          <div className="hero-fill right" />
          <HeroField />
          <Hero g={geom} />

          {ch && (
            <div className="home-chapter">
              <div className="hc-tag">{String(chapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · {ch.tag}</div>
              <h2><DecodeText text={t(ch.title)} perChar={34} trail={5} /></h2>
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
            <p className="cta-line">between what we understand<br />and what we can build</p>
            <p className="cta-line zh">在已理解的与能构建的之间</p>
            <div className="cta-actions">
              <button className="cta-btn primary" onClick={() => go('/atlas')}>{t(UI.navAtlas)}</button>
              <button className="cta-btn" onClick={() => go('/ai')}>{t(UI.navAi)}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
