# Content licence

The source code of BETWEEN is released under the [MIT License](LICENSE).

The written content and figures are released under the
[Creative Commons Attribution-NonCommercial 4.0 International licence](https://creativecommons.org/licenses/by-nc/4.0/) (CC BY-NC 4.0).
You may copy, share and adapt them for non-commercial purposes, as long as you credit
"BETWEEN by LaoZhongjie", link to <https://github.com/laozhongjie/between-brain-ai> and indicate if changes were made.

Copyright (c) 2026 LaoZhongjie

## What counts as content

- `src/ai/content/`: topic pages, mechanism entries, concept index, guides and their text
- `src/ai/figs/`: architecture diagrams and figures
- the region descriptions, narrated day and tours in `src/data/` (`regions.ts`, `scenario.ts`, `tours.ts`)
- the landing page chapters in `src/home/chapters.ts`
- `docs/`: screenshots, logos and research notes

Everything else in the repository is code under the MIT License.

## Not covered by either licence

These belong to their owners and keep their own terms:

- **Brain model:** `public/models/brain.glb` and `src/data/region_meta.json` are derived from FreeSurfer `fsaverage`
  (via MNE-Python) under the [FreeSurfer Software License](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense).
- **Fonts:** Inter, Jost and JetBrains Mono under the SIL Open Font License; MiSans under the MiSans Font IP License Agreement.
- **Icons:** lucide, under the ISC License.
- **Cited works:** the papers listed in the references belong to their authors and publishers; BETWEEN only cites them.
