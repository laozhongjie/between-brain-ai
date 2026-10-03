import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import type { Bi } from '../data/types'
import { ink } from '../theme'

const b = (zh: string, en: string): Bi => ({ zh, en })

/**
 * Schematic canvas (SVG viewBox units). Information flows left (senses) → right (body outputs).
 * Three zones (input · the brain's internal loop · output) separated by gutters; inside the brain,
 * functional lanes run horizontally so each system's nodes sit together in one framed band.
 *
 * The layout is built for a vertical stretch `k`: row positions spread to fill the panel's height while
 * node and text sizes stay fixed. Edges are routed orthogonally: vertical runs in the channels between
 * columns, horizontal runs in the corridors between rows, so no line crosses a node.
 */
export const NODE_W = 130
export const NODE_H = 28
const STEP = 152
const GUTTER = 28
const colX = (c: number) => 75 + c * STEP + (c >= 1 ? GUTTER : 0) + (c >= 8 ? GUTTER : 0)
export const W = colX(8) + 80
/** Height of the unstretched layout; the header above TOP is never stretched. */
export const BASE_H = 862
const TOP = 30
const ROW = 42 // row pitch inside a lane (unstretched)

export type BusKey = 'brainstem' | 'spinalcord'
export const isBus = (k: string): k is BusKey => k === 'brainstem' || k === 'spinalcord'

// [key, column, y, short zh, short en]; rows are grouped into the functional lanes below
const TABLE: [string, number, number, string, string][] = [
  // Vision · attention
  ['eye', 0, 144, '眼睛', 'Eye'],
  ['lgn', 1, 144, '外侧膝状体', 'LGN'],
  ['pericalcarine', 2, 144, 'V1 初级视觉', 'V1 visual'],
  ['cuneus', 3, 102, '楔叶 V2/V3', 'Cuneus V2/V3'],
  ['lateraloccipital', 3, 144, '枕外侧 LOC', 'LOC'],
  ['lingual', 3, 186, '舌回', 'Lingual'],
  ['superiorparietal', 4, 102, '顶上小叶', 'Sup. parietal'],
  ['fusiform', 4, 144, '梭状回 · 面孔', 'Fusiform · faces'],
  ['inferiortemporal', 5, 144, '颞下回 · 物体', 'Inf. temporal'],
  ['temporalpole', 5, 186, '颞极', 'Temporal pole'],
  ['caudalmiddlefrontal', 6, 102, '额叶眼区/前运动', 'FEF / premotor'],
  ['rostralmiddlefrontal', 6, 144, '背外侧前额叶', 'DLPFC'],

  // Hearing · language
  ['ear', 0, 262, '耳朵', 'Ear'],
  ['mgn', 1, 262, '内侧膝状体', 'MGN'],
  ['transversetemporal', 2, 262, 'A1 初级听觉', 'A1 auditory'],
  ['superiortemporal', 3, 262, 'Wernicke 区', 'Wernicke'],
  ['supramarginal', 3, 304, '缘上回', 'Supramarginal'],
  ['middletemporal', 4, 262, '颞中回 · 词义', 'Mid. temporal'],
  ['inferiorparietal', 4, 304, '角回', 'Angular gyrus'],
  ['parstriangularis', 5, 262, '三角部 · 选词', 'Pars triangularis'],
  ['parsopercularis', 6, 262, 'Broca 区', 'Broca'],
  ['larynx', 8, 262, '发声 · 喉舌唇', 'Vocal tract'],

  // Body sense · movement
  ['skin', 0, 380, '皮肤', 'Skin'],
  ['vpl', 1, 380, '丘脑腹后核', 'VPL / VPM'],
  ['postcentral', 2, 380, 'S1 躯体感觉', 'S1 touch'],
  ['cerebellum', 5, 464, '小脑', 'Cerebellum'],
  ['superiorfrontal', 6, 380, '辅助运动区', 'SMA'],
  ['caudate', 6, 422, '尾状核', 'Caudate'],
  ['paracentral', 6, 464, '中央旁小叶', 'Paracentral'],
  ['precentral', 7, 380, 'M1 初级运动', 'M1 motor'],
  ['putamen', 7, 422, '壳核', 'Putamen'],
  ['pallidum', 7, 464, '苍白球', 'Pallidum'],
  ['thalamus', 7, 506, '丘脑', 'Thalamus'],
  ['muscles', 8, 422, '骨骼肌', 'Muscles'],

  // Emotion · memory · homeostasis
  ['nose', 0, 582, '鼻子', 'Nose'],
  ['tongue', 0, 624, '舌头', 'Tongue'],
  ['viscera', 0, 666, '内脏', 'Gut'],
  ['insula', 2, 582, '岛叶', 'Insula'],
  ['entorhinal', 2, 624, '内嗅皮层', 'Entorhinal'],
  ['hippocampus', 3, 624, '海马', 'Hippocampus'],
  ['parahippocampal', 3, 666, '海马旁回', 'Parahippocampal'],
  ['amygdala', 4, 582, '杏仁核', 'Amygdala'],
  ['posteriorcingulate', 4, 624, '后扣带回', 'Post. cingulate'],
  ['precuneus', 4, 666, '楔前叶', 'Precuneus'],
  ['lateralorbitofrontal', 5, 582, '外侧眶额', 'Lateral OFC'],
  ['medialorbitofrontal', 5, 624, '腹内侧前额叶', 'vmPFC'],
  ['accumbens', 5, 666, '伏隔核', 'Accumbens'],
  ['caudalanteriorcingulate', 6, 582, '前扣带回', 'dACC'],
  ['hypothalamus', 6, 624, '下丘脑', 'Hypothalamus'],
  ['pituitary', 7, 666, '垂体', 'Pituitary'],
  ['heart', 8, 603, '心脏', 'Heart'],
  ['adrenal', 8, 666, '肾上腺', 'Adrenal'],

  // Arousal · neuromodulators
  ['aras', 1, 742, '网状激活系统', 'ARAS'],
  ['scn', 2, 742, '生物钟 · SCN', 'SCN · clock'],
  ['pineal', 3, 742, '松果体', 'Pineal'],
  ['lc', 4, 742, '蓝斑 · NE', 'LC · NE'],
  ['vta', 5, 742, '腹侧被盖区 · DA', 'VTA · DA'],
  ['snc', 6, 742, '黑质 · DA', 'SNc · DA'],
  ['raphe', 7, 742, '中缝核 · 5-HT', 'Raphe · 5-HT'],
]


