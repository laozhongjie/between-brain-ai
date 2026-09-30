import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import type { Bi } from '../data/types'

const b = (zh: string, en: string): Bi => ({ zh, en })
import { ink } from '../theme'

/**
 * Schematic canvas (SVG viewBox units). Information flows left (senses) → right (body outputs).
 * Three zones (input · the brain's internal loop · output) separated by gutters; inside the brain,
 * functional lanes run horizontally so each system's nodes sit together in one framed band.
 */
export const NODE_W = 126
export const NODE_H = 28
const colX = (c: number) => 75 + c * 136 + (c >= 1 ? 28 : 0) + (c >= 8 ? 28 : 0)
export const W = colX(8) + 80
export const H = 862

/** Buses for structures that everything passes through (inside the brain zone). */
export const BUSES = {
  brainstem: { y: 796, x0: colX(1) - NODE_W / 2, x1: colX(7) + NODE_W / 2 },
  spinalcord: { y: 832, x0: colX(1) - NODE_W / 2, x1: colX(7) + NODE_W / 2 },
} as const
export type BusKey = keyof typeof BUSES
export const isBus = (k: string): k is BusKey => k in BUSES

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
  ['scn', 2, 742, '视交叉上核·生物钟', 'SCN · clock'],
  ['pineal', 3, 742, '松果体', 'Pineal'],
  ['lc', 4, 742, '蓝斑 · NE', 'LC · NE'],
  ['vta', 5, 742, '腹侧被盖区 · DA', 'VTA · DA'],
  ['snc', 6, 742, '黑质 · DA', 'SNc · DA'],
  ['raphe', 7, 742, '中缝核 · 5-HT', 'Raphe · 5-HT'],
]

export interface SNode {
  key: string
  x: number
  y: number
  label: Bi
  color: string
  /** deeper tone for strokes on the light ground */
  ink: string
}

export const SNODES: SNode[] = TABLE.map(([key, c, y, zh, en]) => {
  const n = NODE_BY_ID[key] ?? NODE_BY_ID[`lh.${key}`]
  return { key, x: colX(c), y, label: { zh, en }, color: SYSTEMS[n.info.system].color, ink: ink(SYSTEMS[n.info.system].color, 0.3) }
})
export const SNODE_BY_KEY: Record<string, SNode> = Object.fromEntries(SNODES.map((n) => [n.key, n]))

const PAD = 76 // zone edge to column centre
/** Input · the brain's internal loop · output. */
export const ZONES: { x0: number; x1: number; y0: number; y1: number; label: Bi }[] = [
  { x0: colX(0) - PAD, x1: colX(0) + PAD, y0: 30, y1: 700, label: { zh: '输入 · 感觉器官', en: 'Input · senses' } },
  { x0: colX(1) - PAD, x1: colX(7) + PAD, y0: 30, y1: H - 4, label: { zh: '大脑内部 · 处理回路', en: 'Inside the brain · processing loop' } },
  { x0: colX(8) - PAD, x1: colX(8) + PAD, y0: 30, y1: 700, label: { zh: '输出 · 身体', en: 'Output · body' } },
]

/** Stage labels across the brain zone; each spans x0..x1 (column centres) and is drawn with a bracket. */
export const COLUMNS: { x0: number; x1: number; label: Bi }[] = [
  { x0: colX(1), x1: colX(1), label: { zh: '中继', en: 'Relay' } },
  { x0: colX(2), x1: colX(5), label: { zh: '皮层处理与整合 →', en: 'Cortical processing →' } },
  { x0: colX(6), x1: colX(7), label: { zh: '决策与控制', en: 'Decision & control' } },
]

/** Functional lanes inside the brain zone: a framed band around each group's rows. */
export const LANES: { y0: number; y1: number; x0: number; x1: number; label: Bi; color: string }[] = (
  [
    [102, 186, b('视觉 · 注意', 'Vision · attention'), 'visual'],
    [262, 304, b('听觉 · 语言', 'Hearing · language'), 'language'],
    [380, 506, b('躯体感觉 · 运动', 'Body sense · movement'), 'motor'],
    [582, 666, b('情绪 · 记忆 · 稳态', 'Emotion · memory · homeostasis'), 'emotion'],
    [742, 742, b('觉醒 · 神经调质', 'Arousal · neuromodulators'), 'arousal'],
  ] as [number, number, Bi, keyof typeof SYSTEMS][]
).map(([top, bottom, label, sys]) => ({
  y0: top - NODE_H / 2 - 16,
  y1: bottom + NODE_H / 2 + 12,
  x0: colX(1) - PAD + 8,
  x1: colX(7) + PAD - 8,
  label,
  color: SYSTEMS[sys].color,
}))

