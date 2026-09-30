import { create } from 'zustand'
import type { Lang } from './i18n'

export type ClipAxis = 'none' | 'sagittal' | 'coronal' | 'axial'
export type ColorMode = 'anatomy' | 'system'

export interface ViewState {
  cortexOpacity: number
  explode: number
  clipAxis: ClipAxis
  /** -1..1 across the brain */
  clipOffset: number
  colorMode: ColorMode
  showSubcortex: boolean
  showNuclei: boolean
  showBody: boolean
  showLabels: boolean
  showPathways: boolean
  showPulses: boolean
}

interface Store {
  lang: Lang
  selected: string | null
  hovered: string | null
  view: ViewState
  /** bumps to request a camera reset */
  resetTick: number
  setLang: (l: Lang) => void
  select: (id: string | null) => void
  hover: (id: string | null) => void
  setView: (v: Partial<ViewState>) => void
  resetView: () => void
}

export const useStore = create<Store>((set) => ({
  lang: 'zh',
  selected: null,
  hovered: null,
  view: {
    cortexOpacity: 1,
    explode: 0,
    clipAxis: 'none',
    clipOffset: 0,
    colorMode: 'anatomy',
    showSubcortex: true,
    showNuclei: true,
    showBody: true,
    showLabels: true,
    showPathways: true,
    showPulses: true,
  },
  resetTick: 0,
  setLang: (lang) => set({ lang }),
  select: (selected) => set({ selected }),
  hover: (hovered) => set({ hovered }),
  setView: (v) => set((s) => ({ view: { ...s.view, ...v } })),
  resetView: () => set((s) => ({ selected: null, resetTick: s.resetTick + 1 })),
}))
