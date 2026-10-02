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

export type ViewMode = '3d' | 'schematic'

interface Store {
  lang: Lang
  viewMode: ViewMode
  /** functional-system tour being viewed on its own, or null */
  focus: string | null
  focusStep: number
  selected: string | null
  hovered: string | null
  view: ViewState
  /** bumps to request a camera reset */
  resetTick: number
  setLang: (l: Lang) => void
  setViewMode: (m: ViewMode) => void
  select: (id: string | null) => void
  hover: (id: string | null) => void
  setView: (v: Partial<ViewState>) => void
  resetView: () => void
  /** camera back home, view settings untouched */
  homeCamera: () => void
}

/** View settings at start, restored by Reset view. */
const DEFAULT_VIEW: ViewState = {
  cortexOpacity: 0.3,
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
}

export const useStore = create<Store>((set) => ({
  lang: 'zh',
  viewMode: '3d',
  focus: null,
  focusStep: 0,
  selected: null,
  hovered: null,
  view: DEFAULT_VIEW,
  resetTick: 0,
  setLang: (lang) => set({ lang }),
  setViewMode: (viewMode) => set({ viewMode }),
  select: (selected) => set({ selected }),
  hover: (hovered) => set({ hovered }),
  setView: (v) => set((s) => ({ view: { ...s.view, ...v } })),
  // camera back home and every view setting back to its default
  resetView: () => set((s) => ({ selected: null, view: DEFAULT_VIEW, resetTick: s.resetTick + 1 })),
  homeCamera: () => set((s) => ({ resetTick: s.resetTick + 1 })),
}))
