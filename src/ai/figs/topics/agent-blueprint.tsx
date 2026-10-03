import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import { Axes, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Whole-brain functional architecture: specialized systems around prefrontal cortex, value and drives setting goals,
 * neuromodulators broadcasting to all of them, and actions whose results come back through the senses. */
function BrainArch({ t }: FigProps) {
  const id = 'x03b'
  return (
    <Svg id={id} w={380} h={278} label={t(b('大脑整体功能架构的结构与信息流', 'Structure and information flow of the whole-brain functional architecture'))}>
      <Mod x={14} y={14} w={110} h={50} side="bio" label={t(b('感觉皮层', 'Sensory cortex'))} sub={t(b('物体、声音、位置', 'objects, sounds, places'))} />
      <Mod x={136} y={14} w={114} h={50} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} sub={t(b('工作记忆中的目标', 'goals in working memory'))} size={10.5} />
      <Mod x={266} y={14} w={100} h={50} side="bio" label={t(b('价值与驱力', 'Value, drives'))} sub={t(b('下丘脑、杏仁核、眶额', 'hypothalamus, amygdala'))} />
      <Store x={14} y={96} w={110} h={58} side="bio" label={t(b('海马', 'Hippocampus'))} sub={t(b('绑定与补全', 'binds, completes'))} />
      <Mod x={172} y={100} w={194} h={44} side="bio" label={t(b('神经调质核团', 'Neuromodulatory nuclei'))} sub={t(b('多巴胺、血清素、去甲肾上腺素、乙酰胆碱', 'dopamine, serotonin, NE, ACh'))} />
      <Region x={134} y={172} w={240} h={78} side="bio" label={t(b('动作', 'Action'))} />
      <Mod x={146} y={194} w={104} h={44} side="bio" label={t(b('基底节', 'Basal ganglia'))} sub={t(b('选出一个动作', 'picks one action'))} />
      <Mod x={262} y={194} w={104} h={44} side="bio" label={t(b('运动皮层、小脑', 'Motor cortex, cerebellum'))} sub={t(b('发出并校正', 'issue, correct'))} size={9.5} />

      <Flow id={id} side="bio" pts={[[124, 32], [136, 32]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[136, 50], [124, 50]]} />
      <Flow id={id} side="bio" pts={[[266, 39], [250, 39]]} />
      <Flow id={id} side="bio" pts={[[40, 64], [40, 96]]} label={t(b('经历', 'experience'))} lx={-2} ly={0} />
      <Flow id={id} side="bio" head="read" pts={[[100, 96], [100, 80], [146, 80], [146, 64]]} />
      <Flow id={id} side="bio" fast pts={[[160, 64], [160, 162], [198, 162], [198, 194]]} label={t(b('目标与规则', 'goals, rules'))} at={1} ly={-7} />
      <Flow id={id} side="bio" pts={[[316, 64], [316, 100]]} label={t(b('奖赏', 'reward'))} lx={16} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[220, 100], [220, 64]]} label={t(b('调制', 'modulates'))} lx={-22} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[290, 144], [290, 172]]} label={t(b('广播到全脑', 'broadcast brain-wide'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[250, 216], [262, 216]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[314, 238], [314, 264], [6, 264], [6, 39], [14, 39]]} label={t(b('动作的结果', 'results of action'))} at={1} ly={-6} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={98} n={2} side="bio" />
      <Num x={136} y={14} n={3} side="bio" />
      <Num x={266} y={14} n={4} side="bio" />
      <Num x={172} y={100} n={5} side="bio" />
      <Num x={374} y={172} n={6} side="bio" />
    </Svg>
  )
}

/** LLM agent architecture: the context window is the only working memory; the LLM core reads it and emits thoughts
 * and tool calls; external memory and tool results are written back; drives, global modulation and learning in use
 * have no counterpart. */