export interface SNode {
  key: string
  col: number
  x: number
  y: number
  label: Bi
  color: string
  /** brighter tone for strokes */
  ink: string
}

export interface SEdge {
  id: string
  from: string
  to: string
  /** pathway indices using this hop */
  paths: number[]
  color: string
  inhib: boolean
  d: string
}

export interface Zone { x0: number; x1: number; y0: number; y1: number; label: Bi }
export interface Lane { x0: number; x1: number; y0: number; y1: number; label: Bi; color: string }
export interface Bus { y: number; x0: number; x1: number }

export interface Stage { x0: number; x1: number; y0: number; y1: number; label: Bi }

export interface Layout {
  k: number
  H: number
  nodes: SNode[]
  byKey: Record<string, SNode>
  buses: Record<BusKey, Bus>
  zones: Zone[]
  lanes: Lane[]
  /** processing stages: vertical bands over the columns they cover */
  stages: Stage[]
  edges: SEdge[]
  /** corner points of each edge before rounding (for checks) */
  routes: Record<string, [number, number][]>
}

const STAGE_DEFS: [number, number, Bi][] = [
  [1, 1, b('中继', 'Relay')],
  [2, 5, b('皮层处理与整合', 'Cortical processing')],
  [6, 7, b('决策与控制', 'Decision & control')],
]

const PAD = 72 // zone edge to column centre
const LANE_DEFS: [number, number, Bi, keyof typeof SYSTEMS][] = [
  [102, 186, b('视觉 · 注意', 'Vision · attention'), 'visual'],
  [262, 304, b('听觉 · 语言', 'Hearing · language'), 'language'],
  [380, 506, b('躯体感觉 · 运动', 'Body sense · movement'), 'motor'],
  [582, 666, b('情绪 · 记忆 · 稳态', 'Emotion · memory · homeostasis'), 'emotion'],
  [742, 742, b('觉醒 · 神经调质', 'Arousal · neuromodulators'), 'arousal'],
]

