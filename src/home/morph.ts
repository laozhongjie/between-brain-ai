/**
 * Where the white liquid flows (HomeMorph): points on the brain's surface, projected into the brain panel
 * each frame (HomeBrain), and the network's unit positions in the AI panel (HomeAI, layer by layer as in
 * its LAYERS). x, y pairs in panel px; NaN until known.
 */
export const BRAIN_N = 1600
export const AI_LAYERS = [4, 7, 9, 9, 7, 3]
const AI_UNITS = AI_LAYERS.reduce((a, b) => a + b, 0)
export const morphTargets = {
  brain: new Float32Array(BRAIN_N * 2).fill(NaN),
  ai: new Float32Array(AI_UNITS * 2).fill(NaN),
}
