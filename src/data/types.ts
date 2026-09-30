export interface Bi {
  zh: string
  en: string
}

export type Hemi = 'lh' | 'rh'

/** mesh: has geometry in brain.glb; nucleus: small structure shown as a marker; io: sense organ / effector outside the brain */
export type NodeKind = 'mesh' | 'nucleus' | 'io'

export type SystemId =
  | 'visual'
  | 'auditory'
  | 'somatosensory'
  | 'motor'
  | 'language'
  | 'executive'
  | 'default'
  | 'memory'
  | 'emotion'
  | 'reward'
  | 'autonomic'
  | 'arousal'
  | 'relay'
  | 'integration'
  | 'structure'

export type Lobe = 'frontal' | 'parietal' | 'temporal' | 'occipital' | 'limbic' | 'insula' | 'subcortical' | 'brainstem' | 'cerebellum' | 'body'

export interface Link {
  /** base key of the other region (hemisphere is resolved to the same side when possible) */
  key: string
  what: Bi
}

export interface RegionInfo {
  key: string
  name: Bi
  /** short tag such as "M1", "V1", "Broca" */
  abbr?: string
  system: SystemId
  lobe: Lobe
  func: Bi
  inputs: Link[]
  outputs: Link[]
  note?: Bi
}
