import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Monitoring signals feed the cingulate's cost-benefit estimate; lateral prefrontal cortex then adjusts decisions, seeks help, offloads or reallocates study time. */
function ControlBrainArch({ t }: FigProps) {
  const id = 'f25b'
  return (
    <Svg id={id} w={380} h={220} label={t(b('基于信心的复核与求助的结构与信息流：监测信号、前扣带皮层、外侧前额叶、寻求帮助、认知卸载、学习时间分配', 'Confidence-driven control: monitoring signals, anterior cingulate, lateral prefrontal cortex, seeking help, offloading, study time'))}>
      <Mod x={30} y={14} w={154} h={40} side="bio" label={t(b('监测信号', 'Monitoring signals'))} sub={t(b('信心与错误信号', 'confidence and errors'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('前扣带皮层', 'Anterior cingulate'))} sub={t(b('收益与努力代价的权衡', 'benefit against effort cost'))} size={10.5} />
      <Mod x={196} y={88} w={170} h={40} side="bio" label={t(b('外侧前额叶', 'Lateral prefrontal'))} sub={t(b('提高证据量、放慢、复查', 'more evidence, slower, check'))} size={10.5} />
      <Mod x={30} y={166} w={104} h={40} side="bio" label={t(b('寻求帮助', 'Seek help'))} sub={t(b('再看、查、问人', 'look, search, ask'))} size={10.5} />
      <Mod x={146} y={166} w={104} h={40} side="bio" label={t(b('认知卸载', 'Offloading'))} sub={t(b('写下来、设提醒', 'notes, reminders'))} size={10.5} />
      <Mod x={262} y={166} w={104} h={40} side="bio" label={t(b('分配学习时间', 'Study time'))} sub={t(b('差一点就会的', 'the almost-known'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[281, 54], [281, 88]]} />
      <Flow id={id} side="bio" head="none" pts={[[281, 128], [281, 146]]} />
      <Flow id={id} side="bio" head="none" pts={[[82, 146], [314, 146]]} />
      <Flow id={id} side="bio" pts={[[82, 146], [82, 166]]} />
      <Flow id={id} side="bio" pts={[[198, 146], [198, 166]]} />
      <Flow id={id} side="bio" pts={[[314, 146], [314, 166]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[30, 186], [20, 186], [20, 34], [30, 34]]} />
      <Num x={30} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={196} y={88} n={3} side="bio" />
      <Num x={30} y={166} n={4} side="bio" />
      <Num x={146} y={166} n={5} side="bio" />
      <Num x={262} y={166} n={6} side="bio" />
    </Svg>
  )
}

/** A reasoning model writes out reasoning, samples several chains and votes, checks itself and can call tools or decline. */
function ReasoningBudgetArch({ t }: FigProps) {
  const id = 'f25c'
  const chain = (x: number, l: string) => (
    <g key={l}>
      <rect x={x} y={82} width={44} height={26} rx={6} fill={C.sky} stroke={C.skyD} strokeWidth={1.2} />
      <text x={x + 22} y={95} fontSize={9.5} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{l}</text>
    </g>
  )
  return (
    <Svg id={id} w={380} h={290} label={t(b('自我纠错与推理预算的结构与信息流：问题输入、写出推理、多次采样与投票、自我检查、工具与拒答', 'Self-correction and reasoning budgets: input, written reasoning, sampling and voting, self-checking, tools and declining'))}>
      <Mod x={14} y={14} w={352} h={32} side="comp" label={t(b('问题输入', 'Problem input'))} size={10.5} />
      <Mod x={14} y={66} w={170} h={40} side="comp" label={t(b('写出推理过程', 'Written reasoning'))} sub={t(b('越长，花的计算越多', 'longer means more compute'))} size={10.5} />
      <Region x={196} y={58} w={170} h={98} side="comp" label={t(b('多次采样与投票', 'Sampling and voting'))} />
      {chain(208, t(b('推理 1', 'Chain 1')))}
      {chain(259, t(b('推理 2', 'Chain 2')))}
      {chain(310, t(b('推理 3', 'Chain 3')))}
      <Mod x={236} y={122} w={90} h={26} side="comp" label={t(b('多数答案', 'Majority'))} size={10} />
      <Mod x={14} y={126} w={170} h={40} side="comp" label={t(b('自我检查', 'Self-checking'))} sub={t(b('回头检查、换一种方法', 'look back, try another way'))} size={10.5} />
      <Mod x={14} y={190} w={352} h={40} side="comp" label={t(b('工具与拒答', 'Tools and declining'))} sub={t(b('调用搜索或代码执行来查证，或回答不知道', 'search or run code to verify, or say it does not know'))} size={10.5} />
      <Gap x={14} y={248} w={352} h={30} label={t(b('由可靠的自我评估驱动的调控', 'Control driven by reliable self-assessment'))} />

      <Flow id={id} side="comp" pts={[[99, 46], [99, 66]]} />
      <Flow id={id} side="comp" pts={[[281, 46], [281, 58]]} />
      <Flow id={id} side="comp" pts={[[150, 106], [150, 126]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[48, 126], [48, 106]]} label={t(b('改写', 'revise'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[230, 108], [262, 122]]} />
      <Flow id={id} side="comp" pts={[[281, 108], [281, 122]]} />
      <Flow id={id} side="comp" pts={[[332, 108], [300, 122]]} />
      <Flow id={id} side="comp" pts={[[99, 166], [99, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 156], [281, 190]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={66} n={2} side="comp" />
      <Num x={360} y={70} n={3} side="comp" />
      <Num x={14} y={126} n={4} side="comp" />
      <Num x={14} y={190} n={5} side="comp" />
      <Num x={14} y={248} n={6} side="comp" />
    </Svg>
  )
}

/** The expected value of control for rechecking an answer (right is worth 10, wrong 0, rechecking costs 1), interactive:
 * drag the confidence. Rechecking fixes part of the remaining errors, more when confidence is low; the share is set so
 * the worked example's two cases hold (0.95 → 0.97, 0.6 → 0.85). */
function EvcPlot({ t }: FigProps) {
  const [c, setC] = useState(0.6)
  const col = SIDE_COLOR.bio
  const after = (x: number) => x + (1 - x) * (1.011 - 0.643 * x)
  const no = (x: number) => 10 * x, yes = (x: number) => 10 * after(x) - 1
  const f: Frame = { x: 44, y: 30, w: 230, h: 124, xr: [0.5, 1], yr: [4, 10] }
  const cross = 0.8
  const readout = (x: number) => t(b(`信心 ${x.toFixed(2)}：不复查 ${no(x).toFixed(1)}，复查 ${yes(x).toFixed(1)}，${yes(x) > no(x) ? '复查' : '不复查'}`, `confidence ${x.toFixed(2)}: skip ${no(x).toFixed(1)}, recheck ${yes(x).toFixed(1)}, ${yes(x) > no(x) ? 'recheck' : 'skip'}`))
  return (
    <>
      <Svg id="f25mb0" w={380} h={198} label={t(b('控制的期望价值：信心低时复查的收益超过代价，信心高时不值得', 'Expected value of control: at low confidence rechecking is worth its cost, at high confidence it is not'))}>
        <rect x={px(f, 0.5)} y={f.y} width={px(f, cross) - px(f, 0.5)} height={f.h} fill={col} fillOpacity={0.06} />
        <Axes f={f} xTicks={[[0.5, '0.5'], [0.6, '0.6'], [0.8, '0.8'], [0.95, '0.95']]} yTicks={[[4, '4'], [6, '6'], [8, '8'], [10, '10']]} xLabel={t(b('对答案的信心', 'Confidence in the answer'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('期望价值', 'Expected value'))} anchor="start" />
        <Label x={px(f, 0.65)} y={f.y + 10} s={t(b('值得复查', 'worth rechecking'))} size={10} color={col} />
        <Path pts={trace(f, no)} color={C.dim} />
        <Path pts={trace(f, yes)} color={col} />
        <Dot f={f} x={c} y={no(c)} color={C.dim} />
        <Dot f={f} x={c} y={yes(c)} color={col} r={4} />
        <Label x={f.x + f.w + 6} y={py(f, no(1)) - 7} s={t(b('不复查', 'skip'))} anchor="start" size={10} />
        <Label x={f.x + f.w + 6} y={py(f, yes(1)) + 7} s={t(b('复查，减去代价 1', 'recheck, cost 1'))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('信心', 'Confidence'))} value={c} min={0.5} max={1} step={0.01} onChange={setC} readout={readout(c)} widest={[0.6, 0.95, 1, 0.99].map(readout)} />
    </>
  )
}

/** Speed against accuracy in the drift-diffusion model (v = 1, σ = 1), interactive: drag the bound B; error rate
 * 1 / (1 + e^{2B}) and mean time B tanh(B). Starts at the worked example's B = 1. */
function SpeedAccuracyPlot({ t }: FigProps) {
  const [B, setB] = useState(1)
  const col = SIDE_COLOR.bio
  const err = (x: number) => 1 / (1 + Math.exp(2 * x)), time = (x: number) => x * Math.tanh(x)
  const f1: Frame = { x: 40, y: 34, w: 130, h: 116, xr: [0, 3], yr: [0, 0.5] }
  const f2: Frame = { x: 226, y: 34, w: 130, h: 116, xr: [0, 3], yr: [0, 3] }
  const readout = (x: number) => t(b(`$B = ${x.toFixed(2)}$：错误率 ${err(x).toFixed(3)}，平均用时 ${time(x).toFixed(2)}`, `$B = ${x.toFixed(2)}$: errors ${err(x).toFixed(3)}, mean time ${time(x).toFixed(2)}`))
  return (
    <>
      <Svg id="f25mb1" w={380} h={196} label={t(b('速度与准确的权衡：界限越高，错误越少，用时越长', 'Speed against accuracy: the higher the bound, the fewer the errors and the longer the time'))}>
        <Axes f={f1} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [0.25, '0.25'], [0.5, '0.5']]} xLabel={t(b('决策界限 B', 'Bound B'))} grid />
        <Label x={f1.x - 4} y={f1.y - 14} s={t(b('错误率', 'Error rate'))} anchor="start" />
        <Path pts={trace(f1, err)} color={C.lemonD} opacity={0.5} />
        <Dot f={f1} x={B} y={err(B)} color={C.lemonD} r={4} />
        <Axes f={f2} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} xLabel={t(b('决策界限 B', 'Bound B'))} grid />
        <Label x={f2.x - 4} y={f2.y - 14} s={t(b('平均用时', 'Mean time'))} anchor="start" />
        <Path pts={trace(f2, time)} color={col} opacity={0.5} />
        <Dot f={f2} x={B} y={time(B)} color={col} r={4} />
      </Svg>
      <FigSlider label="$B$" value={B} min={0.1} max={3} step={0.05} onChange={setB} readout={readout(B)} widest={[1].map(readout)} />
    </>
  )
}

/** Majority voting over n samples, interactive: drag n (odd). With p = 0.6 per sample the vote improves; with p = 0.4 it
 * gets worse. Starts at the worked example's n = 5. */
function MajorityPlot({ t }: FigProps) {
  const [n, setN] = useState(5)
  const col = SIDE_COLOR.comp
  const choose = (m: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (m - k + i)) / i; return r }
  const maj = (m: number, p: number) => { let s = 0; for (let k = Math.floor(m / 2) + 1; k <= m; k++) s += choose(m, k) * Math.pow(p, k) * Math.pow(1 - p, m - k); return s }
  const ns = Array.from({ length: 16 }, (_, i) => 2 * i + 1)
  const f: Frame = { x: 44, y: 30, w: 250, h: 124, xr: [1, 31], yr: [0, 1] }
  const line = (p: number) => ns.map((m) => [px(f, m), py(f, maj(m, p))] as [number, number])
  const readout = (m: number) => t(b(`采 ${m} 次：${maj(m, 0.6).toFixed(2)}（单次 0.6），${maj(m, 0.4).toFixed(2)}（单次 0.4）`, `${m} samples: ${maj(m, 0.6).toFixed(2)} (p = 0.6), ${maj(m, 0.4).toFixed(2)} (p = 0.4)`))
  return (
    <>
      <Svg id="f25mc0" w={380} h={198} label={t(b('自一致性投票：单次正确率高于一半时，采样越多越准；低于一半时反而越来越差', 'Self-consistency voting: above one half per sample, more samples help; below it, they make things worse'))}>
        <Axes f={f} xTicks={[[1, '1'], [5, '5'], [15, '15'], [31, '31']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('采样次数 n', 'Samples n'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('多数答案正确的概率', 'Chance the majority is right'))} anchor="start" />
        <Path pts={line(0.6)} color={col} />
        <Path pts={line(0.4)} color={C.dim} />
        <Dot f={f} x={n} y={maj(n, 0.6)} color={col} r={4} />
        <Dot f={f} x={n} y={maj(n, 0.4)} color={C.dim} />
        <Label x={f.x + f.w + 6} y={py(f, maj(31, 0.6))} s={t(b('单次 0.6', 'p = 0.6'))} anchor="start" size={10} color={col} />
        <Label x={f.x + f.w + 6} y={py(f, maj(31, 0.4))} s={t(b('单次 0.4', 'p = 0.4'))} anchor="start" size={10} />
      </Svg>
      <FigSlider label="$n$" value={n} min={1} max={31} step={2} onChange={setN} readout={readout(n)} widest={[15, 5].map(readout)} />
    </>
  )
}

/** A risk–coverage curve, interactive: answer only the most confident share of questions. Shaped to pass through the
 * worked example: risk 20% at full coverage and 5% at 60%. Illustrative. */
function RiskCoveragePlot({ t }: FigProps) {
  const [cov, setCov] = useState(0.6)
  const col = SIDE_COLOR.comp
  const risk = (x: number) => 0.2 * Math.pow(x, Math.log(0.25) / Math.log(0.6))
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [0, 1], yr: [0, 0.25] }
  const readout = (x: number) => t(b(`只回答 ${Math.round(x * 100)}%：其中答错 ${(risk(x) * 100).toFixed(1)}%`, `answer ${Math.round(x * 100)}%: ${(risk(x) * 100).toFixed(1)}% of those wrong`))
  return (
    <>
      <Svg id="f25mc1" w={380} h={198} label={t(b('选择性回答：只回答信心最高的一部分，错误率随之下降', 'Selective answering: answering only the most confident share lowers the error rate'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.6, '60%'], [1, '100%']]} yTicks={[[0, '0'], [0.05, '5%'], [0.1, '10%'], [0.2, '20%']]} xLabel={t(b('覆盖率：回答的比例', 'Coverage: share answered'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('风险：答错的比例', 'Risk: share wrong'))} anchor="start" />
        <Path pts={trace(f, risk, 0, 1, 120)} color={col} opacity={0.5} />
        <Dot f={f} x={1} y={0.2} color={C.dim} />
        <Label x={px(f, 1) - 6} y={py(f, 0.2) - 10} s={t(b('全部回答：20%', 'answer all: 20%'))} anchor="end" size={10} />
        <Dot f={f} x={cov} y={risk(cov)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('覆盖率', 'Coverage'))} value={cov} min={0.1} max={1} step={0.01} onChange={setCov} readout={readout(cov)} widest={[1, 0.6].map(readout)} />
    </>
  )
}

export const CONTROL_FIGS: TopicFigs = {
  arch: { brain: ControlBrainArch, ai: ReasoningBudgetArch },
  math: {
    bio: {
      0: { Fig: EvcPlot, cap: b('拖动滑块改变信心。答对价值 $10$，答错 $0$，复查代价 $1$；复查能纠正一部分错误，信心越低纠正得越多（取值与小例子一致）。默认信心 $0.6$：不复查 $6$，复查 $8.5 - 1 = 7.5$，值得复查；拖到约 $0.8$ 以上，复查的收益抵不上代价。', 'Drag the slider to change confidence. A right answer is worth $10$, a wrong one $0$, and rechecking costs $1$; rechecking fixes part of the errors, more when confidence is low (set to match the worked example). At the default $0.6$: skipping gives $6$, rechecking $8.5 - 1 = 7.5$, so recheck. Above about $0.8$ the gain no longer covers the cost.') },
      1: { Fig: SpeedAccuracyPlot, cap: b('拖动滑块改变决策界限 $B$，$v = 1$、$\\sigma = 1$。默认 $B = 1$：错误率约 $0.12$，平均用时约 $0.76$。拖到 $B = 2$：错误率降到约 $0.018$，用时约 $1.93$。用时多一倍多，错误减少到约七分之一，这就是用时间换准确。', 'Drag the slider to change the bound $B$, with $v = 1$ and $\\sigma = 1$. At the default $B = 1$: an error rate of about $0.12$ and a mean time of about $0.76$. At $B = 2$: about $0.018$ errors and $1.93$ time. More than twice the time for about a seventh of the errors: trading time for accuracy.') },
    },
    comp: {
      0: { Fig: MajorityPlot, cap: b('拖动滑块改变采样次数 $n$。单条正确率 $0.6$ 时，采 $5$ 次取多数约 $0.68$，$15$ 次约 $0.79$，越采越准。灰线是单条正确率 $0.4$ 的情况：多数答案反而越来越常错。投票只能放大模型本来就偏向的答案。', 'Drag the slider to change the number of samples $n$. With $0.6$ per sample, the majority of $5$ is right about $0.68$ of the time and of $15$ about $0.79$: more samples, more accuracy. The gray line is $0.4$ per sample, where the majority is wrong ever more often. Voting can only amplify the answer the model already leans toward.') },
      1: { Fig: RiskCoveragePlot, cap: b('示意曲线，经过小例子的两个点。拖动滑块改变覆盖率：全部回答时 $20\\%$ 答错；只回答信心最高的 $60\\%$ 时，其中只有 $5\\%$ 答错。覆盖越窄，风险越低，代价是拒答的问题更多。', 'An illustrative curve through the worked example’s two points. Drag the slider to change coverage: answering everything, $20\\%$ are wrong; answering only the most confident $60\\%$, just $5\\%$ of those are wrong. Narrower coverage means lower risk, at the cost of more questions declined.') },
    },
  },
}
