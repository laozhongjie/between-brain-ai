/** Dark observatory theme constants shared by canvas/SVG/WebGL code (CSS uses the matching custom properties). */
export const FONT = "'Inter Variable', 'MiSans VF', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif"
export const FONT_MONO = "'JetBrains Mono Variable', 'MiSans VF', ui-monospace, Menlo, monospace"

export const THEME = {
  bg: '#05070b',
  surface: '#0f1520',
  text: '#c9d2df',
  textDim: '#8793a6',
  textH: '#e6ebf2',
  accent: '#7dd3fc',
  grid: 'rgba(170,195,230,0.07)',
  axis: 'rgba(170,195,230,0.22)',
  pink: '#ff8fa8',
  mint: '#5ee0b5',
  lavender: '#a9b4f5',
  lemon: '#e8c267',
  peach: '#f7b08a',
  sky: '#8ab4ff',
}

/** Chart series on the dark surface: ice blue, orange, mint, violet (lab captions name the first two). */
export const SERIES = ['#7dd3fc', '#f7a86a', '#5ee0b5', '#c9a6fa'] as const

function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h / 6, s, l]
}

function hslToHex(h: number, s: number, l: number) {
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    const a = s * Math.min(l, 1 - l)
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/** Brighter, more saturated version of a system colour: reads as a glowing line or text on the dark ground. */
export function ink(hex: string, amount = 0.42) {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, Math.min(1, s * 1.1 + 0.05), Math.min(0.86, l + (1 - l) * amount * 0.35))
}
