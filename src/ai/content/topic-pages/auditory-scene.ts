import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F02 Audition and auditory scene analysis: the auditory pathway and cortex vs speech recognition and source separation models. */
export const AUDITORY_SCENE: TopicContent = {
  thesis: {
    biological: b(
      '耳蜗把声波按频率展开，每根听神经纤维只对一小段频率放电。脑干比较声音到达两耳的时间差和强度差来定位声源，听觉皮层再逐级处理音高、音色和语音。在多人同时说话的场合，人能靠注意跟住其中一个人，并随时切换。',
      'The cochlea spreads sound out by frequency, so each auditory nerve fiber fires for a narrow band. The brainstem compares when and how loud the sound reaches each ear to locate the source, and auditory cortex then processes pitch, timbre and speech. When several people talk at once, attention lets a listener follow one of them and switch at will.'),
    computational: b(
      '语音识别模型（如 Whisper）先把声波转成频谱，再用 Transformer 编码并解码成文字，在大规模多语种数据上训练后对口音和噪声相当稳健。声源分离模型（如 Conv-TasNet）从混合声音中为每个说话人估计一个掩码，把声音拆开。但分离和识别通常是两个独立的模型，要听哪一个人需要外部指定。',
      'Speech recognition models such as Whisper turn the waveform into a spectrogram, then encode it with a transformer and decode it into text. Trained on large multilingual data, they handle accents and noise well. Source separation models such as Conv-TasNet estimate a mask for each speaker to pull a mixture apart. But separation and recognition are usually separate models, and which speaker to follow must be specified from outside.'),
    gap: b(
      '两者都先把声音分解成频率通道。差距在于选择和整合：大脑用双耳线索、注意和预测，在嘈杂环境中选出一个声源；模型的分离、选择和识别是分开设计的。',
      'Both first split sound into frequency channels. The gap lies in selection and integration. The brain uses both ears, attention and prediction to pick one source out of noise, while models design separation, selection and recognition as separate parts.'),
  },
  short: { biological: b('听觉系统', 'Auditory system'), computational: b('语音模型', 'Speech models') },
  kinds: ['behavior', 'representation', 'algorithm'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的主流语音识别与语音分离模型；具体评测结果按发表年份注明。', 'The computational column describes mainstream speech recognition and separation models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('清晰语音的转写', 'Transcribing clear speech'),
      brain: b('专业转写员能准确记下清晰的朗读和对话，错误主要出在生僻词和口误上。', 'Professional transcribers write down clear reading and conversation accurately, with errors mostly on rare words and slips.'),
      ai: b('2022 年的比较中，Whisper 在一组英语录音上的错误率已接近专业转写服务。', 'In a 2022 comparison on a set of English recordings, Whisper came close to professional transcription services in error rate.'),
      gap: b('在清晰语音上两者接近；差距出现在噪声、多人重叠和陌生口音中。', 'The two are close on clear speech. Gaps appear with noise, overlapping talkers and unfamiliar accents.'),
    },
    {
      lead: 'bio',
      dimension: b('跟住一个说话人', 'Following one talker'),
      brain: b('多人同时说话时，靠注意跟住一个人，并能随时切换；双耳的空间线索、对方的音高和语义预测都在帮忙。', 'With several people talking, attention follows one of them and can switch at any time. Spatial cues from two ears, the talker’s pitch and predictions of meaning all help.'),
      ai: b('分离模型能把两三个人的混合语音拆开，但跟住哪一个通常要外部指定；人数未知或混响很强时效果下降。', 'Separation models can split a mixture of two or three voices, but which one to follow is usually specified from outside. Performance drops when the number of talkers is unknown or reverberation is strong.'),
      gap: b('模型能拆开声音，但「选择听谁」这一步不在模型里。', 'Models can pull voices apart, but choosing whom to listen to is not part of the model.'),
    },
    {
      lead: 'mixed',
      dimension: b('声源定位', 'Locating sounds'),
      brain: b('只用两只耳朵，正前方水平方向的定位精度约 1 度；还能借耳廓形状判断上下。', 'With just two ears, horizontal accuracy straight ahead is about 1 degree, and the shape of the outer ear helps tell up from down.'),
      ai: b('多麦克风阵列能同时定位多个声源；只用两个麦克风时，在混响环境中定位较难。', 'Microphone arrays can locate several sources at once. With only two microphones, locating in reverberant rooms is harder.'),
      gap: b('人只用两只耳朵就做得很好；机器可以用更多麦克风换取精度和同时定位多个声源。', 'People do well with two ears. Machines can use more microphones to gain precision and locate several sources at once.'),
    },
    {
      lead: 'bio',
      dimension: b('适应新口音', 'Adapting to a new accent'),
      brain: b('听一个陌生口音大约一分钟后，理解速度就明显提高。', 'After about a minute of an unfamiliar accent, listeners understand it clearly faster.'),
      ai: b('部署后参数固定，对话中不会变好；要适应新口音需要收集数据另外微调。', 'Parameters are fixed after deployment, so the model does not improve during a conversation. Adapting to a new accent needs new data and separate fine-tuning.'),
      gap: b('人在使用中持续适应，模型的适应发生在训练阶段。', 'People keep adapting during use, while models adapt only in training.'),
    },
    {
      lead: 'comp',
      dimension: b('语言广度与吞吐量', 'Language breadth and throughput'),
      brain: b('一次只能听懂一路语音；不懂的语言基本无法转写。', 'A listener follows one stream of speech at a time and can hardly transcribe a language they do not know.'),
      ai: b('一个模型可以转写近百种语言，处理录音的速度远快于实时。', 'One model can transcribe close to a hundred languages and process recordings much faster than real time.'),
      gap: b('在语言覆盖和处理量上，模型远超单个人。', 'In language coverage and volume, models far exceed any single listener.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('耳蜗：按频率展开', 'Cochlea: spreading by frequency'),
        points: [
          b('声波使鼓膜振动，经三块听小骨传到耳蜗里的液体。', 'Sound vibrates the eardrum, and three small bones pass the vibration to the fluid inside the cochlea.'),
          b('耳蜗中的基底膜各处对不同频率共振：靠近入口处对高频，末端对低频。', 'The basilar membrane resonates at different frequencies along its length, high near the entrance and low at the far end.'),
          b('每个位置的内毛细胞把振动转成听神经的电脉冲，所以每根神经纤维只携带一小段频率；低频声音的脉冲还与声波的波峰同步（相位锁定）。', 'Inner hair cells at each place turn the vibration into electrical pulses in the auditory nerve, so each fiber carries a narrow band. For low sounds, the pulses also lock to the peaks of the wave, called phase locking.'),
        ],
      },
      {
        title: b('脑干：比较两只耳朵', 'Brainstem: comparing the ears'),
        points: [
          b('两只耳朵的信号在上橄榄核汇合。', 'Signals from both ears meet in the superior olive.'),
          b('内侧核比较声音到达两耳的时间差，只有几十到几百微秒；外侧核比较两耳的强度差。', 'The medial nucleus compares when the sound reaches each ear, a difference of tens to hundreds of microseconds. The lateral nucleus compares the loudness at each ear.'),
          b('时间差和强度差共同给出声源的左右方位，结果向上送往下丘。', 'Together they give the left to right direction of the source, sent up to the inferior colliculus.'),
        ],
      },
      {
        title: b('下丘与丘脑', 'Inferior colliculus and thalamus'),
        points: [
          b('下丘汇合频率、方位和声音强弱变化的信息。', 'The inferior colliculus combines frequency, direction and changes in loudness.'),
          b('经丘脑的内侧膝状体中转，送到初级听觉皮层 A1。', 'The medial geniculate body of the thalamus relays it to primary auditory cortex, A1.'),
        ],
      },
      {
        title: b('A1：频率地图', 'A1: frequency map'),
        points: [
          b('A1 的神经元按偏好频率排成一张地图（音调拓扑），与耳蜗的排列对应。', 'A1 neurons are laid out by preferred frequency in a map that mirrors the cochlea, called tonotopy.'),
          b('许多神经元还对频率组合和声音强弱的节律变化放电，结果送往颞上回。', 'Many also fire for combinations of frequencies and for rhythmic changes in loudness. The result goes to the superior temporal gyrus.'),
        ],
      },
      {
        title: b('颞上回：语音与声音对象', 'Superior temporal gyrus: speech and sound objects'),
        points: [
          b('这里的神经元对音素、音节等语音单位放电，左半球更偏语言。', 'Neurons here fire for speech units such as phonemes and syllables, with the left hemisphere more tied to language.'),
          b('皮层活动的起伏跟随语音的音节节律（每秒约 4 到 8 个），把连续的声音切成可识别的片段。', 'Cortical activity rises and falls with the syllable rhythm of speech, about 4 to 8 per second, cutting the continuous sound into recognizable pieces.'),
        ],
      },
      {
        title: b('注意与下行调节', 'Attention and descending control'),
        points: [
          b('注意选定一个说话人后，颞上回的活动主要跟随这个人的声音，另一个人的声音被压低。', 'Once attention picks a talker, activity in the superior temporal gyrus mainly follows that voice and the other voice is suppressed.'),
          b('皮层还经下行通路一直调节到耳蜗，改变对不同声音的增益。', 'The cortex also sends descending signals all the way to the cochlea, changing the gain for different sounds.'),
        ],
      },
    ],
    computational: [
      {
        title: b('波形采样', 'Sampling the waveform'),
        points: [
          b('麦克风把气压变化转成电压，每秒采样 16000 次，得到一串数字。', 'A microphone turns air pressure into voltage, sampled 16,000 times per second into a string of numbers.'),
          b('多数语音系统只用一个声道，两耳之间的时间差和强度差不存在。', 'Most speech systems use a single channel, so there are no differences in time or loudness between two ears.'),
        ],
      },
      {
        title: b('频谱或学到的编码', 'Spectrogram or learned encoding'),
        points: [
          b('识别模型每 10 毫秒取一段声音，算出 80 个梅尔频带的能量，得到对数梅尔频谱。', 'A recognition model takes a window of sound every 10 ms and computes the energy in 80 mel bands, giving a log-mel spectrogram.'),
          b('分离模型（如 Conv-TasNet）不用固定的频谱，而用一层学到的卷积直接编码波形。', 'Separation models such as Conv-TasNet skip the fixed spectrogram and encode the waveform with a learned convolution.'),
        ],
      },
      {
        title: b('掩码估计：拆开声音', 'Mask estimation: pulling voices apart'),
        points: [
          b('网络为每个说话人输出一个掩码：在每个时刻、每个通道上给出 $0$ 到 $1$ 的权重。', 'The network outputs one mask per speaker, a weight between $0$ and $1$ for every time and channel.'),
          b('掩码乘上混合声音的编码，再解码回波形，得到每个人单独的声音。', 'Multiplying the mask by the encoded mixture and decoding back gives each speaker’s voice alone.'),
        ],
      },
      {
        title: b('识别编码器', 'Recognition encoder'),
        points: [
          b('频谱经卷积和 Transformer 编码器，每一帧变成一个向量；Whisper 一次处理 30 秒的声音。', 'The spectrogram passes through convolutions and a transformer encoder, turning each frame into a vector. Whisper processes 30 seconds of sound at a time.'),
          b('编码器的输出送给文字解码器。', 'The encoder output goes to the text decoder.'),
        ],
      },
      {
        title: b('文字解码器', 'Text decoder'),
        points: [
          b('解码器用注意力读取编码器输出，一个词元一个词元地生成文字。', 'The decoder reads the encoder output through attention and writes the text one token at a time.'),
          b('同一个解码器也可以输出语言种类、时间戳或翻译。', 'The same decoder can also output the language, timestamps or a translation.'),
        ],
      },
      {
        title: b('缺失的两步（虚线框）', 'The two missing steps (dashed boxes)'),
        points: [
          b('没有双耳线索：单声道输入不含声源的空间位置。', 'No binaural cues: single-channel input carries no spatial location of the source.'),
          b('没有注意选择：模型不会自己决定跟住哪一个说话人。', 'No attentional selection: the model never decides on its own which talker to follow.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('人能听到约 20 赫兹到 2 万赫兹的声音。每侧耳蜗约有 3500 个内毛细胞负责把振动转成神经信号，另有约 1 万多个外毛细胞主动放大微弱的振动。', 'People hear about 20 Hz to 20 kHz. Each cochlea has about 3,500 inner hair cells that turn vibration into nerve signals, plus over ten thousand outer hair cells that actively amplify faint vibrations.'),
      b('外毛细胞的放大是非线性的：弱声放大得多，强声放大得少，所以耳朵能在很大的响度范围内工作。年龄增长和噪声损伤首先损失高频毛细胞。', 'Outer hair cell amplification is nonlinear, boosting faint sounds more than loud ones, so the ear works over a huge range of loudness. Aging and noise damage first destroy high-frequency hair cells.'),
      b('相位锁定在低频最精确，频率升高到几千赫兹后逐渐消失。两耳时间差主要靠这种精确的脉冲时间来计算。', 'Phase locking is most precise at low frequencies and fades above a few kilohertz. Interaural time differences are computed mainly from this precise spike timing.'),
      b('哺乳动物上橄榄核究竟怎样计算时间差仍有争议：经典的 Jeffress 模型假设一排延迟线加巧合检测，而哺乳动物中的数据更支持由抑制精确调节的两路比较。', 'How the mammalian superior olive computes time differences is debated. The classic Jeffress model assumes delay lines and coincidence detection, while mammalian data favor comparisons tuned by precisely timed inhibition.'),
      b('从耳蜗到皮层，每一级都有下行连接，最远一直到外毛细胞，可以在注意时改变耳朵本身的增益。', 'Every stage from cochlea to cortex has descending connections, reaching the outer hair cells, so attention can change the gain of the ear itself.'),
      b('「鸡尾酒会问题」是 1953 年提出的说法，指在多人同时说话时听清一个人；它同时依赖声学分离和注意选择。', 'The cocktail party problem, named in 1953, is hearing one person while many talk at once. It relies on both acoustic separation and attentional selection.'),
      b('「听觉皮层只分析频率」是一种简化：A1 有频率地图，但神经元也对时间调制、声源位置和声音的行为意义放电，注意还能改变它们的反应。', 'Saying that auditory cortex only analyzes frequency is a simplification. A1 has a frequency map, but its neurons also respond to temporal modulation, location and behavioral meaning, and attention changes their responses.'),
    ],
    computational: [
      b('梅尔频带在低频窄、高频宽，仿照人对音高的感知，与耳蜗滤波器的宽度变化趋势相近。', 'Mel bands are narrow at low frequencies and wide at high ones, following perceived pitch, much like the widths of cochlear filters.'),
      b('对数梅尔频谱只保留每个频带的能量，丢掉了相位；而相位正是计算两耳时间差所需的信息。', 'A log-mel spectrogram keeps only band energy and discards phase, the very information needed for interaural time differences.'),
      b('Whisper 用约 68 万小时、带文字的网络录音训练；它在静音或噪声段可能生成录音中没有的句子，这种「幻觉」在 2024 年的研究中被系统记录。', 'Whisper was trained on about 680,000 hours of web audio with transcripts. It can produce sentences absent from the recording during silence or noise, and a 2024 study documented these hallucinations.'),
      b('分离模型训练时不知道输出的第几路对应哪个说话人，所以用「排列不变训练」：对每种对应方式都算一次误差，取最小的那一个。', 'A separation model does not know which output belongs to which speaker, so it uses permutation invariant training: compute the error for every assignment and keep the smallest.'),
      b('「目标说话人提取」需要先给模型一段该说话人的注册语音，相当于由外部告诉模型要听谁。', 'Target speaker extraction first gives the model an enrollment clip of that speaker, which tells it from outside whom to follow.'),
    ],
  },
  bioMath: [
    {
      title: b('耳蜗滤波器：每个位置只放过一小段频率', 'Cochlear filters: each place passes a narrow band'),
      tex: t`\mathrm{ERB}(f) = 24.7\,\Big(\frac{4.37\,f}{1000} + 1\Big)\ \text{Hz}`,
      symbols: [
        { tex: t`f`, meaning: b('滤波器的中心频率，单位赫兹', 'center frequency of the filter, in hertz') },
        { tex: t`\mathrm{ERB}(f)`, meaning: b('等效矩形带宽：这个位置的滤波器能放过多宽的一段频率', 'equivalent rectangular bandwidth: how wide a band the filter at this place lets through') },
      ],
      steps: [
        b('耳蜗的每个位置相当于一个带通滤波器，只对中心频率附近的声音有强反应。', 'Each place in the cochlea acts as a band-pass filter that responds strongly only near its center frequency.'),
        b('用掩蔽实验测出每个滤波器的宽度，再用一条直线拟合宽度与中心频率的关系，就得到这个公式。', 'Masking experiments measure the width of each filter, and a straight line fitted to width against center frequency gives this formula.'),
        b('代入中心频率，算出这个位置的带宽：频率越高，滤波器越宽。', 'Insert a center frequency to get the bandwidth at that place. The higher the frequency, the wider the filter.'),
      ],
      example: b(
        '中心频率 $1000$ 赫兹：$24.7 \\times (4.37 + 1) \\approx 133$ 赫兹。中心频率 $4000$ 赫兹：$24.7 \\times (17.48 + 1) \\approx 456$ 赫兹。频率高了 4 倍，滤波器宽了约 3.4 倍。',
        'At $1000$ Hz: $24.7 \\times (4.37 + 1) \\approx 133$ Hz. At $4000$ Hz: $24.7 \\times (17.48 + 1) \\approx 456$ Hz. Four times the frequency gives about 3.4 times the width.'),
      consequences: [
        b('低频分辨得细、高频分辨得粗，所以低音区相近的音更容易区分；梅尔频谱也采用了同样的不均匀划分。', 'Resolution is fine at low frequencies and coarse at high ones, so nearby low notes are easier to tell apart. The mel spectrogram uses the same uneven division.'),
        b('落在同一个滤波器内的两个声音会相互掩蔽，这是噪声中听不清的一个原因。', 'Two sounds within one filter mask each other, one reason speech is hard to hear in noise.'),
      ],
      limitations: [
        b('真实耳蜗的滤波是非线性的：宽度随声音强弱变化，外毛细胞还会主动放大。', 'Real cochlear filtering is nonlinear. Width changes with level, and outer hair cells actively amplify.'),
        b('公式只描述频率分辨率，不包括相位锁定携带的时间信息。', 'The formula describes frequency resolution only, not the timing carried by phase locking.'),
      ],
    },
    {
      title: b('定位：声音到达两耳的时间差', 'Localization: the time difference between the ears'),
      tex: t`\Delta t(\theta) = \frac{a}{c}\,\big(\theta + \sin\theta\big)`,
      symbols: [
        { tex: t`\theta`, meaning: b('声源偏离正前方的水平角度，用弧度表示', 'horizontal angle of the source from straight ahead, in radians') },
        { tex: t`a`, meaning: b('头部半径，约 $0.0875$ 米', 'head radius, about $0.0875$ m') },
        { tex: t`c`, meaning: b('声速，约 $343$ 米每秒', 'speed of sound, about $343$ m/s') },
        { tex: t`\Delta t`, meaning: b('声音到达两耳的时间差', 'difference in arrival time between the ears') },
      ],
      steps: [
        b('把头近似成一个球。声音从侧面来时，到远侧耳朵要多走一段路：先沿直线到达头的侧面，再绕着球面走一段弧。', 'Treat the head as a sphere. Sound from the side travels farther to the far ear: straight to the side of the head, then around an arc of the sphere.'),
        b('多走的路程是 $a(\\theta + \\sin\\theta)$，除以声速就是时间差。', 'The extra path is $a(\\theta + \\sin\\theta)$, and dividing by the speed of sound gives the time difference.'),
        b('脑干测出 $\\Delta t$ 后，反过来推出 $\\theta$，即声源的方向。', 'The brainstem measures $\\Delta t$ and works back to $\\theta$, the direction of the source.'),
      ],
      example: b(
        '声源在正侧方，$\\theta = \\pi/2$：$\\Delta t = \\tfrac{0.0875}{343}\\,(1.571 + 1) \\approx 0.66$ 毫秒，这是人头能产生的最大时间差。声源偏 1 度，$\\theta \\approx 0.0175$：$\\Delta t \\approx 9$ 微秒。人能分辨约 1 度的方向变化，说明脑干能分辨约 10 微秒的时间差。',
        'A source directly to the side, $\\theta = \\pi/2$: $\\Delta t = \\tfrac{0.0875}{343}\\,(1.571 + 1) \\approx 0.66$ ms, the largest difference a human head produces. A source 1 degree off center, $\\theta \\approx 0.0175$: $\\Delta t \\approx 9$ µs. People resolve about 1 degree, so the brainstem resolves about 10 µs.'),
      consequences: [
        b('最大时间差只有约 0.66 毫秒，远短于一个神经脉冲的持续时间，所以计算必须依靠许多纤维的精确同步。', 'The largest difference is about 0.66 ms, much shorter than a nerve impulse, so the computation must rely on precise timing across many fibers.'),
        b('正前方和正后方的声源时间差相同，所以只靠时间差会前后混淆。', 'Sources straight ahead and straight behind give the same time difference, so time alone confuses front and back.'),
      ],
      limitations: [
        b('真实头部不是球体，耳廓还会按方向改变声音的频谱，这些线索用于判断上下和前后。', 'Real heads are not spheres, and the outer ear changes the spectrum by direction. These cues help with up and down and with front and back.'),
        b('公式只说明时间差是多少，不说明脑干怎样测量它；测量机制仍有争议。', 'The formula gives the size of the difference, not how the brainstem measures it, which is debated.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('对数梅尔频谱：把声波变成按频带排列的能量图', 'Log-mel spectrogram: turning a waveform into a map of band energy'),
      tex: t`S(m,j) = \log\Big(\sum_{k} H_j(k)\,\Big|\sum_{n} x(n)\,w(n - mR)\,e^{-i 2\pi k n / N}\Big|^2\Big),\qquad \mathrm{mel}(f) = 2595\,\log_{10}\!\Big(1 + \frac{f}{700}\Big)`,
      symbols: [
        { tex: t`x(n)`, meaning: b('第 $n$ 个采样点的值', 'value of sample $n$') },
        { tex: t`w(\cdot)`, meaning: b('窗函数，每次只取约 25 毫秒的一段声音', 'window function that takes about 25 ms of sound at a time') },
        { tex: t`m,\;R`, meaning: b('第 $m$ 帧和帧移（10 毫秒）', 'frame $m$ and the hop between frames, 10 ms') },
        { tex: t`k,\;N`, meaning: b('频率分量的编号和总数', 'index and number of frequency components') },
        { tex: t`H_j(k)`, meaning: b('第 $j$ 个梅尔滤波器对频率分量 $k$ 的权重', 'weight of mel filter $j$ on frequency component $k$') },
        { tex: t`S(m,j)`, meaning: b('第 $m$ 帧、第 $j$ 个梅尔频带的对数能量', 'log energy of frame $m$ in mel band $j$') },
      ],
      steps: [
        b('取出第 $m$ 帧的 25 毫秒声音，做傅里叶变换，得到每个频率分量的幅度。', 'Take the 25 ms of sound in frame $m$ and apply a Fourier transform to get the amplitude of each frequency component.'),
        b('平方得到能量，丢掉相位。', 'Square to get energy, discarding phase.'),
        b('用 80 个三角形的梅尔滤波器把相邻分量的能量合并，滤波器中心按梅尔刻度等间隔排列，所以低频密、高频疏。', 'Merge neighboring components with 80 triangular mel filters. Their centers are evenly spaced on the mel scale, so they are dense at low frequencies and sparse at high ones.'),
        b('取对数，让响度的大幅变化压缩到较小的数值范围。', 'Take the logarithm to compress large changes in loudness into a small range of numbers.'),
      ],
      example: b(
        '$1000$ 赫兹对应 $2595 \\log_{10}(1 + 1000/700) \\approx 1000$ 梅尔；$4000$ 赫兹对应约 $2146$ 梅尔。频率高了 4 倍，梅尔值只增加约一倍，所以 1000 到 4000 赫兹之间分到的频带，与 0 到 1000 赫兹之间差不多。',
        '$1000$ Hz maps to $2595 \\log_{10}(1 + 1000/700) \\approx 1000$ mel, and $4000$ Hz to about $2146$ mel. Four times the frequency only about doubles the mel value, so 1000 to 4000 Hz gets about as many bands as 0 to 1000 Hz.'),
      consequences: [
        b('与耳蜗一样，低频分辨细、高频分辨粗，并用对数压缩响度。', 'Like the cochlea, it resolves low frequencies finely and high ones coarsely and compresses loudness logarithmically.'),
        b('频谱可以当作一张图像，用卷积和 Transformer 处理。', 'The spectrogram can be treated as an image and processed with convolutions and transformers.'),
      ],
      limitations: [
        b('丢掉了相位，也就丢掉了计算两耳时间差需要的精细时间信息。', 'Discarding phase also discards the fine timing needed for interaural time differences.'),
        b('滤波器是固定的线性运算，没有外毛细胞那样随响度变化的放大，也没有下行调节。', 'The filters are fixed linear operations, without level-dependent amplification like outer hair cells and without descending control.'),
      ],
    },
    {
      title: b('掩码分离：为每个说话人估计一个权重图', 'Mask separation: a weight map for each speaker'),
      tex: t`\hat{\mathbf{s}}_i = D\big(M_i \odot E(\mathbf{x})\big),\qquad \sum_{i} M_i = 1,\qquad \mathcal{L} = \min_{\pi}\, \sum_{i} \ell\big(\hat{\mathbf{s}}_{\pi(i)}, \mathbf{s}_i\big)`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('混合声音的波形', 'waveform of the mixture') },
        { tex: t`E,\;D`, meaning: b('编码器和解码器，把波形变成内部表示，再变回波形', 'encoder and decoder, from waveform to internal representation and back') },
        { tex: t`M_i`, meaning: b('第 $i$ 个说话人的掩码，每个时刻、每个通道一个 $0$ 到 $1$ 的权重', 'mask of speaker $i$, a weight from $0$ to $1$ for every time and channel') },
        { tex: t`\odot`, meaning: b('逐元素相乘', 'element-wise product') },
        { tex: t`\hat{\mathbf{s}}_i,\;\mathbf{s}_i`, meaning: b('估计出的和真实的第 $i$ 个说话人的声音', 'estimated and true voice of speaker $i$') },
        { tex: t`\pi,\;\ell`, meaning: b('输出与说话人的一种对应方式，以及衡量误差的函数', 'one assignment of outputs to speakers, and the error function') },
      ],
      steps: [
        b('编码器把混合波形变成每个时刻、每个通道一个数的表示。', 'The encoder turns the mixed waveform into one number per time and channel.'),
        b('网络为每个说话人估计一个掩码，所有说话人的掩码在每一点加起来等于 $1$，相当于把每一点的能量分给各个说话人。', 'The network estimates a mask for each speaker. The masks add to $1$ at every point, sharing each point’s energy among the speakers.'),
        b('掩码乘上混合表示，解码回波形，得到每个人的声音。', 'Multiply each mask by the mixed representation and decode back to a waveform for each voice.'),
        b('训练时尝试输出与说话人的每一种对应方式，按误差最小的那一种更新参数（排列不变训练）。', 'In training, try every assignment of outputs to speakers and update by the one with the smallest error, called permutation invariant training.'),
      ],
      example: b(
        '两个人同时说话。某一时刻的某个通道上，A 的声音能量是 B 的 9 倍，理想掩码就是 A 取 $0.9$、B 取 $0.1$；另一处 B 更响，比例就反过来。把所有点按掩码分配后，两路声音就被拆开。',
        'Two people talk at once. At one time and channel, A has nine times B’s energy, so the ideal mask gives A $0.9$ and B $0.1$. Where B is louder, the split reverses. Sharing every point by its mask pulls the two voices apart.'),
      consequences: [
        b('只要两人的声音在大多数点上不同时占优，单个麦克风也能把它们分开。', 'As long as the two voices rarely dominate the same points, a single microphone suffices to separate them.'),
        b('在标准的两人混合测试上，学到编码的分离效果超过了用真实答案构造的理想频谱掩码。', 'On the standard two-speaker test, separation with a learned encoding beat the ideal spectrogram mask built from the true answer.'),
      ],
      limitations: [
        b('输出的几路声音没有身份：模型不知道哪一路是听者想听的人。', 'The outputs carry no identity. The model does not know which one the listener wants.'),
        b('说话人数通常要事先固定；混响强、人数多或声音相似时，掩码难以分开。', 'The number of speakers is usually fixed in advance. Strong reverberation, many talkers or similar voices make masks hard to separate.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('跟听要耗费注意', 'Listening takes effort'),
        text: b('在嘈杂环境中跟住一个人需要持续的注意；噪声越大、说话人越多，理解越差，也越容易疲劳。', 'Following one person in noise takes sustained attention. More noise and more talkers mean poorer understanding and more fatigue.'),
        steps: [6],
      },
      {
        title: b('高频听力随年龄下降', 'High frequencies fade with age'),
        text: b('毛细胞受损后不能再生，年龄增长和噪声暴露首先损失高频听力，在噪声中听清语音会变得更难。', 'Hair cells do not regrow once damaged. Age and noise first take away high frequencies, making speech in noise harder.'),
        steps: [1],
      },
      {
        title: b('前后方向会混淆', 'Front and back get confused'),
        text: b('正前方和正后方的声源两耳时间差相同，头不动时容易判断错前后。', 'Sources straight ahead and behind give the same interaural difference, so front and back are easily confused when the head stays still.'),
        steps: [2],
      },
    ],
    computational: [
      {
        title: b('不会选择听谁', 'No choice of whom to hear'),
        text: b('分离出的几路声音没有身份，跟住哪一个要靠注册语音或其他外部指定。', 'Separated voices carry no identity, and following one needs an enrollment clip or other outside instruction.'),
        steps: [3, 6],
      },
      {
        title: b('丢失空间线索', 'Spatial cues are lost'),
        text: b('单声道输入和只保留能量的频谱都不含两耳时间差，无法借方位把声音分开。', 'Single-channel input and an energy-only spectrogram carry no interaural timing, so voices cannot be separated by direction.'),
        steps: [1, 2],
      },
      {
        title: b('会凭空生成文字', 'Text out of nothing'),
        text: b('2024 年的研究记录到，Whisper 在一部分录音的静音或噪声段生成了录音中不存在的句子。', 'A 2024 study recorded Whisper writing sentences absent from the audio during silence or noise in some recordings.'),
        steps: [5],
      },
      {
        title: b('使用中不会适应', 'No adaptation in use'),
        text: b('部署后参数固定，遇到新口音或新说话人不会越听越好。', 'Parameters are fixed after deployment, so the model does not get better with a new accent or talker.'),
        steps: [4],
      },
    ],
    misreadings: [
      {
        claim: b('分离模型解决了鸡尾酒会问题', 'Separation models solved the cocktail party problem'),
        fact: b('在标准的两人混合数据上分离效果很好；但选择听谁、人数未知和强混响下的稳定分离仍未解决。', 'Separation works very well on standard two-speaker mixtures. Choosing whom to hear and separating reliably with unknown talkers or strong reverberation remain unsolved.'),
      },
    ],
  },
  refs: {
    neuro: ['glasberg1990', 'jeffress1948', 'mills1958', 'grothe2010', 'cherry1953', 'mcdermott2009', 'mesgarani2012', 'giraud2012', 'clarke2004'],
    models: ['kell2018'],
    ai: ['radford2022', 'luo2019', 'yu2017', 'koenecke2024'],
  },
}
