import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { FigSlider, Label, SIDE_COLOR, Vec } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Social cues from the STS feed belief inference in the TPJ and trait inference in medial prefrontal cortex; both predict behavior, revised in interaction. */
function TheoryOfMindBrainArch({ t }: FigProps) {
  const id = 'f37b'
  return (
    <Svg id={id} w={380} h={218} label={t(b('心智理论网络的结构与信息流：颞上沟、颞顶联合区、内侧前额叶、动作模拟、预测行为', 'Theory-of-mind network: superior temporal sulcus, temporoparietal junction, medial prefrontal cortex, action simulation, predicting behavior'))}>
      <Mod x={22} y={14} w={162} h={40} side="bio" label={t(b('颞上沟', 'Superior temporal sulcus'))} sub={t(b('视线、表情、身体动作', 'gaze, expression, movement'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('运动相关区域', 'Motor-related areas'))} sub={t(b('模拟观察到的动作', 'simulate observed actions'))} size={10.5} />
      <Mod x={22} y={88} w={162} h={40} side="bio" label={t(b('右侧颞顶联合区', 'Right TPJ'))} sub={t(b('他人的信念，尤其是错误信念', 'others’ beliefs, false ones too'))} size={10.5} />
      <Mod x={196} y={88} w={170} h={40} side="bio" label={t(b('内侧前额叶', 'Medial prefrontal cortex'))} sub={t(b('性格、长期目标与意图', 'traits, goals and intentions'))} size={10.5} />
      <Mod x={22} y={162} w={344} h={40} side="bio" label={t(b('预测行为', 'Predicting behavior'))} sub={t(b('信念加愿望，推测对方下一步会做什么', 'beliefs plus desires predict the next move'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[103, 54], [103, 88]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 54], [281, 88]]} label={t(b('作用有争议', 'role debated'))} lx={36} ly={0} />
      <Flow id={id} side="bio" pts={[[103, 128], [103, 162]]} />
      <Flow id={id} side="bio" pts={[[281, 128], [281, 162]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[22, 182], [12, 182], [12, 34], [22, 34]]} />
      <Num x={22} y={14} n={1} side="bio" />
      <Num x={22} y={88} n={2} side="bio" />
      <Num x={196} y={88} n={3} side="bio" />
      <Num x={196} y={14} n={4} side="bio" />
      <Num x={22} y={162} n={5} side="bio" />
    </Svg>
  )
}

/** A language model reads a story, tracks who saw what across its layers and answers; ToMnet learns a character vector from past behavior; post-training shapes the replies. */
function BeliefInferenceArch({ t }: FigProps) {
  const id = 'f37c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('大语言模型的信念推断的结构与信息流：故事输入、追踪人物与信息、回答、机器心智理论网络、后训练', 'Belief inference in language models: story input, tracking characters and information, answering, machine theory of mind, post-training'))}>
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('故事输入', 'Story input'))} sub={t(b('人物、物体、谁看到了什么', 'characters, objects, who saw what'))} size={10.5} />
      <Region x={6} y={72} w={252} h={118} side="comp" label={t(b('大语言模型', 'Language model'))} />
      <Mod x={18} y={96} w={228} h={36} side="comp" label={t(b('追踪人物与信息', 'Tracking characters'))} sub={t(b('Transformer 层记下位置、行动、所见', 'layers track place, action, what was seen'))} size={10.5} />
      <Mod x={18} y={144} w={228} h={36} side="comp" label={t(b('回答问题', 'Answering'))} sub={t(b('「他会去哪里找」', '“where will he look?”'))} size={10.5} />
      <Mod x={268} y={96} w={100} h={84} side="comp" label={t(b('后训练', 'Post-training'))} sub={t(b('对话与指令', 'dialogue, instructions'))} size={10.5} />
      <Mod x={14} y={210} w={352} h={40} side="comp" label={t(b('机器心智理论网络', 'Machine theory-of-mind network'))} sub={t(b('把过去的行为压缩成特征向量，预测下一步动作', 'compresses past behavior into a character vector, predicts the next action'))} size={10.5} />
      <Gap x={14} y={266} w={352} h={30} label={t(b('稳健、可检验、在互动中更新的他人心理状态表示', 'A robust, testable model of others, updated in interaction'))} />

      <Flow id={id} side="comp" pts={[[131, 54], [131, 96]]} />
      <Flow id={id} side="comp" pts={[[131, 132], [131, 144]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 138], [258, 138]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={96} n={2} side="comp" />
      <Num x={18} y={144} n={3} side="comp" />
      <Num x={14} y={210} n={4} side="comp" />
      <Num x={268} y={96} n={5} side="comp" />
      <Num x={14} y={266} n={6} side="comp" />
    </Svg>
  )
}

