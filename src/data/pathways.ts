import { NODE_BY_ID } from './nodes'
import type { Bi, Hemi, SystemId } from './types'

export type PathKind = 'excit' | 'inhib' | 'modul'

export interface PathwayDef {
  id: string
  name: Bi
  system: SystemId
  kind: PathKind
  /** node ids; "$." expands to each hemisphere, a path whose last id equals its first is a loop */
  path: string[]
  /** weight in the neural-mass coupling (default 1) */
  weight?: number
}

/** A concrete pathway with hemisphere resolved. */
export interface Pathway extends Omit<PathwayDef, 'path'> {
  /** unique id, e.g. "visual@lh" */
  uid: string
  baseId: string
  hemi?: Hemi
  nodes: string[]
  loop: boolean
}

const b = (zh: string, en: string): Bi => ({ zh, en })
const p = (id: string, name: Bi, system: SystemId, kind: PathKind, path: string[], weight?: number): PathwayDef => ({
  id, name, system, kind, path, weight,
})

export const PATHWAY_DEFS: PathwayDef[] = [
  // ── Senses ──
  p('visual', b('视觉通路：视网膜 → 外侧膝状体 → V1', 'Visual pathway: retina → LGN → V1'), 'visual', 'excit', ['$.eye', '$.lgn', '$.pericalcarine']),
  p('ventral', b('腹侧通路（是什么）', 'Ventral stream (what)'), 'visual', 'excit', ['$.pericalcarine', '$.lateraloccipital', '$.fusiform', '$.inferiortemporal', '$.temporalpole']),
  p('dorsal', b('背侧通路（在哪里/怎么做）', 'Dorsal stream (where/how)'), 'visual', 'excit', ['$.pericalcarine', '$.cuneus', '$.superiorparietal', '$.caudalmiddlefrontal']),
  p('scene', b('场景识别', 'Scene recognition'), 'visual', 'excit', ['$.pericalcarine', '$.lingual', '$.parahippocampal']),
  p('auditory', b('听觉通路：耳蜗 → 脑干 → 内侧膝状体 → A1', 'Auditory pathway: cochlea → brainstem → MGN → A1'), 'auditory', 'excit', ['$.ear', 'brainstem', '$.mgn', '$.transversetemporal', '$.superiortemporal']),
  p('somato', b('躯体感觉通路：皮肤 → 脊髓 → 丘脑 → S1', 'Somatosensory: skin → cord → thalamus → S1'), 'somatosensory', 'excit', ['skin', 'spinalcord', 'brainstem', '$.vpl', '$.postcentral', '$.superiorparietal']),
  p('pain', b('痛觉情绪通路', 'Affective pain pathway'), 'somatosensory', 'excit', ['skin', 'spinalcord', 'brainstem', '$.thalamus', '$.caudalanteriorcingulate']),
  p('painInsula', b('痛觉 → 岛叶/杏仁核', 'Pain → insula/amygdala'), 'emotion', 'excit', ['$.thalamus', '$.insula', '$.amygdala']),
  p('olfactory', b('嗅觉通路（不经丘脑）', 'Olfactory pathway (bypasses thalamus)'), 'emotion', 'excit', ['nose', '$.entorhinal', '$.amygdala']),
  p('olfactoryOfc', b('嗅觉 → 眶额皮层', 'Smell → orbitofrontal'), 'reward', 'excit', ['nose', '$.lateralorbitofrontal']),
  p('gustatory', b('味觉通路：舌 → 孤束核 → 丘脑 → 岛叶', 'Taste: tongue → NTS → thalamus → insula'), 'autonomic', 'excit', ['tongue', 'brainstem', '$.vpl', '$.insula', '$.lateralorbitofrontal']),
  p('interoception', b('内感受：内脏 → 迷走神经 → 岛叶', 'Interoception: viscera → vagus → insula'), 'autonomic', 'excit', ['viscera', 'brainstem', '$.insula']),
  p('satiety', b('饱腹信号 → 下丘脑', 'Satiety → hypothalamus'), 'autonomic', 'excit', ['viscera', 'brainstem', 'hypothalamus']),
  p('circadian', b('光照 → 生物钟', 'Light → body clock'), 'autonomic', 'excit', ['$.eye', 'scn', 'hypothalamus']),
  p('melatonin', b('生物钟 → 松果体（褪黑素）', 'Clock → pineal (melatonin)'), 'autonomic', 'modul', ['scn', 'pineal', 'hypothalamus']),

  // ── Motor ──
  p('corticospinal', b('皮质脊髓束：运动指令 → 肌肉', 'Corticospinal tract: command → muscles'), 'motor', 'excit', ['$.superiorfrontal', '$.precentral', 'brainstem', 'spinalcord', 'muscles']),
  p('legs', b('下肢运动', 'Leg movement'), 'motor', 'excit', ['$.paracentral', 'brainstem', 'spinalcord', 'muscles']),
  p('speech', b('言语输出：Broca → 运动皮层 → 发声器官', 'Speech output: Broca → M1 → vocal tract'), 'language', 'excit', ['lh.parsopercularis', 'lh.precentral', 'brainstem', 'larynx']),
  p('reflex', b('脊髓反射（不经过大脑）', 'Spinal reflex (bypasses the brain)'), 'motor', 'excit', ['skin', 'spinalcord', 'muscles']),
  p('proprio', b('本体感觉 → 小脑', 'Proprioception → cerebellum'), 'motor', 'excit', ['muscles', 'spinalcord', '$.cerebellum']),
  p('motorLoop', b('运动环路：皮层 → 基底节 → 丘脑 → 皮层', 'Motor loop: cortex → basal ganglia → thalamus → cortex'), 'motor', 'excit', ['$.precentral', '$.putamen', '$.pallidum', '$.thalamus', '$.precentral']),
  p('smaLoop', b('辅助运动区环路', 'SMA loop'), 'motor', 'excit', ['$.superiorfrontal', '$.putamen', '$.pallidum', '$.thalamus', '$.superiorfrontal']),
  p('cognitiveLoop', b('认知环路：前额叶 → 尾状核 → 丘脑', 'Cognitive loop: PFC → caudate → thalamus'), 'executive', 'excit', ['$.rostralmiddlefrontal', '$.caudate', '$.pallidum', '$.thalamus', '$.rostralmiddlefrontal']),
  p('cerebellarLoop', b('小脑环路：皮层 → 脑桥 → 小脑 → 丘脑', 'Cerebellar loop: cortex → pons → cerebellum → thalamus'), 'motor', 'excit', ['$.precentral', 'brainstem', '$.cerebellum', '$.thalamus', '$.precentral']),
  p('nigrostriatal', b('黑质纹状体多巴胺通路', 'Nigrostriatal dopamine'), 'motor', 'modul', ['$.snc', '$.putamen']),
  p('nigroCaudate', b('黑质 → 尾状核', 'Nigra → caudate'), 'motor', 'modul', ['$.snc', '$.caudate']),
  p('pallidoThal', b('苍白球 → 丘脑（抑制）', 'Pallidum → thalamus (inhibitory)'), 'motor', 'inhib', ['$.pallidum', '$.thalamus'], 0.6),
  p('eyeMove', b('眼动控制', 'Eye-movement control'), 'executive', 'excit', ['$.caudalmiddlefrontal', 'brainstem']),

  // ── Language (left-lateralised) ──
  p('comprehension', b('语言理解：A1 → Wernicke → 词义', 'Comprehension: A1 → Wernicke → meaning'), 'language', 'excit', ['lh.transversetemporal', 'lh.superiortemporal', 'lh.middletemporal']),
  p('arcuate', b('弓状束：Wernicke → Broca', 'Arcuate fasciculus: Wernicke → Broca'), 'language', 'excit', ['lh.superiortemporal', 'lh.supramarginal', 'lh.parsopercularis']),
  p('semantic', b('语义检索 → Broca', 'Semantic retrieval → Broca'), 'language', 'excit', ['lh.middletemporal', 'lh.parstriangularis', 'lh.parsopercularis']),
  p('reading', b('阅读：字形 → 角回 → 语音', 'Reading: word form → angular gyrus → sound'), 'language', 'excit', ['lh.pericalcarine', 'lh.lateraloccipital', 'lh.fusiform', 'lh.inferiorparietal', 'lh.superiortemporal']),
  p('prosody', b('语调与音乐（右侧）', 'Prosody & music (right)'), 'auditory', 'excit', ['rh.transversetemporal', 'rh.superiortemporal', 'rh.parsopercularis']),

  // ── Emotion, memory, reward ──
  p('fearLow', b('恐惧快速通路（低通路）', 'Fear low road'), 'emotion', 'excit', ['$.thalamus', '$.amygdala'], 1.4),
  p('fearHigh', b('恐惧慢速通路（高通路）', 'Fear high road'), 'emotion', 'excit', ['$.inferiortemporal', '$.amygdala']),
  p('faceEmotion', b('面孔 → 情绪', 'Face → emotion'), 'emotion', 'excit', ['$.fusiform', '$.amygdala']),
  p('stress', b('应激反应：杏仁核 → 下丘脑 → 脑干 → 心脏', 'Stress: amygdala → hypothalamus → brainstem → heart'), 'emotion', 'excit', ['$.amygdala', 'hypothalamus', 'brainstem', 'heart']),
  p('alarm', b('杏仁核 → 蓝斑（去甲肾上腺素）', 'Amygdala → locus coeruleus (noradrenaline)'), 'arousal', 'excit', ['$.amygdala', 'lc']),
  p('hpa', b('HPA 轴：下丘脑 → 垂体 → 肾上腺', 'HPA axis: hypothalamus → pituitary → adrenal'), 'autonomic', 'excit', ['hypothalamus', 'pituitary', 'adrenal']),
  p('cortisolFeedback', b('皮质醇负反馈 → 海马', 'Cortisol feedback → hippocampus'), 'autonomic', 'modul', ['adrenal', '$.hippocampus', 'hypothalamus'], 0.5),
  p('sympathetic', b('交感神经：战斗或逃跑', 'Sympathetic: fight or flight'), 'autonomic', 'excit', ['hypothalamus', 'brainstem', 'spinalcord', 'heart']),
  p('adrenaline', b('交感 → 肾上腺素', 'Sympathetic → adrenaline'), 'autonomic', 'excit', ['spinalcord', 'adrenal']),
  p('vagal', b('迷走神经：放松、减慢心率', 'Vagus: calm, slows heart'), 'autonomic', 'inhib', ['brainstem', 'heart'], 0.5),
  p('fearRegulation', b('前额叶调节恐惧（抑制杏仁核）', 'Prefrontal fear regulation'), 'emotion', 'inhib', ['$.medialorbitofrontal', '$.amygdala'], 0.8),
  p('papez', b('Papez 环路（情绪与记忆）', 'Papez circuit (emotion & memory)'), 'memory', 'excit', ['$.hippocampus', 'hypothalamus', '$.thalamus', '$.posteriorcingulate', '$.parahippocampal', '$.entorhinal', '$.hippocampus']),
  p('encoding', b('记忆编码：皮层 → 内嗅 → 海马', 'Encoding: cortex → entorhinal → hippocampus'), 'memory', 'excit', ['$.inferiortemporal', '$.entorhinal', '$.hippocampus']),
  p('consolidation', b('记忆巩固：海马回放 → 新皮层', 'Consolidation: hippocampal replay → neocortex'), 'memory', 'excit', ['$.hippocampus', '$.entorhinal', '$.temporalpole', '$.medialorbitofrontal']),
  p('emotionalMemory', b('情绪增强记忆', 'Emotion boosts memory'), 'memory', 'excit', ['$.amygdala', '$.hippocampus']),
  p('mesolimbic', b('中脑边缘奖赏通路：VTA → 伏隔核', 'Mesolimbic reward: VTA → accumbens'), 'reward', 'modul', ['vta', '$.accumbens', '$.pallidum']),
  p('mesocortical', b('中脑皮层通路：VTA → 前额叶', 'Mesocortical: VTA → prefrontal'), 'reward', 'modul', ['vta', '$.medialorbitofrontal', '$.rostralmiddlefrontal']),
  p('novelty', b('新奇 → 多巴胺 → 海马', 'Novelty → dopamine → hippocampus'), 'reward', 'modul', ['vta', '$.hippocampus']),
  p('valueLoop', b('价值 → 动机', 'Value → motivation'), 'reward', 'excit', ['$.lateralorbitofrontal', '$.medialorbitofrontal', '$.accumbens']),

  // ── Arousal & neuromodulation ──
  p('aras', b('上行网状激活系统：保持清醒', 'Ascending reticular activating system'), 'arousal', 'modul', ['aras', '$.thalamus', '$.superiorfrontal']),
  p('noradrenaline', b('蓝斑去甲肾上腺素投射', 'LC noradrenaline projection'), 'arousal', 'modul', ['lc', '$.thalamus', '$.rostralmiddlefrontal']),
  p('serotonin', b('中缝核 5-羟色胺投射', 'Raphe serotonin projection'), 'arousal', 'modul', ['raphe', '$.medialorbitofrontal']),
  p('serotoninHypo', b('5-羟色胺 → 下丘脑', 'Serotonin → hypothalamus'), 'arousal', 'modul', ['raphe', 'hypothalamus']),
  p('sleepSwitch', b('睡眠开关：下丘脑抑制觉醒系统', 'Sleep switch: hypothalamus inhibits arousal'), 'arousal', 'inhib', ['hypothalamus', 'aras'], 0.8),

  // ── Large-scale networks ──
  p('topDown', b('自上而下注意', 'Top-down attention'), 'executive', 'excit', ['$.rostralmiddlefrontal', '$.superiorparietal', '$.caudalmiddlefrontal', '$.lateraloccipital']),
  p('salience', b('显著性网络：岛叶 → 前扣带 → 前额叶', 'Salience network: insula → dACC → PFC'), 'executive', 'excit', ['$.insula', '$.caudalanteriorcingulate', '$.rostralmiddlefrontal']),
  p('dmn', b('默认模式网络（走神/回忆/自我）', 'Default mode network'), 'default', 'excit', ['$.medialorbitofrontal', '$.posteriorcingulate', '$.precuneus', '$.inferiorparietal', '$.medialorbitofrontal']),
  p('sensorimotor', b('感觉-运动整合', 'Sensorimotor integration'), 'somatosensory', 'excit', ['$.postcentral', '$.precentral']),
  p('reach', b('视觉引导伸手', 'Visually guided reaching'), 'motor', 'excit', ['$.superiorparietal', '$.caudalmiddlefrontal', '$.precentral']),
  p('socialFace', b('认出熟人：面孔 → 身份 → 情感', 'Recognizing a friend: face → identity → feeling'), 'emotion', 'excit', ['$.fusiform', '$.temporalpole', '$.medialorbitofrontal']),
]