function AgentArch({ t }: FigProps) {
  const id = 'x03c'
  return (
    <Svg id={id} w={380} h={282} label={t(b('LLM 智能体架构的结构与信息流', 'Structure and information flow of an LLM agent architecture'))}>
      <Mod x={14} y={14} w={110} h={44} side="comp" label={t(b('输入编码', 'Input encoding'))} sub={t(b('词元与向量', 'tokens, vectors'))} />
      <Store x={140} y={12} w={226} h={64} side="comp" label={t(b('上下文窗口', 'Context window'))} sub={t(b('指令、对话、观察，上限 L 个词元', 'instructions, dialogue, observations, up to L tokens'))} />
      <Store x={14} y={96} w={110} h={60} side="comp" label={t(b('外部记忆', 'External memory'))} sub={t(b('向量库或文件', 'vector store, files'))} />
      <Mod x={140} y={104} w={200} h={44} side="comp" label={t(b('LLM 核心', 'LLM core'))} sub={t(b('权重固定，生成思考与调用', 'fixed weights, emits thoughts and calls'))} />
      <Mod x={140} y={176} w={200} h={40} side="comp" label={t(b('工具与执行', 'Tools and execution'))} sub={t(b('搜索、代码、API、机器人', 'search, code, APIs, robots'))} />
      <Gap x={14} y={236} w={110} h={34} label={t(b('自己的驱力', 'Own drives'))} />
      <Gap x={136} y={236} w={112} h={34} label={t(b('全局调制信号', 'Global modulation'))} />
      <Gap x={256} y={236} w={110} h={34} label={t(b('使用中学习', 'Learning in use'))} />

      <Flow id={id} side="comp" pts={[[124, 36], [140, 36]]} />
      <Flow id={id} side="comp" head="read" pts={[[240, 76], [240, 104]]} />
      <Flow id={id} side="comp" pts={[[240, 148], [240, 176]]} label={t(b('调用', 'call'))} lx={14} ly={0} />
      <Flow id={id} side="comp" pts={[[340, 196], [356, 196], [356, 76]]} label={t(b('观察', 'obs.'))} at={1} lx={12} ly={0} />
      <Flow id={id} side="comp" head="read" pts={[[124, 118], [132, 118], [132, 64], [140, 64]]} label={t(b('检索', 'retrieve'))} at={1} lx={-14} />
      <Flow id={id} side="comp" pts={[[140, 140], [124, 140]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={140} y={16} n={2} side="comp" />
      <Num x={14} y={98} n={4} side="comp" />
      <Num x={140} y={104} n={3} side="comp" />
      <Num x={140} y={176} n={5} side="comp" />
      <Num x={14} y={236} n={6} side="comp" />
    </Svg>
  )
}

/** Interactive: drag the discount factor γ (the serotonin parameter in Doya's hypothesis) and watch the present value
 * of 10 units three steps away cross the 2 units on offer now. Starts at the worked example's γ = 0.9. */
function DiscountPlot({ t }: FigProps) {
  const [g, setG] = useState(0.9)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 26, w: 240, h: 130, xr: [0, 1], yr: [0, 10] }
  const v = 10 * g ** 3
  const readout = (x: number) => { const w = 10 * x ** 3; return t(b(`$\\gamma = ${x.toFixed(2)}$：等待的现值 $${w.toFixed(2)}$，${w > 2 ? '选择等待' : '选择眼前'}`, `$\\gamma = ${x.toFixed(2)}$: waiting is worth $${w.toFixed(2)}$, ${w > 2 ? 'wait' : 'take it now'}`)) }
  return (
    <>
      <Svg id="x03mb0" w={380} h={196} label={t(b('折扣因子 γ 决定等待是否值得：3 步后的 10 个单位与眼前的 2 个单位', 'The discount factor γ decides whether waiting pays: 10 units in 3 steps against 2 units now'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [0.585, ''], [1, '1']]} yTicks={[[0, '0'], [2, '2'], [5, '5'], [10, '10']]} xLabel={t(b('折扣因子 γ', 'Discount factor γ'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('现值', 'Present value'))} anchor="start" />
        <Ref f={f} y={2} color={C.dim} />
        <Ref f={f} x={0.585} color={C.dim} />
        <Path pts={trace(f, (x) => 10 * x ** 3)} color={col} width={2} />
        <circle cx={px(f, g)} cy={py(f, v)} r={4.5} fill={col} />
        <Label x={292} y={56} s={t(b('实线：3 步后的\n10，打折后', 'solid: 10 in 3 steps,\ndiscounted'))} anchor="start" size={9.5} color={col} />
        <Label x={292} y={py(f, 2)} s={t(b('眼前的 2', '2 now'))} anchor="start" size={9.5} />
        <Label x={px(f, 0.585)} y={f.y - 6} s="0.585" size={9.5} />
      </Svg>
      <FigSlider label="$\gamma$" value={g} min={0} max={1} step={0.01} onChange={setG} readout={readout(g)} widest={[readout(0.99), readout(0.5)]} />
    </>
  )
}

/* The ReAct example: 250 tokens of thought and action per round plus the observation, against a 128000-token limit. */
const LIMIT = 128000

/** Interactive: drag the observation length per round and see how many rounds fit before the context starts to be
 * cut. Starts at the worked example's 1500 tokens. */
function ContextPlot({ t }: FigProps) {
  const [obs, setObs] = useState(1500)
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 52, y: 26, w: 240, h: 130, xr: [0, 150], yr: [0, 160000] }
  const per = 250 + obs, rounds = LIMIT / per
  const readout = (o: number) => t(b(`每轮观察 $${o}$ 个词元：约 $${Math.floor(LIMIT / (250 + o))}$ 轮后开始截断`, `$${o}$ observation tokens per round: cutting starts after about $${Math.floor(LIMIT / (250 + o))}$ rounds`))
  return (
    <>
      <Svg id="x03mc0" w={380} h={196} label={t(b('上下文随轮数增长，到上限后开始截断', 'The context grows with each round and is cut once it reaches the limit'))}>
        <Axes f={f} xTicks={[[0, '0'], [50, '50'], [100, '100'], [150, '150']]} yTicks={[[0, '0'], [64000, '64k'], [128000, '128k']]} xLabel={t(b('轮数', 'Rounds'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('上下文长度（词元）', 'Context length (tokens)'))} anchor="start" />
        <Ref f={f} y={LIMIT} color={C.dim} />
        <Path pts={trace(f, (r) => Math.min(LIMIT, r * per))} color={col} width={2} />
        {rounds < 150 && <Ref f={f} x={rounds} color={col} />}
        <Label x={304} y={py(f, LIMIT)} s={t(b('上限 L', 'limit L'))} anchor="start" size={9.5} />
        <Label x={304} y={110} s={t(b('之后最早的\n内容被截断\n或压缩', 'after this the\nearliest content\nis cut or\ncompressed'))} anchor="start" size={9.5} color={col} />
      </Svg>
      <FigSlider label={t(b('每轮观察', 'Observation per round'))} value={obs} min={200} max={5000} step={100} onChange={setObs} readout={readout(obs)} widest={[readout(200), readout(5000)]} />
    </>
  )
}

/** The worked example's three memories: recency, importance and relevance stacked into one retrieval score. */
function RetrievalPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const rows: [string, number, number, number][] = [['A', 0.995 ** 2, 0.3, 0.4], ['B', 0.995 ** 48, 0.9, 0.9], ['C', 0.995, 0.1, 0.2]]
  const x0 = 54, unit = 92, h = 22
  const parts = [t(b('新近度', 'recency')), t(b('重要性', 'importance')), t(b('相关性', 'relevance'))]
  return (
    <Svg id="x03mc1" w={380} h={188} label={t(b('记忆检索得分：三条记忆的新近度、重要性和相关性相加', 'Retrieval score: recency, importance and relevance added for three memories'))}>
      {rows.map(([name, ...vs], i) => {
        const y = 30 + i * 40
        let x = x0
        const total = vs.reduce((a, v) => a + v, 0)
        return (
          <g key={name}>
            <T x={x0 - 12} y={y + h / 2} s={t(b(`记忆 ${name}`, `Memory ${name}`))} size={10} anchor="end" />
            {vs.map((v, k) => { const r = <rect key={k} x={x} y={y} width={v * unit} height={h} fill={col} fillOpacity={[0.25, 0.55, 0.9][k]} stroke={col} strokeWidth={0.8} />; x += v * unit; return r })}
            <T x={x + 6} y={y + h / 2} s={(Math.round(total * 100 + 1e-6) / 100).toFixed(2)} size={10.5} anchor="start" color={col} weight={name === 'B' ? 700 : undefined} />
          </g>
        )
      })}
      {parts.map((p, k) => (
        <g key={k}>
          <rect x={x0 + k * 96} y={160} width={10} height={10} fill={col} fillOpacity={[0.25, 0.55, 0.9][k]} stroke={col} strokeWidth={0.8} />
          <T x={x0 + 16 + k * 96} y={165} s={p} size={9.5} anchor="start" color={C.dim} />
        </g>
      ))}
    </Svg>
  )
}

export const AGENT_BLUEPRINT_FIGS: TopicFigs = {
  arch: { brain: BrainArch, ai: AgentArch },
  math: {
    bio: {
      0: { Fig: DiscountPlot, cap: b('3 步后的 $10$ 个单位，按 $10\\gamma^3$ 打折后的现值（实线），与眼前的 $2$（灰线）比较。$\\gamma = 0.9$ 时现值约 $7.3$，选择等待；拖动滑块把 $\\gamma$ 调到 $0.585$ 以下，选择翻转为眼前的奖赏。', 'The present value of $10$ units in 3 steps, $10\\gamma^3$ (solid), against the $2$ on offer now (gray). At $\\gamma = 0.9$ it is worth about $7.3$, so waiting wins. Drag the slider below $0.585$ and the choice flips to the immediate reward.') },
    },
    comp: {
      0: { Fig: ContextPlot, cap: b('每轮思考和动作约 $250$ 个词元，再加上观察。观察为 $1500$ 个词元时，约 $73$ 轮后上下文达到 $128000$ 的上限。拖动滑块改变观察长度：观察越长，能保留的轮数越少。', 'Each round adds about $250$ tokens of thought and action, plus the observation. With $1500$ observation tokens the context reaches the $128000$ limit after about $73$ rounds. Drag the slider to change the observation length. The longer it is, the fewer rounds fit.') },
      1: { Fig: RetrievalPlot, cap: b('例中三条记忆的得分，由新近度、重要性和相关性三段相加。B 最旧，新近度最低，但重要性和相关性都高，总分 $2.59$ 最先被取出。', 'The three example memories, each score stacked from recency, importance and relevance. B is the oldest and lowest in recency, but high importance and relevance give it the top score of $2.59$, so it is retrieved first.') },
    },
  },
}
