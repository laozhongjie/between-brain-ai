import type { FireOptions } from '../sim/signals'
import type { Stage } from '../sim/brainState'
import { NODES, NODE_BY_ID } from './nodes'
import { PATHWAYS, pathwaysFor } from './pathways'
import type { Bi, SystemId } from './types'

export interface TourStep {
  title: Bi
  text: Bi
  /** pathways fired when the step starts */
  fire?: (string | [string, FireOptions])[]
  /** node ids or base keys stimulated directly (processing inside a region) */
  stim?: string[]
  /** brain state for this step (e.g. to show sleep rhythms) */
  stage?: Stage
}

export interface Tour {
  id: string
  /** line icon name (see ui/Icon.tsx) */
  icon: string
  system: SystemId
  name: Bi
  /** compact label for the one-row system picker (defaults to name) */
  short?: Bi
  summary: Bi
  /** pathway base ids that make up the system */
  pathways: string[]
  steps: TourStep[]
}

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Functional systems that can be viewed on their own, each with a step-by-step walkthrough. */
export const TOURS: Tour[] = [
  {
    id: 'vision', icon: 'eye', system: 'visual',
    name: b('视觉', 'Vision'),
    summary: b('光经视网膜、丘脑到达初级视觉皮层，再分成「是什么」和「在哪里」两条通路。', 'Light passes from the retina via the thalamus to V1, then splits into “what” and “where” streams.'),
    pathways: ['visual', 'ventral', 'dorsal', 'scene', 'circadian'],
    steps: [
      { title: b('视网膜经外侧膝状体到 V1', 'Retina via LGN to V1'), fire: ['visual'],
        text: b('视网膜把光变成神经信号，经视神经到达丘脑的外侧膝状体，再经视辐射送到枕叶的初级视觉皮层。', 'The retina turns light into signals that travel the optic nerve to the thalamic LGN, then the optic radiation to V1.') },
      { title: b('V1：拆解画面', 'V1 breaks the image down'), stim: ['pericalcarine'],
        text: b('V1 的神经元只对视野中很小一块区域的边缘、朝向和运动方向做出反应，相当于把画面拆成线条。', 'V1 neurons respond to edges, orientation and motion in tiny patches of the visual field, the image as line segments.') },
      { title: b('腹侧通路：是什么', 'Ventral stream: what'), fire: ['ventral'],
        text: b('沿枕叶、梭状回到颞下回，线条被逐级组合成形状、颜色、面孔和物体，最终在颞极与意义相连。', 'Along occipital, fusiform and inferior temporal cortex, lines combine into shapes, colors, faces and objects, linked to meaning at the temporal pole.') },
      { title: b('背侧通路：在哪里/怎么做', 'Dorsal stream: where/how'), fire: ['dorsal'],
        text: b('沿楔叶、顶上小叶到额叶眼区，计算物体的位置和运动，引导眼睛和手去够取。', 'Along cuneus, superior parietal cortex and frontal eye fields, computing location and motion to guide the eyes and hands.') },
      { title: b('场景识别', 'Scene recognition'), fire: ['scene'],
        text: b('舌回和海马旁回识别「这是什么地方」，为记忆提供场景。', 'Lingual and parahippocampal cortex recognize “what place is this”, giving memories a setting.') },
      { title: b('非成像视觉：校准生物钟', 'Non-image vision: setting the clock'), fire: ['circadian'],
        text: b('一小部分视网膜细胞不参与「看」，而是把光照强度直接送到视交叉上核，校准昼夜节律。', 'A few retinal cells do not “see”; they send light levels straight to the suprachiasmatic nucleus to set the circadian clock.') },
    ],
  },
  {
    id: 'hearing', icon: 'ear', system: 'auditory',
    name: b('听觉', 'Hearing'),
    summary: b('声波经耳蜗、脑干、丘脑到达听觉皮层；左侧理解语言，右侧分析语调和音乐。', 'Sound passes from the cochlea via the brainstem and thalamus to auditory cortex. The left side handles language, the right side tone and music.'),
    pathways: ['auditory', 'comprehension', 'prosody'],
    steps: [
      { title: b('耳蜗经脑干、内侧膝状体到 A1', 'Cochlea via brainstem and MGN to A1'), fire: ['auditory'],
        text: b('耳蜗把声音按频率分解，信号经脑干多级核团（比较两耳时间差来定位声源）到丘脑，再到颞横回。', 'The cochlea splits sound by frequency; brainstem nuclei compare the two ears to locate the source; then thalamus and Heschl’s gyrus.') },
      { title: b('A1：频率地图', 'A1: a frequency map'), stim: ['transversetemporal'],
        text: b('初级听觉皮层按音高高低排列，分析音高、响度和节奏。', 'Primary auditory cortex is laid out by pitch and analyses pitch, loudness and rhythm.') },
      { title: b('左侧：听懂语言', 'Left: understanding speech'), fire: ['comprehension'],
        text: b('颞上回后部（Wernicke 区）把声音识别为语音，颞中回检索词义。', 'Posterior superior temporal gyrus (Wernicke) recognizes speech sounds; middle temporal gyrus retrieves meaning.') },
      { title: b('右侧：语调与音乐', 'Right: tone and music'), fire: ['prosody'],
        text: b('右半球擅长旋律、和声以及说话人的情绪语气。', 'The right hemisphere excels at melody, harmony and a speaker’s emotional tone.') },
    ],
  },
  {
    id: 'touch', icon: 'hand', system: 'somatosensory',
    name: b('触觉与痛觉', 'Touch & pain'),
    short: b('触觉与痛觉', 'Touch'),
    summary: b('信号从皮肤经脊髓、丘脑到达中央后回；痛觉另有情绪通路；脊髓反射不经过大脑。', 'Signals travel from the skin via the spinal cord and thalamus to the postcentral gyrus. Pain also has an emotional route. Reflexes bypass the brain.'),
    pathways: ['reflex', 'somato', 'pain', 'painInsula', 'sensorimotor'],
    steps: [
      { title: b('脊髓反射', 'Spinal reflex'), fire: ['reflex'],
        text: b('被烫时，信号在脊髓内直接转给运动神经元，约 50 毫秒就缩手，比大脑「知道」还快。', 'When burned, the spinal cord relays straight to motor neurons: the hand pulls back in ~50 ms, before the brain knows.') },
      { title: b('上行到 S1', 'Up to S1'), fire: ['somato'],
        text: b('触觉经脊髓、脑干到丘脑腹后核，再到中央后回；随后在顶上小叶整合成「身体在空间中的位置」。', 'Touch ascends via spinal cord and brainstem to the ventral posterior thalamus, then postcentral gyrus, and is integrated in superior parietal cortex.') },
      { title: b('S1：感觉小人', 'S1: the sensory homunculus'), stim: ['postcentral'],
        text: b('身体每个部位在中央后回都有对应区域，手指和嘴唇占的面积最大，所以最敏感。', 'Every body part has its own patch; fingers and lips get the most cortex, so they are the most sensitive.') },
      { title: b('痛的「难受」', 'The unpleasantness of pain'), fire: ['pain', 'painInsula'],
        text: b('痛觉另走一条路到前扣带回、岛叶和杏仁核，产生「难受」和想逃避的情绪。', 'Pain also travels to anterior cingulate, insula and amygdala, producing suffering and the urge to escape.') },
      { title: b('感觉指导运动', 'Sensation guides movement'), fire: ['sensorimotor'],
        text: b('S1 直接把信息交给相邻的 M1，形成感觉-运动闭环。', 'S1 hands information to neighboring M1, closing the sensorimotor loop.') },
    ],
  },
  {
    id: 'motor', icon: 'person-standing', system: 'motor',
    name: b('运动', 'Movement'),
    summary: b('依次是定位目标、计划、基底节选择、M1 下达指令、肌肉执行，小脑再根据反馈校正。', 'The sequence: locate the target, plan, basal ganglia select, M1 commands, muscles act, and the cerebellum corrects from feedback.'),
    pathways: ['reach', 'smaLoop', 'motorLoop', 'nigrostriatal', 'pallidoThal', 'corticospinal', 'proprio', 'cerebellarLoop', 'legs'],
    steps: [
      { title: b('找到目标', 'Locating the target'), fire: ['reach'],
        text: b('顶上小叶计算杯子在哪里，前运动皮层把位置转换为「手该怎么动」。', 'Superior parietal cortex computes where the cup is; premotor cortex turns that into how the hand should move.') },
      { title: b('计划动作序列', 'Planning the sequence'), fire: ['smaLoop'],
        text: b('辅助运动区编排动作顺序，并经基底节环路确认。', 'The supplementary motor area sequences the movement and checks it through the basal-ganglia loop.') },
      { title: b('基底节：选择并「松开刹车」', 'Basal ganglia: select and release the brake'), fire: ['motorLoop', 'nigrostriatal', 'pallidoThal'],
        text: b('壳核在多巴胺帮助下选出要做的动作，苍白球只对这个动作松开对丘脑的抑制。', 'With dopamine, the putamen selects an action; the pallidum releases its brake on the thalamus for that action only.') },
      { title: b('M1 经脊髓到肌肉', 'M1 via spinal cord to muscles'), fire: ['corticospinal'],
        text: b('初级运动皮层经皮质脊髓束把指令送到脊髓运动神经元，肌肉收缩。', 'Primary motor cortex sends commands down the corticospinal tract to spinal motor neurons; muscles contract.') },
      { title: b('反馈与校正', 'Feedback and correction'), fire: ['proprio', 'cerebellarLoop'],
        text: b('肌肉和关节报告实际位置，小脑把「实际」与「预期」比较，经丘脑修正运动皮层的指令。', 'Muscles and joints report the actual position; the cerebellum compares it with the plan and corrects M1 via the thalamus.') },
    ],
  },
  {
    id: 'language', icon: 'message-square-text', system: 'language',
    name: b('语言', 'Language'),
    summary: b('依次是听、Wernicke 区理解、选词、经弓状束到 Broca 区组织、运动皮层发音，最后听到自己的声音。', 'The sequence: hear, Wernicke’s area understands, choose words, the arcuate fasciculus carries them to Broca’s area, motor cortex speaks, and the speaker hears the result.'),
    pathways: ['auditory', 'comprehension', 'semantic', 'arcuate', 'speech', 'reading'],
    steps: [
      { title: b('听到一句话', 'Hearing a sentence'), fire: [['auditory', { hemi: 'lh' }]],
        text: b('语音进入左侧听觉皮层（大多数人的语言以左半球为主）。', 'Speech reaches the left auditory cortex (language is left-dominant in most people).') },
      { title: b('Wernicke：理解', 'Wernicke: comprehension'), fire: ['comprehension'],
        text: b('把声音解码为词语，并在颞中回找到词义。', 'Sounds are decoded into words and their meaning is found in the middle temporal gyrus.') },
      { title: b('选词', 'Choosing words'), fire: ['semantic'],
        text: b('额下回三角部从语义中挑选合适的词。', 'Pars triangularis selects the right words from meaning.') },
      { title: b('弓状束到 Broca 区', 'Arcuate fasciculus to Broca'), fire: ['arcuate'],
        text: b('弓状束把语音信息送到 Broca 区，组织成发音计划。', 'The arcuate fasciculus carries sound information to Broca’s area, which plans articulation.') },
      { title: b('说出来', 'Speaking'), fire: ['speech'],
        text: b('运动皮层口面部区经脑干控制喉、舌、唇。', 'The face area of motor cortex drives larynx, tongue and lips via the brainstem.') },
      { title: b('阅读', 'Reading'), fire: ['reading'],
        text: b('视觉词形区识别字形，角回把它转换成语音，再进入同一条语言通路。', 'The visual word-form area recognizes letters; the angular gyrus converts them to sound and into the same language network.') },
    ],
  },
  {
    id: 'memory', icon: 'brain-circuit', system: 'memory',
    name: b('记忆', 'Memory'),
    summary: b('信号从皮层经内嗅皮层进入海马编码；新奇和情绪增强记忆；睡眠中回放巩固到新皮层。', 'Signals go from cortex via entorhinal cortex to the hippocampus for encoding. Novelty and emotion strengthen memory. Sleep replay consolidates it into neocortex.'),
    pathways: ['encoding', 'novelty', 'emotionalMemory', 'papez', 'consolidation'],
    steps: [
      { title: b('编码', 'Encoding'), fire: ['encoding'],
        text: b('各感觉皮层的信息经内嗅皮层汇入海马，被绑定成一段「情景」。', 'Information from sensory cortices flows through entorhinal cortex into the hippocampus and is bound into an episode.') },
      { title: b('新奇激活多巴胺', 'Novelty triggers dopamine'), fire: ['novelty'],
        text: b('新奇事件让腹侧被盖区释放多巴胺，给海马「这值得记住」的信号。', 'Novelty makes the VTA release dopamine, telling the hippocampus “worth keeping”.') },
      { title: b('情绪增强', 'Emotion strengthens'), fire: ['emotionalMemory'],
        text: b('杏仁核让带情绪的事件记得更牢。', 'The amygdala makes emotional events stick.') },
      { title: b('Papez 环路', 'Papez circuit'), fire: ['papez'],
        text: b('海马经乳头体、丘脑前核、扣带回、海马旁回和内嗅皮层回到海马，是一个经典的记忆情绪环路。', 'From the hippocampus via the mammillary bodies, anterior thalamus, cingulate, parahippocampal and entorhinal cortex back to the hippocampus: a classic loop.') },
      { title: b('睡眠巩固', 'Consolidation in sleep'), fire: ['consolidation'], stage: 'nrem',
        text: b('深睡时海马回放白天的经历，把它逐渐转存到新皮层，脑电呈现同步慢波。', 'In deep sleep the hippocampus replays the day and transfers it to neocortex; the EEG shows synchronous slow waves.') },
    ],
  },
  {
    id: 'fear', icon: 'zap', system: 'emotion',
    name: b('恐惧与情绪', 'Fear & emotion'),
    short: b('恐惧与情绪', 'Fear'),
    summary: b('丘脑「低通路」快速报警，皮层「高通路」看清细节；杏仁核触发身体反应，前额叶负责刹车。', 'Thalamic “low road” raises the alarm, cortical “high road” adds detail; amygdala drives the body, prefrontal cortex brakes.'),
    pathways: ['visual', 'fearLow', 'fearHigh', 'faceEmotion', 'stress', 'alarm', 'fearRegulation'],
    steps: [
      { title: b('低通路：先怕了再说', 'Low road: fear first'), fire: ['visual', ['fearLow', { delay: 700 }]],
        text: b('丘脑把粗糙的视觉信号直接送给杏仁核，约 12 毫秒：宁可错报，不可漏报。', 'The thalamus sends a crude signal straight to the amygdala in ~12 ms, better a false alarm than a miss.') },
      { title: b('高通路：看清是什么', 'High road: what is it?'), fire: ['fearHigh', 'faceEmotion'],
        text: b('视觉皮层、梭状回和颞下回识别出具体物体或表情，再告诉杏仁核。', 'Visual cortex, fusiform and inferior temporal cortex identify the object or expression, then inform the amygdala.') },
      { title: b('身体反应', 'The body reacts'), fire: ['stress', 'alarm'],
        text: b('杏仁核经下丘脑作用于脑干：心跳加快、呼吸急促；蓝斑释放去甲肾上腺素，全脑警觉。', 'The amygdala acts on the brainstem via the hypothalamus: faster heart and breathing. The locus coeruleus alerts the whole brain.') },
      { title: b('前额叶刹车', 'Prefrontal brake'), fire: ['fearRegulation'],
        text: b('腹内侧前额叶判断「其实安全」，抑制杏仁核，这是情绪调节的核心。', 'Ventromedial prefrontal cortex judges “actually safe” and inhibits the amygdala, the core of emotion regulation.') },
    ],
  },
  {
    id: 'reward', icon: 'sparkles', system: 'reward',
    name: b('奖赏与动机', 'Reward & motivation'),
    short: b('奖赏与动机', 'Reward'),
    summary: b('先评估价值，腹侧被盖区释放多巴胺，伏隔核产生「想要」，前额叶再把动机变成计划。', 'Value is evaluated, the VTA releases dopamine, the accumbens creates “wanting” and prefrontal cortex turns it into plans.'),
    pathways: ['gustatory', 'valueLoop', 'mesolimbic', 'mesocortical', 'nigroCaudate'],
    steps: [
      { title: b('尝到美味', 'Tasting something good'), fire: ['gustatory'],
        text: b('味觉经岛叶到眶额皮层，在那里得到「好吃」的价值评估。', 'Taste travels via the insula to orbitofrontal cortex, where it is valued as “delicious”.') },
      { title: b('价值转为动机', 'Value to motivation'), fire: ['valueLoop'],
        text: b('眶额与腹内侧前额叶把价值信息交给伏隔核。', 'Orbitofrontal and ventromedial prefrontal cortex pass value to the accumbens.') },
      { title: b('多巴胺：比预期更好！', 'Dopamine: better than expected!'), fire: ['mesolimbic'],
        text: b('腹侧被盖区的多巴胺编码「奖赏预测误差」，驱动伏隔核产生「还想要」。', 'VTA dopamine encodes reward prediction error, driving the accumbens to “want more”.') },
      { title: b('变成计划', 'Turning it into a plan'), fire: ['mesocortical'],
        text: b('多巴胺也到达前额叶，帮助维持目标、计划下一步行动。', 'Dopamine also reaches prefrontal cortex, helping hold the goal and plan the next action.') },
    ],
  },
  {
    id: 'homeostasis', icon: 'heart-pulse', system: 'autonomic',
    name: b('稳态与应激', 'Homeostasis & stress'),
    short: b('稳态与应激', 'Homeostasis'),
    summary: b('身体内部信号送往脑干、岛叶和下丘脑，再通过神经（交感与副交感）和激素（HPA 轴）两条途径输出，并有负反馈。', 'Internal signals reach the brainstem, insula and hypothalamus. Output goes through nerves (sympathetic and vagal) and hormones (HPA axis), with negative feedback.'),
    pathways: ['interoception', 'satiety', 'hpa', 'cortisolFeedback', 'sympathetic', 'adrenaline', 'vagal'],
    steps: [
      { title: b('感受身体内部', 'Sensing the body'), fire: ['interoception', 'satiety'],
        text: b('迷走神经把胃肠、心肺的状态送到脑干，再到岛叶（感受）和下丘脑（调节）。', 'The vagus carries gut, heart and lung signals to the brainstem, then to the insula (feeling) and hypothalamus (control).') },
      { title: b('HPA 轴：激素通路', 'HPA axis: the hormone route'), fire: ['hpa'],
        text: b('下丘脑经垂体促使肾上腺释放皮质醇，调动能量应对压力（慢，数分钟）。', 'The hypothalamus, via the pituitary, makes the adrenal glands release cortisol, which mobilizes energy for stress (slow, minutes).') },
      { title: b('负反馈', 'Negative feedback'), fire: ['cortisolFeedback'],
        text: b('皮质醇作用于海马和下丘脑，关闭应激反应，防止过度。', 'Cortisol acts on hippocampus and hypothalamus to shut the response down.') },
      { title: b('交感：战斗或逃跑', 'Sympathetic: fight or flight'), fire: ['sympathetic', 'adrenaline'],
        text: b('快速的神经通路：心跳加快、血压升高、肾上腺素释放（秒级）。', 'The fast neural route: heart speeds up, pressure rises, adrenaline released (seconds).') },
      { title: b('副交感：休息与消化', 'Parasympathetic: rest & digest'), fire: ['vagal'],
        text: b('迷走神经减慢心率，恢复平静。', 'The vagus slows the heart and restores calm.') },
    ],
  },
  {
    id: 'sleep', icon: 'moon', system: 'arousal',
    name: b('睡眠与觉醒', 'Sleep & wakefulness'),
    short: b('睡眠与觉醒', 'Sleep'),
    summary: b('光照校准生物钟；脑干网状系统和神经调质维持清醒；夜晚褪黑素和下丘脑睡眠开关让大脑入睡。', 'Light sets the clock; brainstem arousal systems keep us awake; melatonin and a hypothalamic switch bring sleep.'),
    pathways: ['circadian', 'aras', 'noradrenaline', 'serotonin', 'melatonin', 'sleepSwitch'],
    steps: [
      { title: b('光照校准生物钟', 'Light sets the clock'), fire: ['circadian'],
        text: b('视交叉上核是主生物钟，每天被晨光重新对时。', 'The suprachiasmatic nucleus is the master clock, reset each morning by light.') },
      { title: b('保持清醒', 'Staying awake'), fire: ['aras', 'noradrenaline', 'serotonin'], stage: 'wake',
        text: b('网状激活系统唤醒丘脑-皮层，蓝斑和中缝核释放去甲肾上腺素与 5-羟色胺，脑电为快速低幅的 α/β 波。', 'The reticular system wakes the thalamocortical system; LC and raphe release noradrenaline and serotonin, fast, low-amplitude alpha/beta EEG.') },
      { title: b('夜晚：褪黑素', 'Night: melatonin'), fire: ['melatonin'],
        text: b('黑暗时，生物钟让松果体分泌褪黑素。', 'In darkness the clock lets the pineal gland release melatonin.') },
      { title: b('睡眠开关进入深睡', 'Sleep switch to deep sleep'), fire: ['sleepSwitch'], stage: 'nrem',
        text: b('下丘脑抑制觉醒系统，全脑同步成大而慢的 δ 波。留意右侧脑电图的变化。', 'The hypothalamus inhibits the arousal system and the brain synchronizes into big slow delta waves. Watch the EEG.') },
      { title: b('REM：做梦', 'REM: dreaming'), stage: 'rem', stim: ['pericalcarine', 'amygdala'],
        text: b('乙酰胆碱升高、去甲肾上腺素和 5-羟色胺几乎停止：视觉与情绪区活跃，肌肉被脑干抑制。', 'Acetylcholine high, noradrenaline and serotonin nearly silent: visual and emotional areas active, muscles inhibited by the brainstem.') },
    ],
  },
  {
    id: 'attention', icon: 'scan-eye', system: 'executive',
    name: b('注意与决策', 'Attention & control'),
    short: b('注意与决策', 'Attention'),
    summary: b('显著性网络发现重要信息，前额叶在工作记忆中维持目标，再自上而下调节感觉；不专注时默认模式网络接管。', 'The salience network spots what matters. Prefrontal cortex holds the goal in working memory and adjusts perception from the top down. The default mode network takes over when attention drifts.'),
    pathways: ['salience', 'cognitiveLoop', 'topDown', 'eyeMove', 'dmn'],
    steps: [
      { title: b('这很重要！', 'This matters!'), fire: ['salience'],
        text: b('岛叶和前扣带回组成显著性网络，发现需要注意的事并通知前额叶。', 'Insula and anterior cingulate form the salience network, flagging what needs attention to prefrontal cortex.') },
      { title: b('工作记忆', 'Working memory'), fire: ['cognitiveLoop'],
        text: b('背外侧前额叶经尾状核-丘脑环路把目标「记在心里」。', 'Dorsolateral prefrontal cortex holds the goal in mind via the caudate–thalamus loop.') },
      { title: b('自上而下注意', 'Top-down attention'), fire: ['topDown', 'eyeMove'],
        text: b('前额叶经顶叶和额叶眼区放大相关的视觉信息，并把眼睛转向目标。', 'Prefrontal cortex boosts relevant visual input through parietal cortex and frontal eye fields, and turns the eyes to the target.') },
      { title: b('走神：默认模式网络', 'Mind-wandering: default mode'), fire: ['dmn'],
        text: b('没有外部任务时，内侧前额叶、后扣带回、楔前叶和角回接管，回忆过去、设想未来。', 'Without a task, medial prefrontal, posterior cingulate, precuneus and angular gyrus take over, recalling and imagining.') },
    ],
  },
]

