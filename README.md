<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-white.svg">
    <img src="docs/logo-black.svg" width="72" height="72" alt="BETWEEN logo">
  </picture>
</p>

<h1 align="center">B E T W E E N</h1>

<p align="center"><b>between brain and AI</b></p>

<p align="center">
  An interactive, bilingual atlas that places the living brain and current AI systems side by side:<br>
  a simulated 3D brain, a circuit schematic of the same model, and a referenced comparison library.
</p>

<p align="center">
  <a href="https://laozhongjie.github.io/between-brain-ai/"><b>Open the live site</b></a>
  &nbsp;·&nbsp;
  <a href="https://laozhongjie.github.io/between-brain-ai/#/atlas">Brain atlas</a>
  &nbsp;·&nbsp;
  <a href="https://laozhongjie.github.io/between-brain-ai/#/ai">Brain &amp; AI</a>
  &nbsp;·&nbsp;
  <a href="#run-locally">Run locally</a>
  &nbsp;·&nbsp;
  <a href="#中文简介">中文简介</a>
</p>

<p align="center">
  <a href="https://github.com/laozhongjie/between-brain-ai/actions/workflows/deploy.yml"><img src="https://github.com/laozhongjie/between-brain-ai/actions/workflows/deploy.yml/badge.svg" alt="Test and deploy"></a>
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&labelColor=0b1019" alt="React 19">
  <img src="https://img.shields.io/badge/three.js-r186-ffffff?style=flat-square&labelColor=0b1019" alt="three.js r186">
  <img src="https://img.shields.io/badge/TypeScript-6-7dd3fc?style=flat-square&labelColor=0b1019" alt="TypeScript 6">
  <img src="https://img.shields.io/badge/references-471%2C%20machine--checked-5ee0b5?style=flat-square&labelColor=0b1019" alt="471 references, machine-checked">
  <img src="https://img.shields.io/badge/UI-中文%20%2F%20English-a9b4f5?style=flat-square&labelColor=0b1019" alt="Chinese and English UI">
</p>

<br>

<p align="center"><img src="docs/screenshots/home.jpg" alt="BETWEEN landing page: the split-disc logo between Brain (86 billion neurons, 20 W) and AI"></p>

> between synapses and weights<br>
> between neurons and units<br>
> between microcircuits and modules<br>
> between brain systems and AI architectures<br>
> between an organism and an agent<br>
> **between what we understand and what we can build**

## Overview

BETWEEN is a client-side web application for studying how biological and artificial systems solve the same problems. It has two connected sections that share one design language and one running simulation:

| Section | What it is | Route |
| --- | --- | --- |
| **Brain atlas** | A live neural-mass simulation of the whole brain, shown as a 3D anatomical model or as a 2D circuit schematic, driven by a narrated day in the life | `#/atlas` |
| **Brain & AI** | A comparison library: each topic sets one biological system against one computational system, with architecture diagrams, equations, limits and evidence levels | `#/ai` |

The landing page (`#/`) opens the split-disc mark into the two worlds and steps through five chapters, one scroll, swipe or key press per chapter. Every page is available in Chinese and English and works on desktop and phones, every formula is typeset with KaTeX, and every scientific claim in the comparison library points to a reference whose DOI or arXiv identifier is verified automatically.

### At a glance

| | |
| --- | --- |
| Functional domains / topics | **9** domains, **26** written topic pages |
| Mechanism index | **17** entries (M01 to M17) in **5** groups by what the mechanism computes, from synapses to circuits |
| Cross-domain topics | **3**: sleep and offline processing, efficiency and physical resources, a blueprint for a humanlike agent |
| AI concept index | **72** AI terms (attention, KV cache, RAG, RLHF, …) mapped back to brain mechanisms |
| Interactive labs | **5**, inside their mechanism entries: neuron models, dendritic XOR, STDP, short-term plasticity, three-factor learning |
| References | **471**, in a searchable reference index, identifiers checked against Crossref and arXiv |
| Simulation graph | **118** nodes, **63** pathway definitions (**111** directed pathways after expanding hemispheres) |
| Guided content | **11** system tours, a **17**-event narrated day |