const keyOf = (id: string) => NODE_BY_ID[id].key

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

type Pt = [number, number]
const clampBus = (b: BusKey, x: number) => Math.max(BUSES[b].x0 + 10, Math.min(BUSES[b].x1 - 10, x))

/** SVG path from one schematic element to another (node↔node, node↔bus, bus↔bus). */
function edgePath(from: string, to: string): string {
  const hw = NODE_W / 2
  const hh = NODE_H / 2
  if (isBus(from) && isBus(to)) {
    const x = from === 'brainstem' ? BUSES.brainstem.x1 - 60 : BUSES.brainstem.x0 + 50 // descending on the right, ascending on the left
    return `M${x},${BUSES[from].y + 6} L${x},${BUSES[to].y - 6}`
  }
  if (isBus(to)) {
    const a = SNODE_BY_KEY[from]
    const bx = clampBus(to, a.x)
    const by = BUSES[to].y - 6
    return curveV([a.x, a.y + hh], [bx, by])
  }
  if (isBus(from)) {
    const b = SNODE_BY_KEY[to]
    const ax = clampBus(from, b.x)
    return curveV([ax, BUSES[from].y - 6], [b.x, b.y + hh])
  }
  const a = SNODE_BY_KEY[from]
  const b = SNODE_BY_KEY[to]
  if (b.x > a.x + 20) {
    const s: Pt = [a.x + hw, a.y]
    const e: Pt = [b.x - hw, b.y]
    const mx = (s[0] + e[0]) / 2
    return `M${s[0]},${s[1]} C${mx},${s[1]} ${mx},${e[1]} ${e[0]},${e[1]}`
  }
  if (Math.abs(b.x - a.x) <= 20) {
    // same column: bulge out to the right
    const side = a.x + hw
    return `M${side},${a.y} C${side + 45},${a.y} ${side + 45},${b.y} ${side},${b.y}`
  }
  // backward (feedback loop): arc underneath
  const s: Pt = [a.x, a.y + hh]
  const e: Pt = [b.x, b.y + hh]
  const dip = Math.max(s[1], e[1]) + 28 + Math.abs(a.x - b.x) * 0.08
  return `M${s[0]},${s[1]} C${s[0]},${dip} ${e[0]},${dip} ${e[0]},${e[1]}`
}

function curveV(s: Pt, e: Pt) {
  const my = (s[1] + e[1]) / 2
  return `M${s[0]},${s[1]} C${s[0]},${my} ${e[0]},${my} ${e[0]},${e[1]}`
}

/** Pathway hops collapsed across hemispheres into unique schematic edges. */
function buildEdges(): SEdge[] {
  const map = new Map<string, SEdge>()
  PATHWAYS.forEach((p, pi) => {
    for (let h = 0; h + 1 < p.nodes.length; h++) {
      const from = keyOf(p.nodes[h])
      const to = keyOf(p.nodes[h + 1])
      if (from === to) continue
      const id = `${from}>${to}`
      let e = map.get(id)
      if (!e) {
        e = { id, from, to, paths: [], color: ink(SYSTEMS[p.system].color, 0.3), inhib: p.kind === 'inhib', d: edgePath(from, to) }
        map.set(id, e)
      }
      e.paths.push(pi)
    }
  })
  return [...map.values()]
}

export const SEDGES = buildEdges()
export const SEDGE_BY_ID: Record<string, SEdge> = Object.fromEntries(SEDGES.map((e) => [e.id, e]))
/** For each pathway hop: the schematic edge id it maps to. */
export const HOP_EDGE: string[][] = PATHWAYS.map((p) => p.nodes.slice(0, -1).map((id, h) => `${keyOf(id)}>${keyOf(p.nodes[h + 1])}`))