const keyOf = (id: string) => NODE_BY_ID[id].key

export type Pt = [number, number]

/** Polyline with rounded corners (radius r, shortened on tight segments). */
function rounded(pts: Pt[], r = 6): string {
  const p = pts.filter((q, i) => i === 0 || q[0] !== pts[i - 1][0] || q[1] !== pts[i - 1][1])
  let d = `M${p[0][0]},${p[0][1]}`
  for (let i = 1; i < p.length - 1; i++) {
    const [ax, ay] = p[i - 1]
    const [bx, by] = p[i]
    const [cx, cy] = p[i + 1]
    const l1 = Math.hypot(bx - ax, by - ay)
    const l2 = Math.hypot(cx - bx, cy - by)
    const rr = Math.min(r, l1 / 2, l2 / 2)
    d += ` L${bx - ((bx - ax) / l1) * rr},${by - ((by - ay) / l1) * rr} Q${bx},${by} ${bx + ((cx - bx) / l2) * rr},${by + ((cy - by) / l2) * rr}`
  }
  const last = p[p.length - 1]
  return `${d} L${last[0]},${last[1]}`
}

export function makeLayout(k = 1): Layout {
  const sy = (y: number) => TOP + (y - TOP) * k
  const H = Math.round(sy(BASE_H))
  const hw = NODE_W / 2
  const hh = NODE_H / 2

  const nodes: SNode[] = TABLE.map(([key, c, y, zh, en]) => {
    const n = NODE_BY_ID[key] ?? NODE_BY_ID[`lh.${key}`]
    const color = SYSTEMS[n.info.system].color
    return { key, col: c, x: colX(c), y: sy(y), label: { zh, en }, color, ink: ink(color, 0.3) }
  })
  const byKey: Record<string, SNode> = Object.fromEntries(nodes.map((n) => [n.key, n]))

  const busX0 = colX(1) - hw
  const busX1 = colX(7) + hw
  const buses: Record<BusKey, Bus> = {
    brainstem: { y: sy(796), x0: busX0, x1: busX1 },
    spinalcord: { y: sy(832), x0: busX0, x1: busX1 },
  }

  const ioBottom = sy(700)
  const zones: Zone[] = [
    { x0: colX(0) - PAD, x1: colX(0) + PAD, y0: TOP, y1: ioBottom, label: b('输入 · 感觉器官', 'Input · senses') },
    { x0: colX(1) - PAD, x1: colX(7) + PAD, y0: TOP, y1: H - 4, label: b('大脑内部 · 处理回路', 'Inside the brain · processing loop') },
    { x0: colX(8) - PAD, x1: colX(8) + PAD, y0: TOP, y1: ioBottom, label: b('输出 · 身体', 'Output · body') },
  ]
  const lanes: Lane[] = LANE_DEFS.map(([top, bottom, label, sys]) => ({
    y0: sy(top) - hh - 16,
    y1: sy(bottom) + hh + 12,
    x0: colX(1) - PAD + 8,
    x1: colX(7) + PAD - 8,
    label,
    color: SYSTEMS[sys].color,
  }))

  const stages: Stage[] = STAGE_DEFS.map(([c0, c1, label]) => ({
    x0: colX(c0) - hw - 8,
    x1: colX(c1) + hw + 8,
    y0: 42,
    y1: lanes[lanes.length - 1].y1 + 6,
    label,
  }))

  // Parallel runs sharing a channel or corridor are spread a few units apart
  const slots = new Map<string, number>()
  const spread = (channel: string) => {
    const i = slots.get(channel) ?? 0
    slots.set(channel, i + 1)
    return [0, -1, 1, -2, 2, -3, 3][i % 7] // in steps; scaled to the room each channel has
  }
  /** x of the channel right of column c (between c and c+1) */
  const chan = (c: number) => (colX(c) + hw + colX(c + 1) - hw) / 2
  /** is any node strictly between columns ca and cb on the row at y? */
  const rowBlocked = (y: number, ca: number, cb: number) => nodes.some((n) => n.y === y && n.col > Math.min(ca, cb) && n.col < Math.max(ca, cb))
  /** corridor between rows, on the side of the target */
  const corridor = (y: number, towardY: number) => y + (towardY >= y ? 1 : -1) * (ROW * k) / 2

  // Unique edges first, so each node side can hand out distinct ports before routing
  const map = new Map<string, SEdge>()
  PATHWAYS.forEach((p, pi) => {
    for (let h = 0; h + 1 < p.nodes.length; h++) {
      const from = keyOf(p.nodes[h])
      const to = keyOf(p.nodes[h + 1])
      if (from === to) continue
      const id = `${from}>${to}`
      let e = map.get(id)
      if (!e) {
        e = { id, from, to, paths: [], color: ink(SYSTEMS[p.system].color, 0.3), inhib: p.kind === 'inhib', d: '' }
        map.set(id, e)
      }
      e.paths.push(pi)
    }
  })
  const edges = [...map.values()]

  // Visual grammar: feedforward edges run left → right (out of the right edge, into the left edge, arrow ▸);
  // feedback edges leave from the bottom and come back up into the target's bottom edge (arrow ▴);
  // same-column links enter the top or bottom.
  type Side = 'L' | 'R' | 'T' | 'B'
  const R2 = (ROW * k) / 2 // half the row pitch: corridors run midway between rows
  const CH = 3.2 // channel spread step: ±3 steps stay inside the 22-unit gap between columns
  const RS = Math.max(0.5, (R2 - hh - 2) / 3) // corridor spread step: stays clear of the rows on both sides
  const hasBetween = (col: number, y0: number, y1: number) =>
    nodes.some((n) => n.col === col && n.y > Math.min(y0, y1) && n.y < Math.max(y0, y1))
  const sides = (e: SEdge): { src?: Side; dst?: Side } => {
    if (isBus(e.from) && isBus(e.to)) return {}
    if (isBus(e.to)) return { src: byKey[e.from].col === 8 ? 'L' : 'R' }
    if (isBus(e.from)) return { dst: byKey[e.to].col === 0 ? 'R' : 'L' }
    const a = byKey[e.from]
    const c = byKey[e.to]
    if (c.col > a.col) return { src: 'R', dst: 'L' }
    if (c.col < a.col) return { src: 'B', dst: 'B' }
    return c.y > a.y ? { src: 'B', dst: 'T' } : { src: 'T', dst: 'B' }
  }
  /** attachment point on side `side` of node `k2` (edges sharing a side share the point, arrowheads merge) */
  const port = (k2: string, side: Side): Pt => {
    const n = byKey[k2]
    if (side === 'L') return [n.x - hw, n.y]
    if (side === 'R') return [n.x + hw, n.y]
    if (side === 'T') return [n.x, n.y - hh]
    return [n.x, n.y + hh]
  }

  /** corridor just above a bar (between the two bars for the spinal cord) */
  const busCorridor = (k2: BusKey) => (k2 === 'brainstem' ? buses.brainstem.y - 9 - 10 : (buses.brainstem.y + buses.spinalcord.y) / 2)
  /** clamp an x onto a bar, leaving room for the bar ends */
  const onBar = (x: number) => Math.min(busX1 - 16, Math.max(busX0 + 16, x))

  function route(e: SEdge): Pt[] {
    const { from, to } = e
    if (isBus(from) && isBus(to)) {
      // ascending (spinal cord → brainstem) round the left ends, descending round the right ends
      const sp = buses.spinalcord
      const bs = buses.brainstem
      if (from === 'spinalcord') {
        const x = busX0 - 10
        return [[busX0, sp.y], [x, sp.y], [x, bs.y], [busX0, bs.y]]
      }
      const x = busX1 + 10
      return [[busX1, bs.y], [x, bs.y], [x, sp.y], [busX1, sp.y]]
    }
    if (isBus(to)) {
      // node → bar: out sideways into the nearest channel, down to the corridor above the bar, onto its top edge
      const a = byKey[from]
      const s2 = sides(e).src!
      const p0 = port(from, s2)
      const x = (a.col === 8 ? chan(7) : chan(a.col)) + CH * spread(`c${a.col === 8 ? 7 : a.col}`)
      const cy = busCorridor(to) + 2 * spread(`bc${to}`)
      const xe = onBar(x) === x ? x : onBar(x) + (x > busX1 ? -1 : 1) * Math.abs(spread(`be${to}`)) * 4
      const top = buses[to].y - 9
      return [p0, [x, p0[1]], [x, cy], [xe, cy], [xe, top]]
    }
    if (isBus(from)) {
      // bar → node: up from the bar's top edge to the corridor, along to the channel, into the node's side
      const c = byKey[to]
      const s2 = sides(e).dst!
      const p1 = port(to, s2)
      const x = (c.col === 0 ? chan(0) : chan(c.col - 1)) + CH * spread(`c${c.col === 0 ? 0 : c.col - 1}`)
      const cy = busCorridor(from) + 2 * spread(`bc${from}`)
      const xe = onBar(x) === x ? x : onBar(x) + (x > busX1 ? -1 : 1) * Math.abs(spread(`be${from}`)) * 4
      const top = buses[from].y - 9
      return [[xe, top], [xe, cy], [x, cy], [x, p1[1]], p1]
    }
    const a = byKey[from]
    const c = byKey[to]
    const s2 = sides(e)
    const p0 = port(from, s2.src!)
    const p1 = port(to, s2.dst!)
    if (e.id === 'inferiortemporal>entorhinal') {
      const leftOfA1 = byKey.transversetemporal.x - hw - 12
      const entorhinalLeft = port(to, 'L')
      const clearY = p0[1] + 8
      return [p0, [p0[0], clearY], [leftOfA1, clearY], [leftOfA1, entorhinalLeft[1]], entorhinalLeft]
    }
    if (c.col > a.col) {
      // feedforward
      if (c.col === a.col + 1 || (a.y === c.y && !rowBlocked(a.y, a.col, c.col))) {
        const x = chan(a.col) + CH * spread(`c${a.col}`)
        return [p0, [x, p0[1]], [x, p1[1]], p1]
      }
      const x1 = chan(a.col) + CH * spread(`c${a.col}`)
      const x2 = chan(c.col - 1) + CH * spread(`c${c.col - 1}`)
      const cyBase = corridor(a.y, c.y)
      const cy = cyBase + RS * spread(`r${Math.round(cyBase)}`)
      return [p0, [x1, p0[1]], [x1, cy], [x2, cy], [x2, p1[1]], p1]
    }
    if (c.col < a.col) {
      // feedback: down to the corridor under the source, back along it, over to the corridor under the target, up
      const y1 = a.y + R2 + RS * spread(`r${Math.round(a.y + R2)}`)
      const y2 = c.y + R2 + RS * spread(`r${Math.round(c.y + R2)}`)
      if (Math.abs(y1 - y2) < 1) return [p0, [p0[0], y1], [p1[0], y1], p1]
      const x = chan(c.col) + CH * spread(`c${c.col}`)
      return [p0, [p0[0], y1], [x, y1], [x, y2], [p1[0], y2], p1]
    }
    // same column
    const down = c.y > a.y
    const y1 = a.y + (down ? R2 : -R2)
    const y2 = c.y + (down ? -R2 : R2)
    if (!hasBetween(a.col, a.y, c.y)) {
      const y = y1 + RS * spread(`r${Math.round(y1)}`) / 2
      return [p0, [p0[0], y], [p1[0], y], p1]
    }
    const x = chan(a.col) + CH * spread(`c${a.col}`)
    return [p0, [p0[0], y1], [x, y1], [x, y2], [p1[0], y2], p1]
  }
  const routes: Record<string, Pt[]> = {}
  for (const e of edges) {
    routes[e.id] = route(e)
    e.d = rounded(routes[e.id])
  }


  return { k, H, nodes, byKey, buses, zones, lanes, stages, edges, routes }
}

/** Unstretched layout (used by tests and as the initial render). */
export const BASE_LAYOUT = makeLayout(1)
export const SNODES = BASE_LAYOUT.nodes
export const SNODE_BY_KEY = BASE_LAYOUT.byKey
export const SEDGES = BASE_LAYOUT.edges
export const SEDGE_BY_ID: Record<string, SEdge> = Object.fromEntries(SEDGES.map((e) => [e.id, e]))
/** For each pathway hop: the schematic edge id it maps to. */
export const HOP_EDGE: string[][] = PATHWAYS.map((p) => p.nodes.slice(0, -1).map((id, h) => `${keyOf(id)}>${keyOf(p.nodes[h + 1])}`))
