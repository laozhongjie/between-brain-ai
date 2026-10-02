import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Two objects compete in visual cortex; a prefrontal goal raises the gain of one, the thalamus gates the senses, salient stimuli capture, the winner enters working memory. */
function AttentionBrainArch({ t }: FigProps) {
  const id = 'f22b'
  return (
    <Svg id={id} w={380} h={256} label={t(b('选择性注意的结构与信息流：视觉皮层中的竞争、前额叶的目标、增益调节、丘脑网状核、上丘与顶叶的捕获、工作记忆', 'Selective attention: competition in visual cortex, prefrontal goal, gain modulation, thalamic reticular nucleus, capture by colliculus and parietal cortex, working memory'))}>
      <Mod x={30} y={14} w={154} h={40} side="bio" label={t(b('前额叶与额叶眼区', 'Prefrontal cortex, FEF'))} sub={t(b('保持当前目标', 'holds the current goal'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('上丘与顶叶', 'Colliculus and parietal'))} sub={t(b('显著刺激自动吸引注意', 'salient stimuli capture'))} size={10.5} />
      <Region x={40} y={80} w={334} h={90} side="bio" label={t(b('视觉皮层', 'Visual cortex'))} />
      <Var cx={150} cy={126} r={15} side="bio" label="A" />
      <Var cx={230} cy={126} r={15} side="bio" label="B" />
      <line x1={166} y1={122} x2={214} y2={122} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={166} y1={130} x2={214} y2={130} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={236} y={156} s={t(b('相互抑制，争夺处理', 'mutual inhibition, competing'))} size={9} color={C.dim} />
      <Mod x={14} y={200} w={170} h={40} side="bio" label={t(b('丘脑网状核', 'Thalamic reticular nucleus'))} sub={t(b('感觉通道的闸门', 'gate of the sensory channels'))} size={10.5} />
      <Mod x={196} y={200} w={170} h={40} side="bio" label={t(b('工作记忆', 'Working memory'))} sub={t(b('胜出的信息被处理和报告', 'the winner is processed, reported'))} size={10.5} />

      <Flow id={id} side="bio" kind="fb" pts={[[107, 54], [107, 126], [135, 126]]} label={t(b('提高增益', 'raises gain'))} lx={30} ly={-8} />
      <Flow id={id} side="bio" pts={[[300, 54], [300, 126], [245, 126]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[22, 54], [22, 200]]} />
      <Flow id={id} side="bio" pts={[[70, 200], [70, 170]]} label={t(b('感觉输入', 'sensory input'))} lx={34} ly={0} />
      <Flow id={id} side="bio" pts={[[150, 141], [150, 184], [281, 184], [281, 200]]} label={t(b('胜出者', 'winner'))} at={1} ly={-6} />
      <Num x={30} y={14} n={2} side="bio" />
      <Num x={196} y={14} n={5} side="bio" />
      <Num x={364} y={92} n={1} side="bio" />
      <Num x={107} y={68} n={3} side="bio" />
      <Num x={14} y={200} n={4} side="bio" />
      <Num x={196} y={200} n={6} side="bio" />
    </Svg>
  )
}

/** Token vectors give queries, keys and values; attention weights sum the values in many heads; a router sends each token to a few experts. */
function TransformerAttentionArch({ t }: FigProps) {
  const id = 'f22c'
  return (
    <Svg id={id} w={380} h={300} label={t(b('Transformer 注意力与路由的结构与信息流：词元向量、查询键值、注意力权重、多头、混合专家路由', 'Transformer attention and routing: token vectors, queries, keys and values, attention weights, heads, expert routing'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('词元向量', 'Token vectors'))} sub={t(b('所有词元并排放在上下文中', 'every token side by side in the context'))} size={10.5} />
      <Mod x={14} y={72} w={108} h={40} side="comp" label={t(b('查询 Q', 'Query Q'))} sub={t(b('要找什么', 'what to look for'))} size={10.5} />
      <Mod x={136} y={72} w={108} h={40} side="comp" label={t(b('键 K', 'Key K'))} sub={t(b('我是什么', 'what I am'))} size={10.5} />
      <Mod x={258} y={72} w={108} h={40} side="comp" label={t(b('值 V', 'Value V'))} sub={t(b('携带的内容', 'what I carry'))} size={10.5} />
      {/* several heads: copies stacked behind the attention module */}
      <rect x={26} y={128} width={230} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.4} strokeWidth={1} />
      <rect x={20} y={133} width={230} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.6} strokeWidth={1} />
      <Mod x={14} y={138} w={230} h={40} side="comp" label={t(b('注意力权重', 'Attention weights'))} sub={t(b('点积，softmax，再加权求和', 'dot products, softmax, weighted sum'))} size={10.5} />
      <T x={270} y={133} s={t(b('多头并行', 'heads in parallel'))} size={9} color={C.skyD} anchor="start" />
      <Mod x={14} y={200} w={230} h={40} side="comp" label={t(b('混合专家路由', 'Mixture-of-experts routing'))} sub={t(b('每个词元只送进少数专家', 'each token goes to a few experts'))} size={10.5} />
      <Var cx={282} cy={220} side="comp" label="E1" />
      <Var cx={318} cy={220} side="comp" label="E2" />
      <circle cx={354} cy={220} r={13} fill="none" stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={354} y={220} s="E3" size={9.5} color={C.dim} />
      <Gap x={14} y={256} w={352} h={32} label={t(b('自上而下的目标信号与容量瓶颈', 'Top-down goal signal and a capacity bottleneck'))} />

      <Flow id={id} side="comp" pts={[[68, 50], [68, 72]]} />
      <Flow id={id} side="comp" pts={[[190, 50], [190, 72]]} />
      <Flow id={id} side="comp" pts={[[312, 50], [312, 72]]} />
      <Flow id={id} side="comp" pts={[[68, 112], [68, 138]]} />
      <Flow id={id} side="comp" pts={[[190, 112], [190, 138]]} />
      <Flow id={id} side="comp" pts={[[312, 112], [312, 158], [244, 158]]} />
      <Flow id={id} side="comp" pts={[[129, 178], [129, 200]]} />
      <Flow id={id} side="comp" pts={[[244, 220], [269, 220]]} />
      <Flow id={id} side="comp" pts={[[244, 212], [308, 209]]} curve={[278, 186]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={72} n={2} side="comp" />
      <Num x={14} y={138} n={3} side="comp" />
      <Num x={256} y={133} n={4} side="comp" />
      <Num x={14} y={200} n={5} side="comp" />
      <Num x={14} y={256} n={6} side="comp" />
    </Svg>
  )
}

export const ATTENTION_FIGS: TopicFigs = {
  arch: { brain: AttentionBrainArch, ai: TransformerAttentionArch },
  math: { bio: { 0: legacyFig('sys-attention', 'brain') }, comp: { 0: legacyFig('sys-attention', 'ai') } },
}
