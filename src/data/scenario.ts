import type { FireOptions } from '../sim/signals'
import type { StateTargets } from '../sim/brainState'
import type { Bi } from './types'

export type BodyPart = 'eyes' | 'ears' | 'nose' | 'mouth' | 'arms' | 'legs' | 'heart' | 'gut' | 'adrenal'

export interface OutputCue {
  body?: BodyPart[]
  /** what the person says */
  speech?: Bi
  /** what the person does */
  action?: Bi
}

export interface Step {
  /** seconds after the event starts (at 1× speed) */
  at: number
  /** pathways to fire: base id, or [base id, options] */
  fire?: (string | [string, FireOptions])[]
  say?: Bi
  out?: OutputCue
}

export interface ScenarioEvent {
  id: string
  /** clock time "HH:MM" */
  time: string
  /** simulated minutes the event spans */
  dur: number
  /** real seconds to play the event at 1× */
  play: number
  icon: string
  title: Bi
  /** brain-state targets that persist until another event changes them */
  state?: Partial<StateTargets>
  steps: Step[]
}

const b = (zh: string, en: string): Bi => ({ zh, en })

/** A day in the life, starting from the last dream before the alarm. */
export const DAY: ScenarioEvent[] = [
  {
    id: 'dawn-dream', time: '06:30', dur: 20, play: 11, icon: '💭',
    title: b('黎明前的梦（REM 睡眠）', 'Dreaming before dawn (REM sleep)'),
    state: { stage: 'rem', focus: 0, exertion: 0, light: 0 },
    steps: [
      { at: 0.5, fire: [['ventral', { strength: 0.8 }], ['scene', { strength: 0.7 }]],
        say: b('REM 睡眠：视觉皮层在没有任何光线输入的情况下自行活跃，这就是梦里的画面。', 'REM sleep: visual cortex is active with no light coming in, these are the images of a dream.') },
      { at: 3.5, fire: [['emotionalMemory', { strength: 0.8 }], ['fearHigh', { strength: 0.6 }]],
        say: b('杏仁核和海马参与，让梦充满情绪和白天记忆的碎片；前额叶相对安静，所以梦再离奇也不觉得奇怪。', 'Amygdala and hippocampus add emotion and fragments of memory; a quiet prefrontal cortex is why bizarre dreams feel normal.') },
      { at: 7, say: b('脑干抑制运动神经元（REM 肌张力缺失），你不会把梦“演”出来。脑电呈现 θ 波。', 'The brainstem inhibits motor neurons (REM atonia) so you do not act out the dream. EEG shows theta waves.'),
        out: { action: b('做梦 · 全身肌肉松弛', 'Dreaming · muscles relaxed') } },
    ],
  },
  {
    id: 'alarm', time: '07:00', dur: 8, play: 13, icon: '⏰',
    title: b('闹钟响了', 'The alarm goes off'),
    state: { stage: 'wake', focus: 0.1, light: 0.3 },
    steps: [
      { at: 0, fire: [['auditory', { strength: 1.3 }]], out: { body: ['ears'] },
        say: b('耳蜗 → 脑干耳蜗核 → 内侧膝状体 → 初级听觉皮层：刺耳的铃声。', 'Cochlea → brainstem → medial geniculate → primary auditory cortex: a shrill ring.') },
      { at: 1, fire: [['aras', { strength: 1.4 }], ['fearLow', { strength: 0.8 }]],
        say: b('上行网状激活系统把丘脑-皮层系统“开机”，下丘脑的睡眠开关翻转到清醒；杏仁核带来一下惊跳。', 'The reticular activating system switches the thalamocortical system on; the hypothalamic sleep switch flips to wake; the amygdala adds a startle.') },
      { at: 3.5, fire: [['reach', { strength: 1.1 }], ['corticospinal', { strength: 1.1 }]], out: { body: ['arms'], action: b('伸手按掉闹钟', 'Reaching to stop the alarm') },
        say: b('顶叶定位手机位置 → 前运动皮层 → 初级运动皮层 → 脊髓 → 手臂肌肉。', 'Parietal cortex locates the phone → premotor → primary motor cortex → spinal cord → arm muscles.') },
      { at: 5, fire: [['somato', { strength: 0.8 }], ['proprio', { strength: 0.8 }]],
        say: b('闭环反馈：指尖触到屏幕的触觉和手臂位置感回传大脑，确认动作完成。', 'Closed loop: touch from the fingertip and arm position flow back to confirm the action.') },
      { at: 7.5, fire: [['hpa', { strength: 1.2 }]], out: { body: ['adrenal'] },
        say: b('皮质醇觉醒反应：下丘脑 → 垂体 → 肾上腺，醒后约 30 分钟皮质醇达到全天最高。', 'Cortisol awakening response: hypothalamus → pituitary → adrenal; cortisol peaks ~30 min after waking.') },
    ],
  },
  {
    id: 'daylight', time: '07:10', dur: 5, play: 9, icon: '🌅',
    title: b('拉开窗帘，晨光照进来', 'Opening the curtains to morning light'),
    state: { light: 1 },
    steps: [
      { at: 0, fire: [['visual', { strength: 1.2 }], ['circadian', { strength: 1.3 }]], out: { body: ['eyes'] },
        say: b('光线除了送往视觉皮层，还经视网膜-下丘脑束直达视交叉上核，为生物钟“对时”。', 'Light reaches visual cortex and, via the retinohypothalamic tract, the suprachiasmatic nucleus, setting the body clock.') },
      { at: 3.5, fire: [['melatonin', { strength: 0.6 }]],
        say: b('生物钟通知松果体停止分泌褪黑素，困意消退。', 'The clock tells the pineal gland to stop melatonin; sleepiness fades.') },
      { at: 6, fire: [['serotonin', { strength: 0.8 }]],
        say: b('晨光也提升中缝核 5-羟色胺活动，情绪变得平稳。', 'Morning light also lifts raphe serotonin activity, steadying mood.') },
    ],
  },
  {
    id: 'breakfast', time: '07:30', dur: 20, play: 14, icon: '☕',
    title: b('早餐：咖啡和面包', 'Breakfast: coffee and toast'),
    state: { focus: 0.2 },
    steps: [
      { at: 0, fire: [['olfactory', { strength: 1.1 }], ['olfactoryOfc', { strength: 1 }]], out: { body: ['nose'] },
        say: b('咖啡香直达内嗅皮层和杏仁核，嗅觉是唯一不经过丘脑的感觉，所以气味特别能勾起回忆。', 'Coffee aroma goes straight to entorhinal cortex and amygdala, smell is the only sense that skips the thalamus.') },
      { at: 3, fire: [['gustatory', { strength: 1.1 }]], out: { body: ['mouth'], action: b('喝一口咖啡', 'Sipping coffee') },
        say: b('味觉：舌 → 孤束核 → 丘脑 → 岛叶（初级味觉皮层）→ 眶额皮层判断“好喝”。', 'Taste: tongue → solitary nucleus → thalamus → insula (gustatory cortex) → orbitofrontal “tastes good”.') },
      { at: 6, fire: [['mesolimbic', { strength: 1 }], ['valueLoop', { strength: 0.8 }]],
        say: b('腹侧被盖区释放多巴胺到伏隔核：享受美食的奖赏。', 'VTA releases dopamine into the accumbens: the reward of good food.') },
      { at: 9.5, fire: [['satiety', { strength: 1 }], ['interoception', { strength: 0.9 }]], out: { body: ['gut'] },
        say: b('胃肠通过迷走神经告诉下丘脑和岛叶：“吃饱了”，这是身体到大脑的反馈闭环。', 'The gut tells hypothalamus and insula via the vagus: “full”, a body-to-brain feedback loop.') },
    ],
  },
  {
    id: 'near-miss', time: '08:15', dur: 3, play: 15, icon: '🚗',
    title: b('过马路时一辆车突然冲过来', 'A car suddenly speeds toward you'),
    state: { focus: 0.5 },
    steps: [
      { at: 0, fire: [['visual', { strength: 1.4 }]], out: { body: ['eyes'] },
        say: b('视网膜捕捉到一个快速逼近的物体。', 'The retina catches a rapidly looming object.') },
      { at: 0.7, fire: [['fearLow', { strength: 1.6 }]],
        say: b('“低通路”：丘脑直接通知杏仁核，只需约 12 毫秒，你还没看清是什么，就已经害怕了。', '“Low road”: thalamus alerts the amygdala in ~12 ms, fear before you even know what it is.') },
      { at: 1.4, fire: [['stress', { strength: 1.5 }], ['alarm', { strength: 1.5 }], ['sympathetic', { strength: 1.4 }], ['adrenaline', { strength: 1.4 }]], out: { body: ['heart', 'adrenal'] },
        say: b('战斗或逃跑：杏仁核 → 下丘脑 → 交感神经，心跳骤升、肾上腺素释放；蓝斑让全脑进入高度警觉。', 'Fight or flight: amygdala → hypothalamus → sympathetic nerves; heart races, adrenaline surges; the locus coeruleus puts the brain on alert.') },
      { at: 1.8, fire: [['corticospinal', { strength: 1.6 }], ['legs', { strength: 1.6 }]], out: { body: ['legs', 'arms'], action: b('猛地向后退一步！', 'Jumping back!') } },
      { at: 4, fire: [['ventral', { strength: 1.2 }], ['fearHigh', { strength: 1 }]],
        say: b('“高通路”：视觉皮层 → 颞下回认清是一辆车，已经从身边开过。', '“High road”: visual cortex → inferior temporal recognises the car, it has already passed.') },
      { at: 7, fire: [['fearRegulation', { strength: 1.4 }], ['vagal', { strength: 1.2 }]],
        say: b('腹内侧前额叶抑制杏仁核：“没事了”；迷走神经让心率慢慢回落。', 'Ventromedial prefrontal cortex calms the amygdala: “it’s OK”; the vagus slowly brings the heart rate down.') },
      { at: 10.5, fire: [['emotionalMemory', { strength: 1.3 }], ['encoding', { strength: 1 }]],
        say: b('杏仁核增强海马编码，以后每次经过这个路口你都会格外小心。', 'The amygdala boosts hippocampal encoding, you will be extra careful at this crossing from now on.') },
    ],
  },
  {
    id: 'meeting', time: '09:30', dur: 30, play: 16, icon: '💬',
    title: b('开会：同事向你提问', 'Meeting: a colleague asks you a question'),
    state: { focus: 0.6 },
    steps: [
      { at: 0, fire: [['auditory', { strength: 1.1 }]], out: { body: ['ears'] },
        say: b('提问的声音传入双侧初级听觉皮层。', 'The question reaches both primary auditory cortices.') },
      { at: 1.8, fire: [['comprehension', { strength: 1.2 }]],
        say: b('左侧 Wernicke 区解码语音，颞中回检索词义，你听懂了问题。', 'Left Wernicke’s area decodes speech; the middle temporal gyrus retrieves meaning, you understand.') },
      { at: 3.2, fire: [['prosody', { strength: 1 }]],
        say: b('右半球同时分析语调：同事有点着急。', 'Meanwhile the right hemisphere reads the tone: your colleague is a bit anxious.') },
      { at: 4.2, fire: [['cognitiveLoop', { hemi: 'lh', strength: 1.2 }], ['salience', { hemi: 'lh', strength: 0.9 }]],
        say: b('背外侧前额叶在工作记忆中组织答案。', 'Dorsolateral prefrontal cortex assembles an answer in working memory.') },
      { at: 6, fire: [['semantic', { strength: 1.1 }], ['arcuate', { strength: 1.1 }]],
        say: b('选词（三角部）并经弓状束把语音计划送到 Broca 区。', 'Words are selected (pars triangularis) and the arcuate fasciculus carries the sound plan to Broca’s area.') },
      { at: 8, fire: [['speech', { strength: 1.3 }]], out: { body: ['mouth'], speech: b('我觉得我们可以先做一个原型试试。', 'I think we could build a quick prototype first.') },
        say: b('Broca 区 → 运动皮层口面部区 → 脑干 → 喉、舌、唇：说出回答。', 'Broca → face area of motor cortex → brainstem → larynx, tongue, lips: you answer.') },
      { at: 10, fire: [['auditory', { hemi: 'lh', strength: 0.8 }], ['comprehension', { strength: 0.7 }]], out: { body: ['ears'] },
        say: b('闭环：你听到自己的声音，听觉皮层把它和预期比较，实时纠正口误。', 'Closed loop: you hear your own voice and auditory cortex compares it with what you intended, correcting slips in real time.') },
      { at: 12.5, fire: [['socialFace', { strength: 0.9 }], ['mesolimbic', { strength: 0.8 }]],
        say: b('看到同事点头，社会认可带来一点多巴胺。', 'Your colleague nods, social approval brings a little dopamine.') },
    ],
  },
  {
    id: 'deep-work', time: '11:00', dur: 60, play: 14, icon: '⌨️',
    title: b('专注写报告', 'Focused writing'),
    state: { focus: 0.95 },
    steps: [
      { at: 0, fire: [['noradrenaline', { strength: 1.1 }], ['topDown', { strength: 1.2 }]],
        say: b('蓝斑去甲肾上腺素提高专注；额-顶注意网络压制干扰。脑电从 α 波转为更快的 β 波。', 'Locus-coeruleus noradrenaline sharpens focus; the fronto-parietal attention network suppresses distraction. EEG shifts from alpha to faster beta.') },
      { at: 3, fire: [['reading', { strength: 1.1 }]], out: { body: ['eyes'] },
        say: b('阅读：视觉词形区识别字形 → 角回 → 转为“内心的声音”。', 'Reading: the visual word-form area recognises letters → angular gyrus → the inner voice.') },
      { at: 6, fire: [['cognitiveLoop', { strength: 1.2 }], ['mesocortical', { strength: 0.8 }]],
        say: b('前额叶-尾状核-丘脑认知环路维持思路，多巴胺帮助保持工作记忆。', 'The prefrontal–caudate–thalamic loop holds the train of thought; dopamine stabilises working memory.') },
      { at: 8.5, fire: [['smaLoop', { hemi: 'lh', strength: 1 }], ['corticospinal', { hemi: 'lh', strength: 0.9 }], ['cerebellarLoop', { strength: 0.9 }]],
        out: { body: ['arms'], action: b('敲键盘', 'Typing') },
        say: b('辅助运动区编排手指序列，小脑校正每一次敲击的时机。', 'The supplementary motor area sequences finger movements; the cerebellum times each keystroke.') },
      { at: 11.5, fire: [['somato', { hemi: 'lh', strength: 0.7 }], ['proprio', { strength: 0.7 }]],
        say: b('按键的触觉反馈回到 S1 和小脑，构成“感觉-运动”闭环。', 'Key-press feedback returns to S1 and cerebellum, a sensorimotor loop.') },
    ],
  },
  {
    id: 'hot-cup', time: '12:40', dur: 2, play: 12, icon: '🔥',
    title: b('午饭时被热汤碗烫到', 'Touching a scalding bowl at lunch'),
    state: { focus: 0.3 },
    steps: [
      { at: 0, fire: [['reflex', { strength: 1.6 }]], out: { body: ['arms'], action: b('缩手！', 'Pulling away!') },
        say: b('脊髓反射：信号只到脊髓就直接返回肌肉，大约 50 毫秒手就缩回，大脑还不知道发生了什么。', 'Spinal reflex: the signal loops through the spinal cord back to the muscles in ~50 ms, before the brain knows.') },
      { at: 1.2, fire: [['somato', { strength: 1.2 }]],
        say: b('随后痛温觉经脊髓丘脑束 → 丘脑 → S1：知道是哪根手指、有多烫。', 'Then pain/heat travels spinothalamic tract → thalamus → S1: which finger and how hot.') },
      { at: 2.8, fire: [['pain', { strength: 1.2 }], ['painInsula', { strength: 1.2 }]],
        say: b('前扣带回和岛叶产生“好痛”的难受感，杏仁核记下这次教训。', 'Anterior cingulate and insula create the unpleasantness of pain; the amygdala notes the lesson.') },
      { at: 6, fire: [['encoding', { strength: 1 }], ['salience', { strength: 0.8 }]],
        say: b('海马编码：“这个碗很烫”，下次会先试探温度。', 'The hippocampus encodes “this bowl is hot”, next time you will test it first.') },
    ],
  },
  {
    id: 'learning', time: '14:00', dur: 45, play: 13, icon: '📚',
    title: b('学习一个新概念', 'Learning something new'),
    state: { focus: 0.75 },
    steps: [
      { at: 0, fire: [['visual', { strength: 1 }], ['auditory', { strength: 1 }]], out: { body: ['eyes', 'ears'] },
        say: b('看视频：视觉和听觉同时输入。', 'Watching a video: sight and sound together.') },
      { at: 2, fire: [['comprehension', { strength: 1 }], ['ventral', { strength: 0.9 }]],
        say: b('语言理解与物体识别在颞叶汇合。', 'Language comprehension and object recognition converge in the temporal lobe.') },
      { at: 4.5, fire: [['novelty', { strength: 1.3 }], ['mesocortical', { strength: 0.9 }]],
        say: b('新奇的信息让腹侧被盖区释放多巴胺，给海马发出“值得记住”的信号。', 'Novelty triggers VTA dopamine, flagging the hippocampus: “worth remembering”.') },
      { at: 7, fire: [['encoding', { strength: 1.3 }], ['papez', { strength: 1 }]],
        say: b('内嗅皮层把各皮层的信息打包送入海马，形成新的记忆痕迹。', 'Entorhinal cortex bundles cortical information into the hippocampus, forming a new memory trace.') },
      { at: 10, fire: [['cognitiveLoop', { strength: 1 }], ['dmn', { strength: 0.6 }]],
        say: b('前额叶把新知识和已有知识联系起来。', 'Prefrontal cortex links new knowledge with what you already know.') },
    ],
  },
  {
    id: 'slump', time: '15:30', dur: 20, play: 10, icon: '🥱',
    title: b('下午犯困，开始走神', 'Afternoon slump, mind wandering'),
    state: { focus: 0.05 },
    steps: [
      { at: 0, fire: [['dmn', { strength: 1.1 }]],
        say: b('腺苷（睡眠压力）已累积 8 个多小时；外部任务减弱，默认模式网络接管，你开始走神。', 'Adenosine (sleep pressure) has built up for 8+ hours; as the task fades the default mode network takes over: mind-wandering.') },
      { at: 4, fire: [['papez', { strength: 0.8 }], ['dmn', { strength: 0.9 }]], out: { body: ['mouth'], action: b('打了个哈欠', 'A yawn') },
        say: b('后扣带回和楔前叶回放往事、设想未来。', 'Posterior cingulate and precuneus replay the past and imagine the future.') },
      { at: 7.5, fire: [['salience', { strength: 1.1 }], ['noradrenaline', { strength: 0.8 }]],
        say: b('岛叶-前扣带“显著性网络”察觉到走神，把注意拉回任务。', 'The insula–cingulate salience network notices and pulls attention back.') },
    ],
  },
  {
    id: 'run', time: '17:30', dur: 40, play: 15, icon: '🏃',
    title: b('下班后跑步', 'An evening run'),
    state: { focus: 0.3, exertion: 0.9 },
    steps: [
      { at: 0, fire: [['smaLoop', { strength: 1.2 }], ['legs', { strength: 1.3 }], ['corticospinal', { strength: 1.2 }]], out: { body: ['legs', 'arms'], action: b('开始跑步', 'Running') },
        say: b('辅助运动区和初级运动皮层发出节律性的腿部指令；脊髓中枢模式发生器维持步伐。', 'SMA and motor cortex send rhythmic leg commands; spinal pattern generators keep the stride going.') },
      { at: 3, fire: [['proprio', { strength: 1.2 }], ['cerebellarLoop', { strength: 1.2 }]],
        say: b('闭环：肌肉和关节的本体感觉送往小脑，小脑实时校正步态和平衡。', 'Closed loop: muscle and joint sensors feed the cerebellum, which corrects gait and balance in real time.') },
      { at: 6, fire: [['sympathetic', { strength: 1.2 }]], out: { body: ['heart'] },
        say: b('交感神经提高心率和呼吸，把更多氧气送到肌肉。', 'Sympathetic drive raises heart and breathing rate to deliver oxygen.') },
      { at: 9, fire: [['motorLoop', { strength: 1 }], ['legs', { strength: 1.1 }]], out: { body: ['legs'] } },
      { at: 11.5, fire: [['mesolimbic', { strength: 1.3 }], ['serotonin', { strength: 1 }]],
        say: b('内啡肽、多巴胺和 5-羟色胺带来“跑者愉悦感”。', 'Endorphins, dopamine and serotonin bring the “runner’s high”.') },
    ],
  },
  {
    id: 'friend', time: '19:00', dur: 30, play: 13, icon: '🤝',
    title: b('偶遇老朋友', 'Bumping into an old friend'),
    state: { exertion: 0, focus: 0.35 },
    steps: [
      { at: 0, fire: [['visual', { strength: 1 }], ['ventral', { strength: 1.1 }]], out: { body: ['eyes'] },
        say: b('腹侧视觉通路一路传到梭状回面孔区：这张脸好熟悉！', 'The ventral stream reaches the fusiform face area: that face looks familiar!') },
      { at: 3, fire: [['socialFace', { strength: 1.3 }], ['faceEmotion', { strength: 1 }]],
        say: b('颞极调出他的名字和共同回忆，眶额皮层感到开心。', 'The temporal pole retrieves the name and shared memories; the orbitofrontal cortex feels glad.') },
      { at: 5.5, fire: [['mesolimbic', { strength: 1.2 }]],
        say: b('多巴胺奖赏：重逢的喜悦。', 'Dopamine: the joy of reunion.') },
      { at: 7.5, fire: [['speech', { strength: 1.2 }]], out: { body: ['mouth', 'arms'], speech: b('哎呀，好久不见！', 'Hey, long time no see!'), action: b('挥手打招呼', 'Waving hello') } },
      { at: 10, fire: [['auditory', { strength: 0.9 }], ['comprehension', { strength: 0.9 }]], out: { body: ['ears'] },
        say: b('对话来回进行：听 → 理解 → 回答，一次又一次地闭环。', 'Conversation flows: hear → understand → reply, loop after loop.') },
    ],
  },
  {
    id: 'music', time: '20:30', dur: 40, play: 12, icon: '🎵',
    title: b('听音乐放松', 'Relaxing to music'),
    state: { focus: 0.15 },
    steps: [
      { at: 0, fire: [['auditory', { strength: 1 }], ['prosody', { strength: 1.1 }]], out: { body: ['ears'] },
        say: b('右侧听觉皮层擅长分析旋律与和声。', 'The right auditory cortex specialises in melody and harmony.') },
      { at: 3.5, fire: [['mesolimbic', { strength: 1.2 }]],
        say: b('熟悉的高潮段落前，伏隔核预期性地释放多巴胺，“起鸡皮疙瘩”的愉悦。', 'Before a favourite climax, the accumbens releases dopamine in anticipation, musical chills.') },
      { at: 7, fire: [['vagal', { strength: 1.2 }], ['serotonin', { strength: 0.9 }]], out: { body: ['heart'] },
        say: b('迷走神经张力上升，心率放缓，身体进入“休息与消化”状态。', 'Vagal tone rises, heart slows, the body shifts to rest-and-digest.') },
    ],
  },
  {
    id: 'lights-out', time: '22:30', dur: 20, play: 11, icon: '🌙',
    title: b('关灯准备睡觉', 'Lights out'),
    state: { light: 0, focus: 0 },
    steps: [
      { at: 0, fire: [['melatonin', { strength: 1.2 }]],
        say: b('黑暗中，视交叉上核让松果体分泌褪黑素：该睡了。', 'In the dark, the suprachiasmatic nucleus lets the pineal gland release melatonin: time to sleep.') },
      { at: 4, fire: [['sleepSwitch', { strength: 1.3 }]],
        say: b('下丘脑腹外侧视前区的“睡眠开关”抑制觉醒系统，加上白天积累的腺苷，困意袭来。', 'The hypothalamic sleep switch inhibits the arousal system; together with the day’s adenosine, drowsiness sets in.') },
      { at: 7.5, fire: [['dmn', { strength: 0.7 }]],
        say: b('入睡前的思绪漫游，脑电中出现更多 α 波，随后变慢。', 'Drifting thoughts before sleep; alpha waves appear, then slow down.') },
    ],
  },
  {
    id: 'deep-sleep', time: '23:10', dur: 120, play: 14, icon: '😴',
    title: b('深度睡眠（NREM）', 'Deep sleep (NREM)'),
    state: { stage: 'nrem' },
    steps: [
      { at: 1, say: b('全脑神经元同步放电，形成大而慢的 δ 波（约 1–2 Hz）。丘脑关闭感觉门控，外界声音很难把你吵醒。', 'Neurons across the brain fire in sync, producing large, slow delta waves (~1–2 Hz). The thalamus closes its sensory gate.') },
      { at: 4, fire: [['consolidation', { strength: 1.1 }]],
        say: b('海马回放白天的经历，比如早上过马路那一幕，并把它们转存到新皮层，巩固为长期记忆。', 'The hippocampus replays the day, like the near miss this morning, and transfers it to the neocortex for long-term storage.') },
      { at: 8, fire: [['auditory', { strength: 0.8 }]], out: { body: ['ears'] },
        say: b('窗外一声狗叫：信号在丘脑被大幅衰减，你没有醒。', 'A dog barks outside: the signal is damped at the thalamus and you sleep on.') },
      { at: 10.5, fire: [['consolidation', { strength: 1 }], ['encoding', { strength: 0.6 }]] },
    ],
  },
  {
    id: 'rem', time: '02:30', dur: 30, play: 12, icon: '🌌',
    title: b('REM 睡眠：做梦', 'REM sleep: dreaming'),
    state: { stage: 'rem' },
    steps: [
      { at: 1, fire: [['ventral', { strength: 0.9 }], ['scene', { strength: 0.8 }]],
        say: b('乙酰胆碱升高，去甲肾上腺素和 5-羟色胺几乎为零：视觉与情绪系统活跃，梦境开始。', 'Acetylcholine high, noradrenaline and serotonin near zero: visual and emotional systems wake up, the dream begins.') },
      { at: 5, fire: [['fearHigh', { strength: 0.9 }], ['emotionalMemory', { strength: 0.9 }]],
        say: b('梦里又出现了那辆车，情绪记忆在 REM 中被重新加工，情绪强度逐渐被“去敏化”。', 'The car returns in the dream, emotional memories are reprocessed in REM and gradually lose their sting.') },
      { at: 9, out: { action: b('眼球快速转动，身体不动', 'Rapid eye movements, body still') },
        say: b('眼球快速转动，但脑干抑制了运动输出，全身肌肉松弛。', 'The eyes dart, but the brainstem blocks motor output; the body stays limp.') },
    ],
  },
  {
    id: 'late-nrem', time: '04:00', dur: 60, play: 8, icon: '🌙',
    title: b('后半夜：浅睡与深睡交替', 'Late night: sleep cycles continue'),
    state: { stage: 'nrem' },
    steps: [
      { at: 1, fire: [['consolidation', { strength: 0.9 }]],
        say: b('一夜约有 4–5 个 90 分钟的睡眠周期，越接近清晨 REM 越长。然后，新的一天又开始了。', 'A night has 4–5 ninety-minute cycles, with longer REM toward morning, and then a new day begins.') },
    ],
  },
]

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fmtClock = (dayMin: number) => {
  const m = ((Math.round(dayMin) % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}