function expand(): Pathway[] {
  const out: Pathway[] = []
  for (const d of PATHWAY_DEFS) {
    const bilateral = d.path.some((x) => x.startsWith('$.'))
    const hemis: (Hemi | undefined)[] = bilateral ? ['lh', 'rh'] : [undefined]
    for (const hemi of hemis) {
      const nodes = d.path.map((x) => (x.startsWith('$.') ? `${hemi}.${x.slice(2)}` : x))
      for (const id of nodes) if (!NODE_BY_ID[id]) throw new Error(`Pathway ${d.id}: unknown node ${id}`)
      const { path: _path, ...rest } = d
      out.push({
        ...rest,
        uid: hemi ? `${d.id}@${hemi}` : d.id,
        baseId: d.id,
        hemi,
        nodes,
        loop: nodes.length > 2 && nodes[0] === nodes[nodes.length - 1],
      })
    }
  }
  return out
}

export const PATHWAYS = expand()
export const PATHWAY_BY_UID: Record<string, Pathway> = Object.fromEntries(PATHWAYS.map((x) => [x.uid, x]))

/** Pathways for a base id, optionally limited to one hemisphere. */
export function pathwaysFor(baseId: string, hemi?: Hemi | 'both'): Pathway[] {
  return PATHWAYS.filter((x) => x.baseId === baseId && (!hemi || hemi === 'both' || !x.hemi || x.hemi === hemi))
}
