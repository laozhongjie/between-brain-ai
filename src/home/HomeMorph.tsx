import { useEffect, useRef } from 'react'
import { homeState } from './chapters'
import { AI_LAYERS, BRAIN_N, morphTargets } from './morph'

const FIELD_RES = 0.5 // structure field resolution, relative to CSS px

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

/*
 * Per pixel (CSS px, y down). uField holds where the structures are: the brain's silhouette (left) and the
 * network's links and units (right). The liquid runs out from the slit (uWave, fractions of a panel) and
 * only along the structures, reaching their parts sooner and in surges; behind its crest it thins, breaks
 * into beads and is gone, leaving the real brain | AI showing. Ahead of it the window is still dark. At the
 * slit sits the white mass of the mark (uMass), its edge starting to wobble as it drains. Each half has its
 * own noise. Shaded from the thickness field: a meniscus at the rim, a highlight where the surface tilts,
 * translucent where thin; level liquid is exactly the mark's white, so the hand-over is seamless.
 */
const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uCanvas;   // canvas size, device px
uniform vec2 uStage;    // stage size, CSS px
uniform vec2 uC;        // disc centre, CSS px
uniform float uGap, uPW, uWave, uMass, uWobble, uTime;
out vec4 outColor;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + 1.0), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int k = 0; k < 4; k++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}
float field(vec2 p) {
  vec2 uv = p / uStage, o = 3.0 / uStage;
  float s = 0.0;
  for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++) s += texture(uField, uv + vec2(i, j) * o).r;
  return s / 9.0;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uCanvas.y - gl_FragCoord.y) * (uStage.x / uCanvas.x);
  vec2 v = p - uC;
  if (abs(v.x) < uGap) { outColor = vec4(0.0); return; }   // the slit
  float side = sign(v.x);
  vec2 seed = vec2(side * 31.7, side * 12.3);                // each half flows on its own
  float q = (abs(v.x) - uGap) / uPW;                         // out from the slit, fraction of a panel

  float st = smoothstep(0.12, 0.5, field(p));               // on a structure
  float n = fbm(p / 120.0 + seed + vec2(side * uTime * 0.06, uTime * 0.04));
  // surges: the liquid runs ahead and falls back, differently along each row
  float surge = 0.035 * sin(uTime * 1.9 + p.y * 0.021 + side * 2.0) + 0.02 * sin(uTime * 3.3 + p.y * 0.05);
  float T = q * (1.0 - 0.3 * st) + 0.07 * (n - 0.5) - surge * st;
  float local = uWave - T;                                    // how far behind the front this point is

  float B = 0.2 + 0.06 * (n - 0.5);
  float crest = smoothstep(0.0, 0.015, local) * (1.0 - smoothstep(B * 0.45, B, local));
  float tail = smoothstep(B * 0.45, B, local) * (1.0 - smoothstep(B, B * 1.6, local));
  float beads = smoothstep(0.6, 0.72, fbm(p / 10.0 + vec2(-side * uTime * 0.5, uTime * 0.15) + seed));
  float h = max(crest * st, tail * beads * st * 0.9);

  // the mark's white mass at the slit
  float d = length(v);
  float edge = uMass * (1.0 + 0.25 * uWobble * (fbm(vec2(atan(v.y, abs(v.x)) * 3.0, uTime * 0.2) + seed) - 0.5));
  h = max(h, 1.0 - smoothstep(edge - 1.5, edge + 1.5, d));

  // surface: ripples running outward on the moving liquid, then light from the slope
  float hh = h + 0.12 * crest * fbm(p / 26.0 + vec2(-side * uTime * 0.6, uTime * 0.2) + seed);
  vec2 grad = vec2(dFdx(hh), dFdy(hh)) * 7.0;
  vec3 nrm = normalize(vec3(-grad.x, grad.y, 1.0));
  vec3 L = normalize(vec3(-0.45, 0.55, 0.7));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float diff = max(dot(nrm, L), 0.0) / L.z;                  // 1 where level
  float spec = max(pow(max(dot(nrm, H), 0.0), 60.0) - pow(H.z, 60.0), 0.0);
  float thick = smoothstep(0.3, 0.75, h);                    // thin at the rim: a darker meniscus
  vec3 col = vec3(0.961) * clamp(diff, 0.6, 1.15) * mix(0.7, 1.0, thick) + 0.5 * spec;
  float a = smoothstep(0.3, 0.42, h) * mix(0.7, 1.0, thick);

  // ahead of the front the window is still dark
  float dark = 1.0 - smoothstep(-0.006, 0.006, local);
  vec3 cover = vec3(0.052, 0.058, 0.07);
  outColor = vec4(col * a + cover * dark * (1.0 - a), a + dark * (1.0 - a));   // premultiplied
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh))
  return sh
}

