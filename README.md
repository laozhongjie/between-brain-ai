<p align="center">
  <img src="docs/logo.svg" width="72" height="72" alt="BETWEEN logo">
</p>

<h1 align="center">B E T W E E N</h1>

<p align="center"><b>between brain and AI</b></p>

<p align="center">
  An interactive atlas that maps how the brain computes onto today's AI, layer by layer,<br>
  and asks what that comparison tells us to build next.
</p>

<p align="center">
  <a href="https://laozhongjie.github.io/between-brain-ai/"><b>Open the live site →</b></a>
  &nbsp;·&nbsp;
  <a href="https://laozhongjie.github.io/between-brain-ai/#/ai">Brain ↔ AI ladder</a>
  &nbsp;·&nbsp;
  <a href="#run-it-locally">Run locally</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&labelColor=0b1019" alt="React 19">
  <img src="https://img.shields.io/badge/three.js-r186-ffffff?style=flat-square&labelColor=0b1019" alt="three.js">
  <img src="https://img.shields.io/badge/TypeScript-6-7dd3fc?style=flat-square&labelColor=0b1019" alt="TypeScript">
  <img src="https://img.shields.io/badge/references-93%2C%20machine--checked-5ee0b5?style=flat-square&labelColor=0b1019" alt="93 references, machine-checked">
  <img src="https://img.shields.io/badge/UI-中文%20%2F%20English-a9b4f5?style=flat-square&labelColor=0b1019" alt="Bilingual">
</p>

<br>

<p align="center"><img src="docs/brain-ai.jpg" alt="A Brain ↔ AI card: the visual system next to CNNs and ViTs, each with a structure diagram"></p>

---

> between brain and AI<br>
> between biology and computation<br>
> between neurons and intelligence<br>
> between memory and decision<br>
> between structure and function<br>
> **between what we understand and what we can build**

---

## Why BETWEEN

Most material on "brain-inspired AI" stops at a metaphor. BETWEEN puts the two side by side at the same level of detail and lets you judge the match yourself.

For every mechanism it shows **how the brain does it**, with equations and a structure diagram, next to **the closest thing in AI**, with its own equations and diagram. Then it says how close the match really is, how settled the neuroscience is, where the two differ, and whether the brain's version is a **principle worth borrowing** or just a **biological constraint** that engineering can ignore. Each card ends with concrete design ideas.

It is built for researchers and engineers who want a map of where AI already matches the brain, where it is ahead, and where the open problems are.

## What's inside

### 1 · The Brain ↔ AI ladder

The core of the project. Five layers, from molecules to a whole agent:

| Layer | Scale | Examples |
|---|---|---|
| 1 · Synapses | nm to µm, ms to years | weights, short-term plasticity, STDP, three-factor learning and credit assignment |
| 2 · Neurons | 10 µm to 1 mm, ms | dendritic computation, spikes and temporal coding, E/I balance, noise, energy |
| 3 · Microcircuits | 0.1 to 1 mm, ms to s | divisive normalisation, predictive coding, attractors, expansion coding |
| 4 · Brain systems | cm, s to days | vision, hearing, movement, language, memory, emotion, reward, sleep, attention |
| 5 · Whole agent | the organism | a humanlike robot-brain blueprint |

Every card carries a correspondence rating (**same principle · similar function · crude substitute · absent**) and an evidence rating, so strong analogies and loose ones are never presented the same way.

### 2 · A robot-brain blueprint

Layer 5 lays out **14 modules** a humanlike agent would need, coloured by how well today's AI covers each one. The world model is one module among many, not the whole answer. A cross-cutting table lists the differences that run through every layer, including the places where AI is already ahead.

### 3 · Interactive labs

Five small simulations you can tune in the browser:

- artificial unit vs LIF vs Izhikevich neurons
- a single neuron computing XOR with its dendrites
- the STDP window and weight evolution
- short-term depression and facilitation
- eligibility traces and delayed reward (three-factor learning)

### 4 · The living brain atlas

A real 3D brain that runs. It exists so every analogy has something concrete to point at: layer-4 cards open the matching system in the atlas, and the atlas links back to the cards.

