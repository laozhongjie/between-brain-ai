import type { Bi } from './data/types'
import { useStore } from './store'

export type Lang = 'zh' | 'en'

export const tr = (bi: Bi, lang: Lang) => bi[lang]

/** Hook returning a translator bound to the current language. */
export function useT() {
  const lang = useStore((s) => s.lang)
  return (bi: Bi) => bi[lang]
}

const b = (zh: string, en: string): Bi => ({ zh, en })

export const UI = {
  title: b('人脑三维动态图谱', 'Brain Dynamics Atlas'),
  subtitle: b('真实解剖 · 闭环动态 · 一个人的一天', 'Real anatomy · closed-loop dynamics · a day in a life'),
  function: b('功能', 'Function'),
  inputs: b('输入（从哪里来）', 'Inputs (from)'),
  outputs: b('输出（到哪里去）', 'Outputs (to)'),
  system: b('功能系统', 'System'),
  lobe: b('部位', 'Location'),
  activity: b('实时活动', 'Live activity'),
  left: b('左侧', 'Left'),
  right: b('右侧', 'Right'),
  view: b('视图', 'View'),
  cortexOpacity: b('皮层不透明度', 'Cortex opacity'),
  explode: b('半球分离', 'Split hemispheres'),
  clip: b('剖切', 'Section'),
  clipNone: b('无', 'None'),
  clipSagittal: b('矢状面', 'Sagittal'),
  clipCoronal: b('冠状面', 'Coronal'),
  clipAxial: b('水平面', 'Axial'),
  colorMode: b('着色', 'Colour'),
  colorAnatomy: b('解剖', 'Anatomy'),
  colorSystem: b('功能系统', 'Function'),
  layers: b('图层', 'Layers'),
  layerSubcortex: b('皮层下结构', 'Subcortex'),
  layerNuclei: b('核团', 'Nuclei'),
  layerBody: b('感觉/效应器官', 'Body organs'),
  layerLabels: b('标签', 'Labels'),
  layerPathways: b('神经通路', 'Pathways'),
  layerPulses: b('信号脉冲', 'Signal pulses'),
  resetView: b('复位视角', 'Reset view'),
  legend: b('图例', 'Legend'),
  hint: b('拖动旋转 · 滚轮缩放 · 点击脑区查看详情', 'Drag to rotate · scroll to zoom · click a region for details'),
  disclaimer: b('教学用示意性模拟，并非经过验证的科研模型。', 'Illustrative teaching simulation, not a validated research model.'),
  close: b('关闭', 'Close'),
  loading: b('正在加载大脑模型…', 'Loading brain model…'),
  output: b('身体与输出', 'Body & outputs'),
  eeg: b('虚拟脑电图（EEG）', 'Virtual EEG'),
  heartRate: b('心率', 'Heart rate'),
  breath: b('呼吸', 'Breathing'),
  perMin: b('次/分', '/min'),
  modulators: b('神经调质与激素', 'Neuromodulators & hormones'),
  NE: b('去甲肾上腺素', 'Noradrenaline'),
  DA: b('多巴胺', 'Dopamine'),
  HT: b('5-羟色胺', 'Serotonin'),
  ACh: b('乙酰胆碱', 'Acetylcholine'),
  cortisol: b('皮质醇', 'Cortisol'),
  melatonin: b('褪黑素', 'Melatonin'),
  adenosine: b('腺苷（睡眠压力）', 'Adenosine (sleep pressure)'),
  stageWakeRelaxed: b('清醒 · α 波', 'Awake · alpha'),
  stageWakeFocus: b('专注 · β 波', 'Focused · beta'),
  stageNrem: b('深睡 · δ 慢波', 'Deep sleep · delta'),
  stageRem: b('REM · θ 波 · 做梦', 'REM · theta · dreaming'),
  play: b('播放', 'Play'),
  pause: b('暂停', 'Pause'),
  prevEvent: b('上一个事件', 'Previous event'),
  nextEvent: b('下一个事件', 'Next event'),
  between: b('日常活动中…', 'Going about the day…'),
  narration: b('正在发生什么', 'What is happening'),
}
