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
  p('visual', b('视觉通路：视网膜经外侧膝状体到 V1', 'Visual pathway: retina via LGN to V1'), 'visual', 'excit', ['$.eye', '$.lgn', '$.pericalcarine']),
  p('ventral', b('腹侧通路（是什么）', 'Ventral stream (what)'), 'visual', 'excit', ['$.pericalcarine', '$.lateraloccipital', '$.fusiform', '$.inferiortemporal', '$.temporalpole']),
  p('dorsal', b('背侧通路（在哪里/怎么做）', 'Dorsal stream (where/how)'), 'visual', 'excit', ['$.pericalcarine', '$.cuneus', '$.superiorparietal', '$.caudalmiddlefrontal']),
  p('scene', b('场景识别', 'Scene recognition'), 'visual', 'excit', ['$.pericalcarine', '$.lingual', '$.parahippocampal']),
  p('auditory', b('听觉通路：耳蜗经脑干、内侧膝状体到 A1', 'Auditory pathway: cochlea via brainstem and MGN to A1'), 'auditory', 'excit', ['$.ear', 'brainstem', '$.mgn', '$.transversetemporal', '$.superiortemporal']),
  p('somato', b('躯体感觉通路：皮肤经脊髓、丘脑到 S1', 'Somatosensory: skin via cord and thalamus to S1'), 'somatosensory', 'excit', ['skin', 'spinalcord', 'brainstem', '$.vpl', '$.postcentral', '$.superiorparietal']),
  p('pain', b('痛觉情绪通路', 'Affective pain pathway'), 'somatosensory', 'excit', ['skin', 'spinalcord', 'brainstem', '$.thalamus', '$.caudalanteriorcingulate']),
  p('painInsula', b('痛觉传至岛叶与杏仁核', 'Pain to insula and amygdala'), 'emotion', 'excit', ['$.thalamus', '$.insula', '$.amygdala']),
  p('olfactory', b('嗅觉通路（不经丘脑）', 'Olfactory pathway (bypasses thalamus)'), 'emotion', 'excit', ['nose', '$.entorhinal', '$.amygdala']),
  p('olfactoryOfc', b('嗅觉传至眶额皮层', 'Smell to orbitofrontal cortex'), 'reward', 'excit', ['nose', '$.lateralorbitofrontal']),
  p('gustatory', b('味觉通路：舌经孤束核、丘脑到岛叶', 'Taste: tongue via NTS and thalamus to insula'), 'autonomic', 'excit', ['tongue', 'brainstem', '$.vpl', '$.insula', '$.lateralorbitofrontal']),
  p('interoception', b('内感受：内脏经迷走神经到岛叶', 'Interoception: viscera via vagus to insula'), 'autonomic', 'excit', ['viscera', 'brainstem', '$.insula']),
  p('satiety', b('饱腹信号传至下丘脑', 'Satiety signals to hypothalamus'), 'autonomic', 'excit', ['viscera', 'brainstem', 'hypothalamus']),
  p('circadian', b('光照信号传至生物钟', 'Light to body clock'), 'autonomic', 'excit', ['$.eye', 'scn', 'hypothalamus']),
  p('melatonin', b('生物钟传至松果体（褪黑素）', 'Clock to pineal (melatonin)'), 'autonomic', 'modul', ['scn', 'pineal', 'hypothalamus']),

  // ── Motor ──
  p('corticospinal', b('皮质脊髓束：运动指令传至肌肉', 'Corticospinal tract: commands to muscles'), 'motor', 'excit', ['$.superiorfrontal', '$.precentral', 'brainstem', 'spinalcord', 'muscles']),
  p('legs', b('下肢运动', 'Leg movement'), 'motor', 'excit', ['$.paracentral', 'brainstem', 'spinalcord', 'muscles']),
  p('speech', b('言语输出：Broca 区经运动皮层到发声器官', 'Speech output: Broca via M1 to vocal tract'), 'language', 'excit', ['lh.parsopercularis', 'lh.precentral', 'brainstem', 'larynx']),
  p('reflex', b('脊髓反射（不经过大脑）', 'Spinal reflex (bypasses the brain)'), 'motor', 'excit', ['skin', 'spinalcord', 'muscles']),
  p('proprio', b('本体感觉传至小脑', 'Proprioception to cerebellum'), 'motor', 'excit', ['muscles', 'spinalcord', '$.cerebellum']),
  p('motorLoop', b('运动环路：皮层经基底节、丘脑回到皮层', 'Motor loop: cortex via basal ganglia and thalamus back to cortex'), 'motor', 'excit', ['$.precentral', '$.putamen', '$.pallidum', '$.thalamus', '$.precentral']),
  p('smaLoop', b('辅助运动区环路', 'SMA loop'), 'motor', 'excit', ['$.superiorfrontal', '$.putamen', '$.pallidum', '$.thalamus', '$.superiorfrontal']),
  p('cognitiveLoop', b('认知环路：前额叶经尾状核到丘脑', 'Cognitive loop: PFC via caudate to thalamus'), 'executive', 'excit', ['$.rostralmiddlefrontal', '$.caudate', '$.pallidum', '$.thalamus', '$.rostralmiddlefrontal']),
  p('cerebellarLoop', b('小脑环路：皮层经脑桥、小脑到丘脑', 'Cerebellar loop: cortex via pons and cerebellum to thalamus'), 'motor', 'excit', ['$.precentral', 'brainstem', '$.cerebellum', '$.thalamus', '$.precentral']),
  p('nigrostriatal', b('黑质纹状体多巴胺通路', 'Nigrostriatal dopamine'), 'motor', 'modul', ['$.snc', '$.putamen']),
  p('nigroCaudate', b('黑质到尾状核', 'Nigra to caudate'), 'motor', 'modul', ['$.snc', '$.caudate']),
  p('pallidoThal', b('苍白球抑制丘脑', 'Pallidum inhibits thalamus'), 'motor', 'inhib', ['$.pallidum', '$.thalamus'], 0.6),
  p('eyeMove', b('眼动控制', 'Eye-movement control'), 'executive', 'excit', ['$.caudalmiddlefrontal', 'brainstem']),

  // ── Language (left-lateralised) ──
  p('comprehension', b('语言理解：A1 经 Wernicke 区到词义', 'Comprehension: A1 via Wernicke to meaning'), 'language', 'excit', ['lh.transversetemporal', 'lh.superiortemporal', 'lh.middletemporal']),
  p('arcuate', b('弓状束：Wernicke 区到 Broca 区', 'Arcuate fasciculus: Wernicke to Broca'), 'language', 'excit', ['lh.superiortemporal', 'lh.supramarginal', 'lh.parsopercularis']),
  p('semantic', b('语义检索传至 Broca 区', 'Semantic retrieval to Broca'), 'language', 'excit', ['lh.middletemporal', 'lh.parstriangularis', 'lh.parsopercularis']),
  p('reading', b('阅读：字形经角回到语音', 'Reading: word form via angular gyrus to sound'), 'language', 'excit', ['lh.pericalcarine', 'lh.lateraloccipital', 'lh.fusiform', 'lh.inferiorparietal', 'lh.superiortemporal']),
  p('prosody', b('语调与音乐（右侧）', 'Prosody & music (right)'), 'auditory', 'excit', ['rh.transversetemporal', 'rh.superiortemporal', 'rh.parsopercularis']),

  // ── Emotion, memory, reward ──
  p('fearLow', b('恐惧快速通路（低通路）', 'Fear low road'), 'emotion', 'excit', ['$.thalamus', '$.amygdala'], 1.4),
  p('fearHigh', b('恐惧慢速通路（高通路）', 'Fear high road'), 'emotion', 'excit', ['$.inferiortemporal', '$.amygdala']),
  p('faceEmotion', b('面孔引起情绪反应', 'Faces trigger emotion'), 'emotion', 'excit', ['$.fusiform', '$.amygdala']),
  p('stress', b('应激反应：杏仁核经下丘脑、脑干到心脏', 'Stress: amygdala via hypothalamus and brainstem to heart'), 'emotion', 'excit', ['$.amygdala', 'hypothalamus', 'brainstem', 'heart']),
  p('alarm', b('杏仁核激活蓝斑（去甲肾上腺素）', 'Amygdala activates locus coeruleus (noradrenaline)'), 'arousal', 'excit', ['$.amygdala', 'lc']),
  p('hpa', b('HPA 轴：下丘脑经垂体到肾上腺', 'HPA axis: hypothalamus via pituitary to adrenal'), 'autonomic', 'excit', ['hypothalamus', 'pituitary', 'adrenal']),
  p('cortisolFeedback', b('皮质醇负反馈至海马', 'Cortisol feedback to hippocampus'), 'autonomic', 'modul', ['adrenal', '$.hippocampus', 'hypothalamus'], 0.5),
  p('sympathetic', b('交感神经：战斗或逃跑', 'Sympathetic: fight or flight'), 'autonomic', 'excit', ['hypothalamus', 'brainstem', 'spinalcord', 'heart']),
  p('adrenaline', b('交感神经引起肾上腺素释放', 'Sympathetic drive releases adrenaline'), 'autonomic', 'excit', ['spinalcord', 'adrenal']),
  p('vagal', b('迷走神经：放松、减慢心率', 'Vagus: calm, slows heart'), 'autonomic', 'inhib', ['brainstem', 'heart'], 0.5),
  p('fearRegulation', b('前额叶调节恐惧（抑制杏仁核）', 'Prefrontal fear regulation'), 'emotion', 'inhib', ['$.medialorbitofrontal', '$.amygdala'], 0.8),
  p('papez', b('Papez 环路（情绪与记忆）', 'Papez circuit (emotion & memory)'), 'memory', 'excit', ['$.hippocampus', 'hypothalamus', '$.thalamus', '$.posteriorcingulate', '$.parahippocampal', '$.entorhinal', '$.hippocampus']),
  p('encoding', b('记忆编码：皮层经内嗅皮层到海马', 'Encoding: cortex via entorhinal cortex to hippocampus'), 'memory', 'excit', ['$.inferiortemporal', '$.entorhinal', '$.hippocampus']),
  p('consolidation', b('记忆巩固：海马回放传至新皮层', 'Consolidation: hippocampal replay to neocortex'), 'memory', 'excit', ['$.hippocampus', '$.entorhinal', '$.temporalpole', '$.medialorbitofrontal']),
  p('emotionalMemory', b('情绪增强记忆', 'Emotion boosts memory'), 'memory', 'excit', ['$.amygdala', '$.hippocampus']),
  p('mesolimbic', b('中脑边缘奖赏通路：VTA 到伏隔核', 'Mesolimbic reward: VTA to accumbens'), 'reward', 'modul', ['vta', '$.accumbens', '$.pallidum']),
  p('mesocortical', b('中脑皮层通路：VTA 到前额叶', 'Mesocortical: VTA to prefrontal cortex'), 'reward', 'modul', ['vta', '$.medialorbitofrontal', '$.rostralmiddlefrontal']),
  p('novelty', b('新奇信号经多巴胺到海马', 'Novelty via dopamine to hippocampus'), 'reward', 'modul', ['vta', '$.hippocampus']),
  p('valueLoop', b('价值转为动机', 'Value to motivation'), 'reward', 'excit', ['$.lateralorbitofrontal', '$.medialorbitofrontal', '$.accumbens']),

  // ── Arousal & neuromodulation ──
  p('aras', b('上行网状激活系统：保持清醒', 'Ascending reticular activating system'), 'arousal', 'modul', ['aras', '$.thalamus', '$.superiorfrontal']),
  p('noradrenaline', b('蓝斑去甲肾上腺素投射', 'LC noradrenaline projection'), 'arousal', 'modul', ['lc', '$.thalamus', '$.rostralmiddlefrontal']),
  p('serotonin', b('中缝核 5-羟色胺投射', 'Raphe serotonin projection'), 'arousal', 'modul', ['raphe', '$.medialorbitofrontal']),
  p('serotoninHypo', b('5-羟色胺传至下丘脑', 'Serotonin to hypothalamus'), 'arousal', 'modul', ['raphe', 'hypothalamus']),
  p('sleepSwitch', b('睡眠开关：下丘脑抑制觉醒系统', 'Sleep switch: hypothalamus inhibits arousal'), 'arousal', 'inhib', ['hypothalamus', 'aras'], 0.8),

  // ── Large-scale networks ──
  p('topDown', b('自上而下注意', 'Top-down attention'), 'executive', 'excit', ['$.rostralmiddlefrontal', '$.superiorparietal', '$.caudalmiddlefrontal', '$.lateraloccipital']),
  p('salience', b('显著性网络：岛叶经前扣带到前额叶', 'Salience network: insula via dACC to PFC'), 'executive', 'excit', ['$.insula', '$.caudalanteriorcingulate', '$.rostralmiddlefrontal']),
  p('dmn', b('默认模式网络（走神/回忆/自我）', 'Default mode network'), 'default', 'excit', ['$.medialorbitofrontal', '$.posteriorcingulate', '$.precuneus', '$.inferiorparietal', '$.medialorbitofrontal']),
  p('sensorimotor', b('感觉-运动整合', 'Sensorimotor integration'), 'somatosensory', 'excit', ['$.postcentral', '$.precentral']),
  p('reach', b('视觉引导伸手', 'Visually guided reaching'), 'motor', 'excit', ['$.superiorparietal', '$.caudalmiddlefrontal', '$.precentral']),
  p('socialFace', b('认出熟人：从面孔到身份，再到情感', 'Recognizing a friend: from face to identity to feeling'), 'emotion', 'excit', ['$.fusiform', '$.temporalpole', '$.medialorbitofrontal']),
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