/** Inverse planning on the worked example: coffee shop to the left, bakery to the right, even prior; each step toward a
 * goal has likelihood 0.8 under it and 0.2 under the other. Interactive: drag how many steps left the person has taken. */
function InversePlanningPlot({ t }: FigProps) {
  const [n, setN] = useState(1)
  const col = SIDE_COLOR.bio
  const post = (k: number) => Math.pow(4, k) / (Math.pow(4, k) + 1)
  const cx = 190, y = 70, step = 26
  const readout = (k: number) => t(b(`向左 ${k} 步：去咖啡店的概率 ${post(k).toFixed(3)}`, `${k} steps left: coffee shop ${post(k).toFixed(3)}`))
  return (
    <>
      <Svg id="f37mb0" w={380} h={190} label={t(b('逆向规划：每朝一个方向走一步，就更相信对方的目标在那一边', 'Inverse planning: each step toward one side makes it more likely the goal is there'))}>
        <line x1={30} x2={350} y1={y} y2={y} stroke={C.line} strokeWidth={10} strokeLinecap="round" />
        <rect x={6} y={y - 18} width={44} height={36} rx={6} fill={C.pink} stroke={col} />
        <Label x={28} y={y} s={t(b('咖啡店', 'café'))} size={10} color={C.ink} />
        <rect x={330} y={y - 18} width={44} height={36} rx={6} fill={C.ghost} stroke={C.line} />
        <Label x={352} y={y} s={t(b('面包店', 'bakery'))} size={10} color={C.ink} />
        <circle cx={cx} cy={y} r={5} fill={C.dim} />
        <Label x={cx} y={y + 18} s={t(b('路口', 'junction'))} size={10} />
        {Array.from({ length: n }, (_, i) => <circle key={i} cx={cx - (i + 1) * step} cy={y} r={4} fill={col} />)}
        {n > 0 && <Vec x1={cx - 6} y1={y - 14} x2={cx - n * step} y2={y - 14} color={col} width={1.4} />}
        <rect x={60} y={130} width={260 * post(n)} height={16} fill={col} fillOpacity={0.6} />
        <rect x={60 + 260 * post(n)} y={130} width={260 * (1 - post(n))} height={16} fill={C.dim} fillOpacity={0.45} />
        <Label x={54} y={138} s={t(b('后验', 'posterior'))} anchor="end" size={10} />
        <Label x={64} y={160} s={t(b(`咖啡店 ${post(n).toFixed(2)}`, `café ${post(n).toFixed(2)}`))} anchor="start" size={10} color={col} />
        <Label x={316} y={160} s={t(b(`面包店 ${(1 - post(n)).toFixed(2)}`, `bakery ${(1 - post(n)).toFixed(2)}`))} anchor="end" size={10} />
      </Svg>
      <FigSlider label={t(b('向左走的步数', 'Steps to the left'))} value={n} min={0} max={5} step={1} onChange={setN} readout={readout(n)} widest={[1].map(readout)} />
    </>
  )
}