/**
 * The white halves of the split disc turning into brain | AI as a flowing white liquid. As the window
 * opens, the white drains from the mark and runs along the structures (FRAG): over the brain's silhouette
 * to the left, along the network's links to the right, leaving the real brain | AI washed clean behind
 * it. The structure field is drawn here each frame from morphTargets (the brain's surface points as
 * HomeBrain projects them, the network's units as HomeAI lays them out). Clipped to the growing disc in
 * CSS (.home-morph).
 */
export function HomeMorph() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const gl = cv.getContext('webgl2', { premultipliedAlpha: true, antialias: false })
    if (!gl) return
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const u = (name: string) => gl.getUniformLocation(prog, name)
    const U = {
      canvas: u('uCanvas'), stage: u('uStage'), c: u('uC'), gap: u('uGap'), pw: u('uPW'),
      wave: u('uWave'), mass: u('uMass'), wobble: u('uWobble'), time: u('uTime'),
    }
    // the structure field: white where the brain | network are, on black
    const fcv = document.createElement('canvas')
    const fx = fcv.getContext('2d')!
    let raf = 0
    let shown = false

    const drawField = (w: number, h: number, gap: number) => {
      if (fcv.width !== Math.round(w * FIELD_RES) || fcv.height !== Math.round(h * FIELD_RES)) {
        fcv.width = Math.round(w * FIELD_RES)
        fcv.height = Math.round(h * FIELD_RES)
      }
      fx.setTransform(FIELD_RES, 0, 0, FIELD_RES, 0, 0)
      fx.globalCompositeOperation = 'source-over'
      fx.fillStyle = '#000'
      fx.fillRect(0, 0, w, h)
      // brain: soft dots on its surface points pile up into its silhouette (left panel starts at 0)
      fx.globalCompositeOperation = 'lighter'
      fx.fillStyle = 'rgba(255,255,255,0.4)'
      const B = morphTargets.brain
      for (let i = 0; i < BRAIN_N; i++) {
        const x = B[i * 2]
        if (Number.isNaN(x)) continue
        fx.beginPath(); fx.arc(x, B[i * 2 + 1], 10, 0, 6.283); fx.fill()
      }
      // network: its units and the links to the nearest units of the next layer (all of them would merge)
      fx.globalCompositeOperation = 'source-over'
      fx.fillStyle = fx.strokeStyle = '#fff'
      fx.lineWidth = 6
      fx.lineCap = 'round'
      const A = morphTargets.ai
      const ox = w / 2 + gap
      let base = 0
      for (let l = 0; l < AI_LAYERS.length; l++) {
        const next = base + AI_LAYERS[l]
        for (let i = 0; i < AI_LAYERS[l]; i++) {
          const ax = A[(base + i) * 2]
          if (Number.isNaN(ax)) continue
          const ay = A[(base + i) * 2 + 1]
          fx.beginPath(); fx.arc(ox + ax, ay, 9, 0, 6.283); fx.fill()
          if (l === AI_LAYERS.length - 1) continue
          const mid = (i * (AI_LAYERS[l + 1] - 1)) / Math.max(1, AI_LAYERS[l] - 1)
          for (let j = Math.max(0, Math.floor(mid - 1)); j <= Math.min(AI_LAYERS[l + 1] - 1, Math.ceil(mid + 1)); j++) {
            fx.beginPath(); fx.moveTo(ox + ax, ay); fx.lineTo(ox + A[(next + j) * 2], A[(next + j) * 2 + 1]); fx.stroke()
          }
        }
        base = next
      }
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      const m = homeState.morph
      const on = m > 0 && m < 1
      if (on !== shown) { cv.style.visibility = on ? 'visible' : 'hidden'; shown = on }
      if (!on) return
      const scale = Math.min(devicePixelRatio, 1.5)
      const w = cv.clientWidth
      const h = cv.clientHeight
      if (cv.width !== Math.round(w * scale) || cv.height !== Math.round(h * scale)) {
        cv.width = Math.round(w * scale)
        cv.height = Math.round(h * scale)
      }
      const { r0, r, gap } = homeState
      drawField(w, h, gap)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fcv)
      gl.viewport(0, 0, cv.width, cv.height)
      // the liquid's front keeps pace with the window (g: how far it has opened past the mark, u: 0..1),
      // overtaking it at the end so the last of it clears the panels
      const pw = w / 2 - gap
      const g = Math.max(0, r - r0)
      const u = Math.min(1, g / (Math.hypot(w / 2, h / 2) + 8 - r0))
      const wave = (g / pw) * 0.7 * (1 + 1.5 * u)
      gl.uniform2f(U.canvas, cv.width, cv.height)
      gl.uniform2f(U.stage, w, h)
      gl.uniform2f(U.c, w / 2, h / 2)
      gl.uniform1f(U.gap, gap)
      gl.uniform1f(U.pw, pw)
      gl.uniform1f(U.wave, wave)
      gl.uniform1f(U.mass, r0 * (1 - Math.min(1, wave / 0.3)))
      gl.uniform1f(U.wobble, Math.min(1, wave / 0.06))
      gl.uniform1f(U.time, (now / 1000) % 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="home-morph" aria-hidden />
}
