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
export const NODE_W = 118
export const NODE_H = 28
const STEP = 140
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

export interface Layout {
  k: number
  H: number
  nodes: SNode[]
  byKey: Record<string, SNode>
  buses: Record<BusKey, Bus>
  zones: Zone[]
  lanes: Lane[]
  edges: SEdge[]
}

/** Stage names across the brain zone, shown as one centred line under its title. */
export const STAGES: Bi = b('中继 → 皮层处理与整合 → 决策与控制', 'Relay → cortical processing → decision & control')

const PAD = 72 // zone edge to column centre
const LANE_DEFS: [number, number, Bi, keyof typeof SYSTEMS][] = [
  [102, 186, b('视觉 · 注意', 'Vision · attention'), 'visual'],
  [262, 304, b('听觉 · 语言', 'Hearing · language'), 'language'],
  [380, 506, b('躯体感觉 · 运动', 'Body sense · movement'), 'motor'],
  [582, 666, b('情绪 · 记忆 · 稳态', 'Emotion · memory · homeostasis'), 'emotion'],
  [742, 742, b('觉醒 · 神经调质', 'Arousal · neuromodulators'), 'arousal'],
]

const keyOf = (id: string) => NODE_BY_ID[id].key

type Pt = [number, number]

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

  // Parallel runs sharing a channel or corridor are spread a few units apart
  const slots = new Map<string, number>()
  const spread = (channel: string) => {
    const i = slots.get(channel) ?? 0
    slots.set(channel, i + 1)
    return [0, -4, 4, -8, 8, -12, 12][i % 7]
  }
  /** x of the channel right of column c (between c and c+1) */
  const chan = (c: number) => (colX(c) + hw + colX(c + 1) - hw) / 2
  /** is any node strictly between columns ca and cb on the row at y? */
  const rowBlocked = (y: number, ca: number, cb: number) => nodes.some((n) => n.y === y && n.col > Math.min(ca, cb) && n.col < Math.max(ca, cb))
  /** corridor between rows, on the side of the target */
  const corridor = (y: number, towardY: number) => y + (towardY >= y ? 1 : -1) * (ROW * k) / 2

  function route(from: string, to: string): string {
    const bs = buses
    if (isBus(from) && isBus(to)) {
      // ascending (spinal cord → brainstem) on the left end, descending on the right end
      if (from === 'spinalcord') {
        const x = busX0 - 12
        return rounded([[busX0, bs.spinalcord.y], [x, bs.spinalcord.y], [x, bs.brainstem.y], [busX0 + 2, bs.brainstem.y]], 8)
      }
      const x = busX1 + 12
      return rounded([[busX1, bs.brainstem.y], [x, bs.brainstem.y], [x, bs.spinalcord.y], [busX1 - 2, bs.spinalcord.y]], 8)
    }
    if (isBus(to)) {
      const a = byKey[from]
      const bus = bs[to]
      const top = bus.y - 9
      if (a.col === 0) {
        // senses: down the input gutter, into the bus from its left end
        const x = chan(0) + spread('c0')
        return rounded([[a.x + hw, a.y], [x, a.y], [x, bus.y], [bus.x0, bus.y]])
      }
      if (a.col === 8) {
        // body feedback: back down the output gutter, into the bus from its right end
        const x = chan(7) + spread('c7')
        return rounded([[a.x - hw, a.y], [x, a.y], [x, bus.y], [bus.x1, bus.y]])
      }
      const x = chan(a.col) + spread(`c${a.col}`)
      return rounded([[a.x + hw, a.y], [x, a.y], [x, top]])
    }
    if (isBus(from)) {
      const b2 = byKey[to]
      const bus = bs[from]
      if (b2.col === 0) {
        const x = chan(0) + spread('c0')
        return rounded([[bus.x0, bus.y], [x, bus.y], [x, b2.y], [b2.x + hw, b2.y]])
      }
      if (b2.col === 8) {
        // body outputs: out of the bus's right end, up the output gutter
        const x = chan(7) + spread('c7')
        return rounded([[bus.x1, bus.y], [x, bus.y], [x, b2.y], [b2.x - hw, b2.y]])
      }
      const x = chan(b2.col - 1) + spread(`c${b2.col - 1}`)
      return rounded([[x, bus.y - 9], [x, b2.y], [b2.x - hw, b2.y]])
    }
    const a = byKey[from]
    const b2 = byKey[to]
    if (b2.col > a.col) {
      // forward: out of the right edge, enter the left edge
      if (b2.col === a.col + 1 || (a.y === b2.y && !rowBlocked(a.y, a.col, b2.col))) {
        const x = chan(a.col) + (a.y === b2.y ? 0 : spread(`c${a.col}`))
        return rounded([[a.x + hw, a.y], [x, a.y], [x, b2.y], [b2.x - hw, b2.y]])
      }
      const x1 = chan(a.col) + spread(`c${a.col}`)
      const x2 = chan(b2.col - 1) + spread(`c${b2.col - 1}`)
      const cy = corridor(a.y, b2.y) + spread(`r${Math.round(corridor(a.y, b2.y))}`)
      return rounded([[a.x + hw, a.y], [x1, a.y], [x1, cy], [x2, cy], [x2, b2.y], [b2.x - hw, b2.y]])
    }
    if (b2.col === a.col) {
      // same column: a bracket along the right-hand channel, entering from the right
      const x = chan(a.col) + spread(`c${a.col}`)
      return rounded([[a.x + hw, a.y], [x, a.y], [x, b2.y], [b2.x + hw, b2.y]])
    }
    // backward (feedback): out of the left edge, enter the target's right edge
    const x1 = chan(a.col - 1) + spread(`c${a.col - 1}`)
    const x2 = chan(b2.col) + spread(`c${b2.col}`)
    if (b2.col === a.col - 1) return rounded([[a.x - hw, a.y], [x1, a.y], [x1, b2.y], [b2.x + hw, b2.y]])
    const cy = corridor(a.y, b2.y) + spread(`r${Math.round(corridor(a.y, b2.y))}`)
    return rounded([[a.x - hw, a.y], [x1, a.y], [x1, cy], [x2, cy], [x2, b2.y], [b2.x + hw, b2.y]])
  }

  const map = new Map<string, SEdge>()
  PATHWAYS.forEach((p, pi) => {
    for (let h = 0; h + 1 < p.nodes.length; h++) {
      const from = keyOf(p.nodes[h])
      const to = keyOf(p.nodes[h + 1])
      if (from === to) continue
      const id = `${from}>${to}`
      let e = map.get(id)
      if (!e) {
        e = { id, from, to, paths: [], color: ink(SYSTEMS[p.system].color, 0.3), inhib: p.kind === 'inhib', d: route(from, to) }
        map.set(id, e)
      }
      e.paths.push(pi)
    }
  })

  return { k, H, nodes, byKey, buses, zones, lanes, edges: [...map.values()] }
}

/** Unstretched layout (used by tests and as the initial render). */
export const BASE_LAYOUT = makeLayout(1)
export const SNODES = BASE_LAYOUT.nodes
export const SNODE_BY_KEY = BASE_LAYOUT.byKey
export const SEDGES = BASE_LAYOUT.edges
export const SEDGE_BY_ID: Record<string, SEdge> = Object.fromEntries(SEDGES.map((e) => [e.id, e]))
/** For each pathway hop: the schematic edge id it maps to. */
export const HOP_EDGE: string[][] = PATHWAYS.map((p) => p.nodes.slice(0, -1).map((id, h) => `${keyOf(id)}>${keyOf(p.nodes[h + 1])}`))
