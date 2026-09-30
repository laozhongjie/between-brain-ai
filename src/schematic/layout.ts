import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import type { Bi } from '../data/types'
import { ink } from '../theme'

/** Schematic canvas (SVG viewBox units). Information flows left (senses) → right (body outputs). */
export const W = 1230
export const H = 800
export const NODE_W = 116
export const NODE_H = 24
const colX = (c: number) => 70 + c * 135

/** Buses for structures that everything passes through. */
export const BUSES = {
  brainstem: { y: 742, x0: 150, x1: 1100 },
  spinalcord: { y: 776, x0: 150, x1: 1100 },
} as const
export type BusKey = keyof typeof BUSES
export const isBus = (k: string): k is BusKey => k in BUSES

// [key, column, y, short zh, short en]
const TABLE: [string, number, number, string, string][] = [
  ['eye', 0, 100, '眼睛', 'Eye'],
  ['ear', 0, 235, '耳朵', 'Ear'],
  ['skin', 0, 370, '皮肤', 'Skin'],
  ['nose', 0, 470, '鼻子', 'Nose'],
  ['tongue', 0, 530, '舌头', 'Tongue'],
  ['viscera', 0, 590, '内脏', 'Gut'],

  ['lgn', 1, 100, '外侧膝状体', 'LGN'],
  ['scn', 1, 165, '视交叉上核·生物钟', 'SCN · clock'],
  ['mgn', 1, 235, '内侧膝状体', 'MGN'],
  ['vpl', 1, 370, '丘脑腹后核', 'VPL / VPM'],
  ['aras', 1, 660, '网状激活系统', 'ARAS'],

  ['pericalcarine', 2, 100, 'V1 初级视觉', 'V1 visual'],
  ['transversetemporal', 2, 235, 'A1 初级听觉', 'A1 auditory'],
  ['postcentral', 2, 370, 'S1 躯体感觉', 'S1 touch'],
  ['insula', 2, 450, '岛叶', 'Insula'],
  ['entorhinal', 2, 530, '内嗅皮层', 'Entorhinal'],
  ['pineal', 2, 660, '松果体', 'Pineal'],

  ['cuneus', 3, 50, '楔叶 V2/V3', 'Cuneus V2/V3'],
  ['lateraloccipital', 3, 100, '枕外侧 LOC', 'LOC'],
  ['lingual', 3, 150, '舌回', 'Lingual'],
  ['superiortemporal', 3, 235, 'Wernicke 区', 'Wernicke'],
  ['supramarginal', 3, 290, '缘上回', 'Supramarginal'],
  ['hippocampus', 3, 530, '海马', 'Hippocampus'],
  ['parahippocampal', 3, 590, '海马旁回', 'Parahippocampal'],
  ['lc', 3, 700, '蓝斑 · NE', 'LC · NE'],

  ['superiorparietal', 4, 50, '顶上小叶', 'Sup. parietal'],
  ['fusiform', 4, 120, '梭状回 · 面孔', 'Fusiform · faces'],
  ['inferiorparietal', 4, 180, '角回', 'Angular gyrus'],
  ['middletemporal', 4, 235, '颞中回 · 词义', 'Mid. temporal'],
  ['amygdala', 4, 470, '杏仁核', 'Amygdala'],
  ['posteriorcingulate', 4, 590, '后扣带回', 'Post. cingulate'],
  ['precuneus', 4, 640, '楔前叶', 'Precuneus'],
  ['vta', 4, 700, '腹侧被盖区 · DA', 'VTA · DA'],

  ['inferiortemporal', 5, 120, '颞下回 · 物体', 'Inf. temporal'],
  ['temporalpole', 5, 180, '颞极', 'Temporal pole'],
  ['parstriangularis', 5, 235, '三角部 · 选词', 'Pars triangularis'],
  ['caudalanteriorcingulate', 5, 400, '前扣带回', 'dACC'],
  ['lateralorbitofrontal', 5, 460, '外侧眶额', 'Lateral OFC'],
  ['medialorbitofrontal', 5, 520, '腹内侧前额叶', 'vmPFC'],
  ['accumbens', 5, 580, '伏隔核', 'Accumbens'],
  ['snc', 5, 700, '黑质 · DA', 'SNc · DA'],

  ['caudalmiddlefrontal', 6, 50, '额叶眼区/前运动', 'FEF / premotor'],
  ['rostralmiddlefrontal', 6, 130, '背外侧前额叶', 'DLPFC'],
  ['parsopercularis', 6, 235, 'Broca 区', 'Broca'],
  ['superiorfrontal', 6, 320, '辅助运动区', 'SMA'],
  ['caudate', 6, 400, '尾状核', 'Caudate'],
  ['hypothalamus', 6, 590, '下丘脑', 'Hypothalamus'],
  ['raphe', 6, 700, '中缝核 · 5-HT', 'Raphe · 5-HT'],

  ['precentral', 7, 290, 'M1 初级运动', 'M1 motor'],
  ['paracentral', 7, 345, '中央旁小叶', 'Paracentral'],
  ['putamen', 7, 400, '壳核', 'Putamen'],
  ['pallidum', 7, 455, '苍白球', 'Pallidum'],
  ['thalamus', 7, 515, '丘脑', 'Thalamus'],
  ['cerebellum', 7, 575, '小脑', 'Cerebellum'],
  ['pituitary', 7, 645, '垂体', 'Pituitary'],

  ['larynx', 8, 250, '发声 · 喉舌唇', 'Vocal tract'],
  ['muscles', 8, 380, '骨骼肌', 'Muscles'],
  ['heart', 8, 520, '心脏', 'Heart'],
  ['adrenal', 8, 620, '肾上腺', 'Adrenal'],
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

export const COLUMNS: { x0: number; x1: number; label: Bi }[] = [
  { x0: colX(0), x1: colX(0), label: { zh: '输入：感觉器官', en: 'Input: senses' } },
  { x0: colX(1), x1: colX(1), label: { zh: '中继', en: 'Relay' } },
  { x0: colX(2), x1: colX(5), label: { zh: '皮层处理与整合 →', en: 'Cortical processing →' } },
  { x0: colX(6), x1: colX(7), label: { zh: '决策与控制', en: 'Decision & control' } },
  { x0: colX(8), x1: colX(8), label: { zh: '输出：身体', en: 'Output: body' } },
]

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
    const x = from === 'brainstem' ? 1040 : 200 // descending on the right, ascending on the left
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