<p align="center"><img src="docs/atlas-3d.jpg" alt="3D atlas during the near-miss event: pathways light up while the body panel shows heart rate rising"></p>

- **Real anatomy**: FreeSurfer fsaverage with 68 Desikan cortical regions, subcortex, cerebellum and brainstem, plus markers for small nuclei and body organs.
- **Closed-loop dynamics**: a 118-node delay-coupled Wilson–Cowan neural-mass network sets the rhythm of each brain state (alpha awake, beta focused, theta in REM, delta in deep sleep), while 63 real pathways carry event-driven signal pulses hop by hop.
- **A day in the life**: 17 scripted events, from the alarm and a near miss in traffic to a meeting, a run and a night of sleep, each narrated step by step with the body's response.
- **Explore one system**: isolate any of 11 functional systems and step through how it works, input to output.

### 5 · The schematic

The same simulation as a clean 2D circuit diagram: input, the brain's internal loop and output as three zones, functional lanes inside, orthogonal routing where every arrow is audited by tests. Feedforward edges enter from the left, feedback edges come back up from below.

<p align="center"><img src="docs/schematic.jpg" alt="Schematic view: senses on the left, the brain's processing loop in the middle, body outputs on the right"></p>

## Accuracy, stated honestly

- **References are machine-checked.** All 93 references resolve through Crossref or arXiv, and `npm run check-refs` confirms that each DOI or arXiv id exists and that the returned title matches.
- **Uncertainty is labelled.** Each comparison states how settled the underlying neuroscience is.
- **It is a teaching model.** The simulation is illustrative. It is not a validated research model and should not be cited as one.

## Run it locally

```bash
npm install
npm run dev          # dev server
npm test             # unit tests (content, simulation, schematic routing)
npm run build        # production build
npm run check-refs   # verify every reference via Crossref / arXiv (needs network)
```

Every push to `main` builds, tests and deploys to GitHub Pages through `.github/workflows/deploy.yml`.

## How it's built

| Area | Stack |
|---|---|
| App | Vite · React 19 · TypeScript · zustand |
| 3D | three.js · React Three Fiber · drei · postprocessing (bloom) |
| Math and icons | KaTeX · lucide |
| Tests | Vitest |
| Brain model pipeline | Python · MNE · nibabel · scikit-image · trimesh |

```
src/
  ai/          Brain ↔ AI ladder: card content, diagrams, labs, pages
  data/        regions, pathways, functional systems, the scripted day
  sim/         neural-mass model, pulse signals, scenario director
  scene/       3D brain, pathways, pulses, labels, camera
  schematic/   2D layout, orthogonal edge routing
  ui/          panels, timeline, controls
pipeline/      builds the brain mesh from FreeSurfer fsaverage
tests/         content, simulation, tours and schematic routing checks
```

<details>
<summary><b>Rebuilding the brain model</b></summary>

`pipeline/build_brain.py` generates `public/models/brain.glb` and `src/data/region_meta.json`. Both are committed, so this is only needed to change the mesh.

```bash
conda env create -f pipeline/environment.yml
conda run -n brain-atlas python pipeline/build_brain.py
npm run compress-model   # meshopt compression: 6.6 MB → 1.4 MB
```

- Cortex: the fsaverage pial surface, split into 34 regions per hemisphere with the Desikan-Killiany atlas.
- Subcortex: marching cubes on `aseg.mgz` labels.
- The hypothalamus has no separate aseg label and is approximated by an ellipsoid at its anatomical location.
- Coordinates: FreeSurfer surface RAS (mm) → three.js `(R, S, -A) × 0.01`.

</details>

## Credits and licences

- **Brain data**: FreeSurfer `fsaverage` template (via MNE-Python), under the [FreeSurfer Software License](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense). Check its terms before any commercial use.
- **Fonts**: [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (SIL OFL); [MiSans](https://hyperos.mi.com/font/) © Beijing Xiaomi Mobile Software Co., Ltd., used under the MiSans Font IP License Agreement.
- **Icons**: [lucide](https://lucide.dev) (ISC).

<br>

<p align="center"><sub>BETWEEN · between what we understand and what we can build</sub></p>
