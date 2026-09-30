import { useEffect, useRef, useState } from 'react'
import { UI, useT } from '../i18n'
import { go } from '../route'
import { useStore } from '../store'
import { DecodeText } from '../ui/DecodeText'
import { CHAPTERS, homeState } from './chapters'
import { HomeAI } from './HomeAI'
import { HomeBrain } from './HomeBrain'

const GAP = 8 // px, the slit between the two halves (the logo's gap, scaled up)
const R0 = 7 // px, radius of the split disc when it first forms
const clamp = (x: number) => Math.max(0, Math.min(1, x))
const ease = (x: number) => x * x * (3 - 2 * x)

// Scroll timeline (fractions of the whole page)
const HERO_END = 0.1 // labels drift apart, the two dots close in
const OPEN = [0.12, 0.32] // the split disc grows until it fills the screen
const CH = [0.32, 0.9] // five chapters
const CTA = 0.9 // closing call to action

function Mark() {
  return (
    <svg className="home-mark" viewBox="0 0 32 32" aria-hidden>
      <path d="M15.35 1.014A15 15 0 0 0 15.35 30.986Z" />
      <path d="M16.65 1.014A15 15 0 0 1 16.65 30.986Z" />
    </svg>
  )
}

/** The opening composition, after the sketch: HUMAN BRAIN and MACHINE AI converging on BETWEEN. */
function HeroFigure() {
  return (
    <svg className="home-figure" viewBox="0 0 400 230" aria-hidden>
      <g className="hf-left">
        <text x="128" y="46">HUMAN</text>
        <text x="136" y="76">BRAIN</text>
        <text x="144" y="108">\</text>
        <text x="150" y="136">\</text>
        <text x="156" y="164">\</text>
      </g>
      <g className="hf-right">
        <text x="272" y="46">MACHINE</text>
        <text x="264" y="76">AI</text>
        <text x="256" y="108">/</text>
        <text x="250" y="136">/</text>
        <text x="244" y="164">/</text>
      </g>
      <text className="hf-mid" x="200" y="76">·</text>
      <g className="hf-dots">
        <circle className="hf-dot l" cx="146" cy="190" r="5" />
        <circle className="hf-dot r" cx="254" cy="190" r="5" />
      </g>
      <text className="hf-between" x="200" y="190">BETWEEN</text>
    </svg>
  )
}

export function Home() {
  const t = useT()
  const lang = useStore((s) => s.lang)
  const setLang = useStore((s) => s.setLang)
  const scroller = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(-1)

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
      const open = ease(clamp((p - OPEN[0]) / (OPEN[1] - OPEN[0])))
      const cover = Math.hypot(sc.clientWidth / 2, sc.clientHeight / 2) + GAP
      const cta = clamp((p - CTA) / 0.07)
      st.style.setProperty('--hero', h.toFixed(3))
      st.style.setProperty('--open', open.toFixed(3))
      st.style.setProperty('--r', `${(p < OPEN[0] ? 0 : R0 + open * open * cover).toFixed(1)}px`)
      st.style.setProperty('--cta', cta.toFixed(3))
      st.classList.toggle('opened', p >= OPEN[0])
      st.classList.toggle('cta-on', cta > 0.5)
      const c = p < CH[0] ? -1 : Math.min(CHAPTERS.length - 1, Math.floor(((p - CH[0]) / (CH[1] - CH[0])) * CHAPTERS.length))
      homeState.chapter = c
      homeState.open = open
      setChapter(c)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    sc.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      sc.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      homeState.chapter = -1
      homeState.open = 0
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
          <button className="home-explore" onClick={() => go('/atlas')}>EXPLORE ↗</button>
        </div>
      </header>

      <div className="home-track">
        <div className="home-stage" ref={stage}>
          {/* the two worlds, revealed through the split disc */}
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

          <div className="home-hero">
            <HeroFigure />
            <p className="home-lede">Exploring what lies between<br />brains and machines.</p>
            <p className="home-lede zh">探索人脑与人工智能之间。</p>
            <div className="home-scroll">SCROLL</div>
          </div>

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
              <button className="cta-btn primary" onClick={() => go('/atlas')}>{t(UI.navAtlas)} ↗</button>
              <button className="cta-btn" onClick={() => go('/ai')}>{t(UI.navAi)} →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