## Brain atlas

<p align="center"><img src="docs/screenshots/atlas-3d.jpg" alt="3D brain atlas at 07:03: the alarm event sends pulses along auditory and motor pathways while the body panel reports heart rate and neuromodulator levels"></p>

<p align="center"><sub>3D anatomy at 07:03, as the alarm goes off: pulses run along the auditory and motor pathways, the body panel tracks heart rate, breathing and neuromodulators.</sub></p>

<p align="center"><img src="docs/screenshots/schematic.jpg" alt="2D schematic: senses on the left, the brain's processing loop in the middle grouped into functional lanes, body outputs on the right"></p>

<p align="center"><sub>The same network as a circuit diagram: senses on the left, processing lanes in the middle, body outputs on the right.</sub></p>

- **Anatomy.** The 3D model is derived from the FreeSurfer `fsaverage` template with the Desikan–Killiany cortical parcellation (68 regions), plus subcortical structures, cerebellum, brainstem, nuclei and body organs. The cortex is rendered as glass so that deep structures stay visible.
- **Dynamics.** A delay-coupled Wilson–Cowan neural-mass model runs over every node, and event-driven pulses travel hop by hop along pathways. Global state (sleep stage, neuromodulators, heart rate, breathing, virtual EEG) feeds back into the network.
- **Narrative.** A scripted day runs from the last REM dream before the alarm, through work, learning, exercise and social contact, back to sleep. Each event fires its pathways and writes an explanation to the narration log.
- **Focus mode.** Eleven tours (vision, hearing, touch, movement, language, memory, fear, reward, homeostasis, sleep, attention) isolate one system and walk through it step by step.
- **Controls.** Cortex opacity, hemisphere separation, sagittal / coronal / axial sections, anatomy or function colouring, layer toggles, playback speed and a clickable timeline.
- **Schematic.** Every edge is routed orthogonally (feedforward into a node's left edge, feedback along the bottom) and a test audits each route so that no line crosses a node.
- **Phones.** The brain is framed between the narration and the timeline, the view controls and body panel open as drawers from the top bar, the timeline becomes a thin scrubber of event dots, and the scene follows touch (one finger rotates, two fingers zoom).

## Brain & AI

<p align="center"><img src="docs/screenshots/ai-overview.jpg" alt="Brain and AI overview: the reading guide for correspondence types and evidence levels, followed by the functional domains and their topics"></p>

Each topic page follows the same structure, so any two topics can be read the same way:

1. **Core finding.** One paragraph per side and the key gap between them.
2. **Capabilities.** A face-off on concrete dimensions; a tint marks the side that does better on each.
3. **Architecture and information flow.** Each system as a diagram beside its numbered steps, the brain first, then the AI system, with a shared legend for feedforward, feedback and memory access.
4. **Mathematical models.** The governing equations, a symbol table, worked examples and, where useful, an interactive figure.
5. **Limits and popular claims.** What each side cannot do, and common claims checked against the evidence.
6. **Evidence.** Grouped references, each correspondence labelled by type (behaviour, representation, algorithm, math, implementation) and by evidence level (established, debated, speculative).

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/ai-topic.jpg" alt="Topic page for visual recognition: ventral and dorsal streams compared with CNNs and ViTs, with core finding, key gap and capability face-off"></td>
    <td width="50%"><img src="docs/screenshots/ai-architecture.jpg" alt="Architecture diagrams: retina to IT and parietal cortex beside image to CNN and ViT, with numbered steps"></td>
  </tr>
  <tr>
    <td align="center"><sub>Core finding and capability face-off</sub></td>
    <td align="center"><sub>Architecture: diagram beside numbered steps</sub></td>
  </tr>
</table>

<p align="center"><img src="docs/screenshots/ai-math.jpg" alt="Mathematical model card: the Gabor filter equation for a V1 simple cell, a symbol table, and an interactive figure with a stripe-angle slider"></p>

<p align="center"><sub>A model card: equation, symbols, an interactive tuning curve and a worked example.</sub></p>

The seventeen **mechanism entries** (connections and transmission, learning rules, single neurons, circuit computations, population codes) use a leaner template: a definition with its scale and timescale, a figure with numbered steps, the closest computational counterpart, the equations with small simulations behind the worked examples, the conditions under which it holds, and the topics where it does its work. Equations another page already teaches are linked rather than repeated, and the five interactive labs live inside the entries they illustrate. A **reference index** (`#/ai/refs`) lists every source and where it is cited.

### Routes

```text
#/ai                 overview and directories
#/ai/at/:section     overview scrolled to a domain, group or section
#/ai/topic/:id       functional or cross-domain topic page
#/ai/card/:id        mechanism entry
#/ai/concepts        searchable AI concept index
#/ai/refs            reference index
#/ai/blueprint       the humanlike agent blueprint (topic X03)
#/ai/lab/:id         the mechanism entry that holds this lab, at the lab
```

## On phones

<table>
  <tr>
    <td width="33%"><img src="docs/screenshots/phone-home.jpg" alt="Landing page on a phone: the first chapter, between synapses and weights, with the brain window above and the AI network below"></td>
    <td width="33%"><img src="docs/screenshots/phone-atlas.jpg" alt="3D atlas on a phone: narration above the brain, playback controls and a thin event timeline below"></td>
    <td width="33%"><img src="docs/screenshots/phone-ai.jpg" alt="Topic page on a phone: core findings for the ventral and dorsal streams and for CNNs and ViTs, stacked"></td>
  </tr>
  <tr>
    <td align="center"><sub>Landing page: brain above, AI below</sub></td>
    <td align="center"><sub>3D atlas with a thin event timeline</sub></td>
    <td align="center"><sub>Topic pages stack their two sides</sub></td>
  </tr>
</table>

On a portrait phone the landing page's mark turns a quarter and opens into a brain window above an AI window. The atlas keeps both views, with drawers for the view controls and body panel; the Brain & AI pages stack their two columns, scroll wide formulas sideways and keep the directory in a drawer at the left edge.

## Architecture

```mermaid
flowchart LR
  subgraph data["src/data"]
    regions["regions · nodes"]
    pathways["pathways"]
    scenario["scenario · tours"]
  end
  subgraph sim["src/sim · every frame"]
    director["director<br>day script, narration"]
    engine["engine<br>Wilson–Cowan network,<br>brain state, EEG"]
    signals["signals<br>pulses along pathways"]
  end
  subgraph views["views"]
    scene["3D scene<br>React Three Fiber"]
    schematic["2D schematic<br>SVG + overlay"]
    panels["panels<br>body, EEG, narration"]
  end
  scenario --> director
  regions --> engine
  pathways --> signals
  director --> engine
  director --> signals
  engine --> scene & schematic & panels
  signals --> scene & schematic
```

- **Client only.** A Vite + React 19 + TypeScript single-page app with a small hash router; it deploys as static files and works under any sub-path.
- **One simulation, two views.** The simulation starts once and keeps running whichever view is visible. Hot per-frame data lives in typed arrays read inside `useFrame` / `requestAnimationFrame`, so the animation never goes through React state.
- **Content as data.** Topics, cards, figures, references and labs are typed TypeScript modules. Tests enforce unique ids, resolvable links, a figure for every card, that every reference is cited, that every formula renders, and that no text contains a dash.
- **Bilingual by construction.** Every user-facing string is a `{ zh, en }` pair; math inside text is written as `$…$` and rendered by KaTeX.

| Layer | Technology |
| --- | --- |
| UI | React 19, zustand, lucide icons |
| 3D | three.js, React Three Fiber, drei, postprocessing (bloom) |
| Math | KaTeX |
| Build and test | Vite, TypeScript, Vitest, Oxlint |
| Mesh pipeline | Python, MNE-Python, FreeSurfer `fsaverage`, glTF with meshopt compression |
| Hosting | GitHub Pages via GitHub Actions |

## Run locally

Requires Node.js 24.

```bash
npm ci
npm run dev          # start the Vite dev server
npm test             # run the Vitest suites
npm run lint         # run Oxlint
npm run build        # type-check and build to dist/
npm run check-refs   # verify every DOI / arXiv reference (needs network)
```

Every push to `main` runs the tests, builds the site and deploys `dist/` to GitHub Pages (`.github/workflows/deploy.yml`).

## Project structure

```text
src/
  ai/          Brain & AI content, topic pages, figures and labs
  data/        regions, nodes, pathways, tours and the narrated day
  sim/         neural-mass engine, pulses, brain state and scenario director
  scene/       3D brain, labels, pathways, pulses and camera
  schematic/   2D layout and orthogonal edge routing
  home/        landing page
  ui/          controls, narration, timeline, panels and shared components
  store.ts     shared application state
  i18n.ts      Chinese / English interface strings
pipeline/      brain mesh generation from FreeSurfer fsaverage
public/        committed brain model and static assets
tests/         content, text, simulation, tour and schematic routing checks
docs/          logos and screenshots
```

### Rebuilding the brain model

`pipeline/build_brain.py` generates `public/models/brain.glb` and `src/data/region_meta.json`. Both are committed; regenerate them together only when changing the anatomy or the mesh.

```bash
conda env create -f pipeline/environment.yml
conda run -n brain-atlas python pipeline/build_brain.py
npm run compress-model
```

## Accuracy and scope

- Reference identifiers are checked against Crossref or arXiv. A successful check confirms the identifier and its title, not that every scientific claim is settled.
- Every comparison carries an evidence label and states where the analogy is debated or speculative.
- Anatomy, pathways and dynamics are simplified for teaching. The simulation illustrates mechanisms; it is not a validated research model and makes no clinical or anatomical predictions.

## 中文简介

BETWEEN 是一个中英双语的交互式图谱，把大脑和当前的 AI 系统放在一起对照。

- **大脑图谱**：基于 FreeSurfer `fsaverage` 的 3D 大脑和同一网络的 2D 电路示意图，共用一个实时运行的 Wilson–Cowan 神经质量模型。一天的剧本从黎明前的梦境开始，事件触发通路上的信号脉冲，旁白逐条解释正在发生什么；11 个系统导览可以单独查看视觉、听觉、记忆、恐惧等系统。
- **大脑与 AI**：9 个功能领域、26 个功能主题，每个主题把一个具体的生物系统和一个具体的计算系统逐项对照，包括核心结论、能力对照、架构与信息流、数学模型、局限与常见误读、证据等级。另有 17 个机制条目（5 个交互实验嵌在其中）、3 个综合专题（含类人智能体蓝图）、72 个 AI 概念的反查入口和文献索引。全部 471 条参考文献的 DOI / arXiv 编号由脚本自动核验。
- **首页与手机**：首页从分裂圆盘商标展开，一次滚动或滑动翻一章。网站适配手机竖屏：首页改为上下两个窗口，图谱的面板改为抽屉，时间轴变成细长的进度条。

在线访问：<https://laozhongjie.github.io/between-brain-ai/>

## Licence

The code is released under the [MIT License](LICENSE). The written content and figures (topic pages, mechanism entries, diagrams, narration and screenshots) are released under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): share and adapt them for non-commercial purposes with credit. [LICENSE-CONTENT.md](LICENSE-CONTENT.md) lists exactly what is covered and the third-party parts that keep their own terms.

代码采用 MIT 许可证；专题文字、示意图、旁白和截图采用 CC BY-NC 4.0，可在注明出处的前提下非商业转载与改编。

## Credits and licences

- **Brain data:** FreeSurfer `fsaverage` via MNE-Python, under the [FreeSurfer Software License](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense). Check its terms before commercial use.
- **Fonts:** [Inter](https://rsms.me/inter/), [Jost](https://indestructibletype.com/Jost.html) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) under the SIL Open Font License; [MiSans](https://hyperos.mi.com/font/) under the MiSans Font IP License Agreement.
- **Icons:** [lucide](https://lucide.dev) (ISC).

<br>

<p align="center"><sub>BETWEEN · between what we understand and what we can build</sub></p>
