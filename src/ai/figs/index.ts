import { LAYER1_FIGS } from './layer1'
import { LAYER2_FIGS } from './layer2'
import { LAYER3_FIGS } from './layer3'
import { LAYER4_FIGS } from './layer4'
import type { FigPair } from './types'

export const FIGS: Record<string, FigPair> = { ...LAYER1_FIGS, ...LAYER2_FIGS, ...LAYER3_FIGS, ...LAYER4_FIGS }
