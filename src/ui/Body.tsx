import { NODE_BY_ID } from '../data/nodes'
import type { BodyPart } from '../data/scenario'
import { engine } from '../sim/engine'

// Body parts light up from live organ activity (closed-loop output) and from scenario cues.
const ORGANS: Record<BodyPart, string[]> = {
  eyes: ['lh.eye', 'rh.eye'],
  ears: ['lh.ear', 'rh.ear'],
  nose: ['nose'],
  mouth: ['tongue', 'larynx'],
  arms: ['muscles'],
  legs: ['muscles'],
  heart: ['heart'],
  gut: ['viscera'],
  adrenal: ['adrenal'],
}

function level(part: BodyPart, cued: BodyPart[]) {
  let a = 0
  for (const id of ORGANS[part]) a = Math.max(a, engine.activity[NODE_BY_ID[id].index])
  if (part === 'arms' || part === 'legs') a *= 0.5
  return Math.min(1, a + (cued.includes(part) ? 0.8 : 0))
}

export function Body({ cued, heartRate }: { cued: BodyPart[]; heartRate: number }) {
  const g = (p: BodyPart) => {
    const a = level(p, cued)
    return { fill: `rgba(140,123,110, ${0.1 + 0.75 * a})`, filter: a > 0.35 ? 'url(#glow)' : undefined }
  }
  const beat = `${(60 / Math.max(40, heartRate)).toFixed(2)}s`
  return (
    <svg viewBox="0 0 120 200" className="body-svg" aria-hidden>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="body-outline">
        <circle cx="60" cy="26" r="17" />
        <rect x="54" y="42" width="12" height="9" rx="3" />
        <path d="M40 52 Q60 47 80 52 L78 116 Q60 122 42 116 Z" />
      </g>
      <g style={g('arms')} className="body-part">
        <path d="M40 54 Q30 70 26 90 L20 118 L26 120 L33 92 Q38 76 43 66 Z" />
        <path d="M80 54 Q90 70 94 90 L100 118 L94 120 L87 92 Q82 76 77 66 Z" />
      </g>
      <g style={g('legs')} className="body-part">
        <path d="M44 116 L42 190 L52 190 L58 122 Z" />
        <path d="M76 116 L78 190 L68 190 L62 122 Z" />
      </g>
      <g style={g('eyes')} className="body-part"><circle cx="53" cy="23" r="2.6" /><circle cx="67" cy="23" r="2.6" /></g>
      <g style={g('ears')} className="body-part"><ellipse cx="42" cy="27" rx="2.6" ry="5" /><ellipse cx="78" cy="27" rx="2.6" ry="5" /></g>
      <g style={g('nose')} className="body-part"><path d="M60 25 L57 32 L63 32 Z" /></g>
      <g style={g('mouth')} className="body-part"><ellipse cx="60" cy="36" rx="5" ry="2" /></g>
      <g style={g('heart')} className="body-part heart" >
        <path d="M66 70 c0-4 6-5 6-0.5 c0-4.5 6-3.5 6 0.5 c0 4-6 7-6 9 c0-2-6-5-6-9z" style={{ animationDuration: beat }} />
      </g>
      <g style={g('adrenal')} className="body-part"><path d="M49 86 l3-4 l3 4z" /><path d="M65 86 l3-4 l3 4z" /></g>
      <g style={g('gut')} className="body-part"><ellipse cx="60" cy="100" rx="11" ry="8" /></g>
    </svg>
  )
}
