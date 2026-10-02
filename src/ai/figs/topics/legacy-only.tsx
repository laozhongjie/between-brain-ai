import { legacyFig } from '../layer4'
import type { TopicFigs } from '../types'

/** Topics whose own figures are still to be drawn: only the old system-card figures, kept next to an equation. */

export const INTEROCEPTION_FIGS: TopicFigs = {
  math: {
    bio: { 0: legacyFig('sys-homeostasis', 'brain') },
    comp: { 0: legacyFig('sys-homeostasis', 'ai') },
  },
}

export const LANGUAGE_FIGS: TopicFigs = {
  math: { bio: { 0: legacyFig('sys-language', 'brain') }, comp: { 0: legacyFig('sys-language', 'ai') } },
}