export const TOUR_BY_ID: Record<string, Tour> = Object.fromEntries(TOURS.map((t) => [t.id, t]))

/** Node ids for an id or a base key (both hemispheres). */
export function idsFor(x: string): string[] {
  if (NODE_BY_ID[x]) return [x]
  return NODES.filter((n) => n.key === x).map((n) => n.id)
}

export interface TourSets {
  nodes: Set<string>
  keys: Set<string>
  paths: Set<number>
}

function collect(pathBaseIds: string[], hemiFor: (id: string) => FireOptions['hemi'], extra: string[] = []): TourSets {
  const nodes = new Set<string>()
  const paths = new Set<number>()
  for (const base of pathBaseIds) {
    for (const p of pathwaysFor(base, hemiFor(base))) {
      paths.add(PATHWAYS.indexOf(p))
      p.nodes.forEach((n) => nodes.add(n))
    }
  }
  extra.flatMap(idsFor).forEach((n) => nodes.add(n))
  const keys = new Set([...nodes].map((id) => NODE_BY_ID[id].key))
  return { nodes, keys, paths }
}

/** Everything that belongs to a tour. */
export function tourSets(t: Tour): TourSets {
  const stims = t.steps.flatMap((s) => s.stim ?? [])
  return collect(t.pathways, () => 'both', stims)
}

const fireList = (s: TourStep): [string, FireOptions][] => (s.fire ?? []).map((f) => (typeof f === 'string' ? [f, {}] : f))

/** What the current step touches (for highlighting). */
export function stepSets(s: TourStep): TourSets {
  const list = fireList(s)
  const hemi = new Map(list.map(([id, o]) => [id, o.hemi ?? 'both']))
  return collect(list.map(([id]) => id), (id) => hemi.get(id), s.stim ?? [])
}
