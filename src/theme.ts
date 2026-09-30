/** Macaron theme constants shared by canvas/SVG/WebGL code (CSS uses the matching custom properties). */
export const FONT = "'Inter Variable', 'MiSans VF', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif"
export const FONT_MONO = "'JetBrains Mono Variable', 'MiSans VF', ui-monospace, Menlo, monospace"

export const THEME = {
  bg: '#fbf7f2',
  surface: '#fdfbf8',
  text: '#4b423c',
  textDim: '#8f847b',
  textH: '#2f2723',
  accent: '#8c7b6e',
  grid: '#f1eae3',
  axis: '#d4c8bd',
  pink: '#f4a7b9',
  mint: '#a8e6cf',
  lavender: '#d6c8bb',
  lemon: '#fdf3a7',
  peach: '#ffc8a2',
  sky: '#a0d2eb',
}

/** Chart series, validated on the warm light surface (CVD & contrast): coral, teal, honey, mist blue. */
export const SERIES = ['#d95f5f', '#2c9a86', '#c07c10', '#4f86c6'] as const

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

/** Deeper, more saturated version of a pastel: readable as a line or text colour on the light ground. */
export function ink(hex: string, amount = 0.42) {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, Math.min(1, s * 0.85 + 0.25), Math.max(0.2, l * (1 - amount)))
}