/** The Sally–Anne test as three moments: where the ball is and where Sally believes it is. Her belief updates only on
 * what she sees, so after the hidden move the two come apart and the predicted search follows her belief. */
function FalseBeliefPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const cols = [70, 190, 310]
  const steps = [t(b('Sally 放进篮子', 'Sally: into the basket')), t(b('她离开，Anne 移进盒子', 'Anne moves it to the box')), t(b('Sally 回来找球', 'Sally comes back'))]
  const actual = ['basket', 'box', 'box'], belief = ['basket', 'basket', 'basket']
  const cell = (x: number, y: number, where: string, color: string) => (
    <g>
      <rect x={x - 46} y={y - 14} width={40} height={28} rx={5} fill={where === 'basket' ? color : 'none'} fillOpacity={0.35} stroke={C.line} />
      <rect x={x + 6} y={y - 14} width={40} height={28} rx={5} fill={where === 'box' ? color : 'none'} fillOpacity={0.35} stroke={C.line} />
      <text x={x - 26} y={y} fontSize={9} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{t(b('篮子', 'basket'))}</text>
      <text x={x + 26} y={y} fontSize={9} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{t(b('盒子', 'box'))}</text>
    </g>
  )
  return (
    <Svg id="f37mb1" w={380} h={190} label={t(b('错误信念：Sally 没看到球被移走，她的信念停在篮子里，所以会去篮子找', 'False belief: Sally did not see the move, so her belief stays at the basket and she will look there'))}>
      {cols.map((x, i) => <Label key={i} x={x} y={20} s={steps[i]} size={9.5} color={C.ink} />)}
      <Label x={4} y={64} s={t(b('实际', 'Actual'))} anchor="start" size={10} />
      <Label x={4} y={114} s={t(b('Sally\n的信念', 'Sally’s\nbelief'))} anchor="start" size={10} color={col} />
      {cols.map((x, i) => cell(x + 14, 64, actual[i], C.ink))}
      {cols.map((x, i) => cell(x + 14, 114, belief[i], col))}
      <rect x={cols[2] - 40} y={92} width={108} height={44} rx={8} fill="none" stroke={C.lemonD} strokeDasharray="3 3" />
      <Label x={190} y={164} s={t(b('第三个时刻两行不同：预测她去篮子找，尽管球在盒子里', 'At the third moment the rows differ: she will look\nin the basket, though the ball is in the box'))} size={9.5} color={C.lemonD} />
    </Svg>
  )
}

export const SOCIAL_FIGS: TopicFigs = {
  arch: { brain: TheoryOfMindBrainArch, ai: BeliefInferenceArch },
  math: {
    bio: {
      0: { Fig: InversePlanningPlot, cap: b('小例子：咖啡店在左、面包店在右，先验各一半；朝目标走的概率为 $0.8$，背离为 $0.2$。拖动滑块改变向左走的步数：第一步后咖啡店的后验为 $0.8$，第二步约 $0.94$，之后越来越确定。每一步的似然之比都是 $4 : 1$。', 'The worked example: café to the left, bakery to the right, even prior; a step toward the goal has probability $0.8$, away from it $0.2$. Drag the slider to change the steps taken to the left: after one the café’s posterior is $0.8$, after two about $0.94$, and it keeps firming up. Each step contributes a likelihood ratio of $4 : 1$.') },
      1: { Fig: FalseBeliefPlot, cap: b('第一行是球实际在哪里，第二行是 Sally 的信念。她只根据自己看到的更新信念：第二个时刻她不在场，信念没有变。到第三个时刻，两行不同，按她的信念计算找球的收益，篮子最高，所以预测她去篮子找。', 'The top row is where the ball actually is, the bottom row where Sally believes it is. She updates only on what she sees: at the second moment she is away, so her belief does not change. By the third moment the rows differ; computed from her belief, the basket has the highest payoff, so she is predicted to look there.') },
    },
  },
}
