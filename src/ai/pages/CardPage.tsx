import { TOUR_BY_ID } from '../../data/tours'
import type { Bi } from '../../data/types'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { enterFocus } from '../../sim/focus'
import { useStore } from '../../store'
import { CARD_BY_ID, CROSS_TOPICS, DOMAINS, MECH_CONTENT, MECH_ORDER, TOPIC_BY_ID, mechCode, mechOfCard, topicHref, topicsOfLegacy } from '../content'
import { FIGS, MECH_FIGS } from '../figs'
import type { MechFigs } from '../figs/types'
import { LABS } from '../labs/registry'
import { Rich, Tex } from '../Tex'
import type { Card, Formula, MechEntry } from '../types'
import { EvidenceBadge, KindTags, PagerLink, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'
import { splitComparison } from '../../rich'
import { Figure as TopicFigure, FormulaCard, Steps } from './TopicPage'

function Figure({ Fig, cap }: { Fig: import('../figs/types').FigPair['brain']; cap: import('../../data/types').Bi }) {
  const t = useT()
  return (
    <figure className="fig">
      <Fig t={t} />
      <figcaption><Rich text={t(cap)} /></figcaption>
    </figure>
  )
}

function Formulas({ list }: { list?: Formula[] }) {
  const t = useT()
  if (!list?.length) return null
  return (
    <div className="card-math">
      <h4>{t(UI.showMath)}</h4>
      <div className="formulas">
        {list.map((f, i) => (
          <figure key={i} className="formula">
            <Tex tex={f.tex} />
            <figcaption><Rich text={t(f.caption)} /></figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function ReviewTable({ rows, systems, gap }: { rows: { dimension: Bi; brain: Bi; ai: Bi; gap?: Bi }[]; systems: { biological: Bi; computational: Bi }; gap?: boolean }) {
  const t = useT()
  return (
    <table className={`card-comparison review-table ${gap ? 'review-table-gap' : ''}`}>
      <thead><tr><th scope="col">{t(UI.dimension)}</th><th scope="col">{t(systems.biological)}</th><th scope="col">{t(systems.computational)}</th>{gap && <th scope="col">{t(UI.gapColumn)}</th>}</tr></thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{t(row.dimension)}</th>
            <td><span className="comparison-mobile-label" aria-hidden>{t(systems.biological)}</span><Rich text={t(row.brain)} /></td>
            <td><span className="comparison-mobile-label" aria-hidden>{t(systems.computational)}</span><Rich text={t(row.ai)} /></td>
            {gap && row.gap && <td><span className="comparison-mobile-label" aria-hidden>{t(UI.gapColumn)}</span><Rich text={t(row.gap)} /></td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ReviewCardContent({ card, figs }: { card: Card; figs?: import('../figs/types').FigPair }) {
  const t = useT()
  const review = card.guide!.review!
  return (
    <>
      <section aria-labelledby="card-capabilities-title">
        <h2 id="card-capabilities-title">{t(UI.secDiffs)}</h2>
        <ReviewTable rows={review.capabilities} systems={review.systems} gap />
      </section>

      <section aria-labelledby="card-architecture-title" className="review-architecture">
        <h2 id="card-architecture-title">{t(UI.secArchitecture)}</h2>
        <div className="review-architecture-grid">
          <section className="review-system biological-system">
            <h3>{t(review.systems.biological)}</h3>
            {figs && <Figure Fig={figs.brain} cap={figs.brainCap} />}
          </section>
          <section className="review-system computational-system">
            <h3>{t(review.systems.computational)}</h3>
            {figs && <Figure Fig={figs.ai} cap={figs.aiCap} />}
          </section>
        </div>
      </section>

      <section aria-labelledby="card-state-title">
        <h2 id="card-state-title">{t(UI.secState)}</h2>
        <ReviewTable rows={review.state} systems={review.systems} />
      </section>

      <section aria-labelledby="card-timescales-title">
        <h2 id="card-timescales-title">{t(UI.secTimescales)}</h2>
        <ReviewTable rows={review.timescale} systems={review.systems} />
      </section>

      <section aria-labelledby="card-mechanisms-title">
        <h2 id="card-mechanisms-title">{t(UI.secMechanisms)}</h2>
        <div className="two-col review-mechanisms">
          <section className="col brain-col">
            <h3>{t(review.systems.biological)}</h3>
            {card.brain && <p><Rich text={t(card.brain)} /></p>}
            <Formulas list={card.brainMath} />
          </section>
          <section className="col ai-col">
            <h3>{t(review.systems.computational)}</h3>
            {card.ai && <p><Rich text={t(card.ai)} /></p>}
            <Formulas list={card.aiMath} />
          </section>
        </div>
      </section>

      <section aria-labelledby="card-limits-title">
        <h2 id="card-limits-title">{t(UI.secLimits)}</h2>
        <div className="review-limits">
          <div><h3>{t(review.systems.biological)}</h3><p><Rich text={t(review.limits.biological)} /></p></div>
          <div><h3>{t(review.systems.computational)}</h3><p><Rich text={t(review.limits.computational)} /></p></div>
          <div><h3>{t(UI.reviewEvidence)}</h3><p><Rich text={t(review.limits.evidence)} /></p></div>
        </div>
      </section>
    </>
  )
}

/** The old card layout, still used by the system cards that topic pages have not replaced. */
function MechanismContent({ card, figs }: { card: Card; figs?: import('../figs/types').FigPair }) {
  const t = useT()
  const guide = card.guide!
  // The two sides are named in the title: "biological ↔ computational"
  const [bioName, compName] = splitComparison(t(card.title))
  const left = bioName ?? t(UI.secBrain)
  const right = compName ?? t(UI.secAi)
  return (
    <>
      <section aria-labelledby="card-mechanisms-title">
        <h2 id="card-mechanisms-title">{t(UI.secMechanisms)}</h2>
        <div className="two-col">
          <section className="col brain-col">
            <h3><Icon name="brain" /><Rich text={left} /></h3>
            {figs && <Figure Fig={figs.brain} cap={figs.brainCap} />}
            {card.brain && <p><Rich text={t(card.brain)} /></p>}
            <Formulas list={card.brainMath} />
          </section>
          <section className="col ai-col">
            <h3><Icon name="cpu" /><Rich text={right} /></h3>
            {figs && <Figure Fig={figs.ai} cap={figs.aiCap} />}
            {card.ai && <p><Rich text={t(card.ai)} /></p>}
            <Formulas list={card.aiMath} />
          </section>
        </div>
      </section>

      <section aria-labelledby="card-comparison-title">
        <h2 id="card-comparison-title">{t(UI.secCompare)}</h2>
        <p className="card-scope"><strong>{t(UI.comparisonScope)}</strong> · {t(guide.scope)}</p>
        <table className="card-comparison">
          <thead><tr><th scope="col">{t(UI.dimension)}</th><th scope="col"><Rich text={left} /></th><th scope="col"><Rich text={right} /></th></tr></thead>
          <tbody>
            {guide.comparisons.map((row, index) => (
              <tr key={index}>
                <th scope="row">{t(row.dimension)}</th>
                <td><span className="comparison-mobile-label" aria-hidden><Rich text={left} /></span><Rich text={t(row.brain)} /></td>
                <td><span className="comparison-mobile-label" aria-hidden><Rich text={right} /></span><Rich text={t(row.ai)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="card-validity-title">
        <h2 id="card-validity-title">{t(UI.secValidity)}</h2>
        <p><Rich text={t(guide.boundary)} /></p>
      </section>
    </>
  )
}

/** Where a `topic:<id>` or `card:<id>` link goes, and the name to show for it. */
function linkTarget(to: string): { href: string | null; name: Bi } {
  const [kind, id] = to.split(':')
  if (kind === 'topic') return { href: topicHref(TOPIC_BY_ID[id]), name: TOPIC_BY_ID[id].name }
  const title = CARD_BY_ID[id].title
  return { href: `/ai/card/${id}`, name: { zh: splitComparison(title.zh)[0], en: splitComparison(title.en)[0] } }
}

/** A mechanism entry in the lean template: the mechanism figure with its numbered steps, the computational
 * counterpart, taught equations (and links to those taught elsewhere), conditions, and where it does its work. */
function MechEntryContent({ card, entry, figs }: { card: Card; entry: MechEntry; figs?: MechFigs }) {
  const t = useT()
  const counterpart = splitComparison(t(card.title))[1]
  return (
    <>
      <section aria-labelledby="mech-figure-title">
        <h2 id="mech-figure-title">{t(UI.secMechFigure)}</h2>
        <div className="mech-arch bio">
          <div className="mech-arch-fig">
            <TopicFigure Fig={figs?.mech} />
            <aside className="arch-notes">
              <h5>{t(UI.archNotes)}</h5>
              <ul>{entry.notes.map((n, i) => <li key={i}><Rich text={t(n)} /></li>)}</ul>
            </aside>
          </div>
          <Steps steps={entry.steps} side="bio" anchor="mech-bio" />
        </div>
      </section>

      <section aria-labelledby="mech-counterpart-title">
        <h2 id="mech-counterpart-title">{t(UI.secCounterpart)}</h2>
        <div className="mech-counterpart comp">
          {counterpart && <h3><Rich text={counterpart} /></h3>}
          <ul>{entry.counterpart.map((p, i) => <li key={i}><Rich text={t(p)} /></li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="mech-math-title">
        <h2 id="mech-math-title">{t(UI.secMath)}</h2>
        {entry.math.map((f, i) => <FormulaCard key={i} f={f} side="bio" fig={figs?.math?.[i]} />)}
        {entry.elsewhere.length > 0 && (
          <div className="mech-elsewhere">
            <h3>{t(UI.mathElsewhere)}</h3>
            <ul>
              {entry.elsewhere.map((e, i) => {
                const target = linkTarget(e.to)
                return (
                  <li key={i}>
                    <span><Rich text={t(e.title)} /></span>
                    <button className="chip topic-chip" disabled={!target.href} onClick={() => target.href && go(target.href)}>{t(target.name)}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby="mech-conditions-title">
        <h2 id="mech-conditions-title">{t(UI.secConditions)}</h2>
        <ul className="mech-conditions">{entry.conditions.map((c, i) => <li key={i}><Rich text={t(c)} /></li>)}</ul>
      </section>

      <section aria-labelledby="mech-uses-title">
        <h2 id="mech-uses-title">{t(UI.secUses)}</h2>
        <ul className="mech-uses">
          {entry.uses.map((u, i) => {
            const target = linkTarget(u.to)
            return (
              <li key={i}>
                <button className="chip topic-chip" disabled={!target.href} onClick={() => target.href && go(target.href)}>{t(target.name)}</button>
                <p><Rich text={t(u.role)} /></p>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

/** Where a card sits in the new structure: a mechanism group, or the topics an old system card stands in for. */
function useCardPlace(card: Card) {
  const t = useT()
  const group = mechOfCard(card.id)
  if (group) {
    return { crumb: `${t(UI.scaleIndex)} · ${t(group.name)} · ${mechCode(card.id)}`, group, topics: [] as ReturnType<typeof topicsOfLegacy> }
  }
  const topics = topicsOfLegacy(card.id)
  const domain = topics[0] && DOMAINS.find((d) => d.topics.includes(topics[0].id))
  const cross = CROSS_TOPICS.find((x) => x.legacy === card.id)
  const crumb = domain ? `${t(UI.functionalDomains)} · ${t(domain.name)}` : cross ? `${t(UI.crossCuttingTopics)} · ${t(cross.name)}` : ''
  return { crumb, group: undefined, topics }
}

export function CardPage({ card }: { card: Card }) {
  const t = useT()
  const place = useCardPlace(card)
  const Lab = card.lab ? LABS[card.lab] : null
  const figs = FIGS[card.id]
  const guide = card.guide
  // Mechanism entries page through the index in order
  const idx = place.group ? MECH_ORDER.findIndex((c) => c.id === card.id) : -1
  const prev = idx > 0 ? MECH_ORDER[idx - 1] : undefined
  const next = idx >= 0 ? MECH_ORDER[idx + 1] : undefined
  const groupLabel = (c: Card) => `${mechCode(c.id)} · ${t(mechOfCard(c.id)!.name)}`
  const entry = MECH_CONTENT[card.id]

  const openInAtlas = () => {
    useStore.getState().setViewMode('3d')
    go('/atlas')
    enterFocus(card.tour!)
  }

  return (
    <article className={`ai-page card-page${entry ? ' topic-page mech-page' : ''}`}>
      <div className="crumbs">
        <button className="btn-sm crumb-back" onClick={() => go('/ai')}><Icon name="arrow-left" />{t(UI.backToLadder)}</button>
        {place.crumb && <span>{place.crumb}</span>}
      </div>
      <h1><ComparisonText text={t(card.title)} /></h1>
      {!place.group && <p className="card-note legacy-note">{t(UI.legacyNote)}</p>}
      <div className="card-intro">
        {guide?.review ? (
          <>
            <span className="card-kicker">{t(UI.secThesis)}</span>
            <h2>{t(guide.review.thesis)}</h2>
          </>
        ) : (
          <p className="lead"><Rich text={t(entry ? entry.definition : guide!.answer)} /></p>
        )}
      </div>
      <div className="card-badges">
        <KindTags kinds={card.kinds} />
        <EvidenceBadge ev={card.evidence} />
        {entry && (
          <>
            <span className="mech-tag"><b>{t(UI.tagScale)}</b>{t(entry.scale)}</span>
            <span className="mech-tag"><b>{t(UI.tagTimescale)}</b>{t(entry.timescale)}</span>
          </>
        )}
        {card.tour && (
          <button className="btn-sm" onClick={openInAtlas}><Icon name="brain" />{t(UI.viewInAtlas)}{t({ zh: '：', en: ': ' })}{t(TOUR_BY_ID[card.tour].name)}</button>
        )}
      </div>
      {entry ? <MechEntryContent card={card} entry={entry} figs={MECH_FIGS[card.id]} />
        : guide?.review ? <ReviewCardContent card={card} figs={figs} /> : <MechanismContent card={card} figs={figs} />}

      {Lab && (
        <section id="lab" className="lab-section">
          <h2><Icon name="flask" /><span>{t(UI.secLab)} · <Rich text={t(Lab.title)} /></span></h2>
          <Lab.component />
        </section>
      )}


      <section>
        <h2><Icon name="library" />{t(UI.secRefs)}</h2>
        <RefList ids={entry ? entry.refs : card.refs ?? []} />
      </section>

      {place.group && (
        <nav className="pager">
          {prev ? <PagerLink dir="prev" label={groupLabel(prev)} title={t(prev.title)} onClick={() => go(`/ai/card/${prev.id}`)} /> : <span />}
          {next ? <PagerLink dir="next" label={groupLabel(next)} title={t(next.title)} onClick={() => go(`/ai/card/${next.id}`)} /> : <span />}
        </nav>
      )}
    </article>
  )
}
