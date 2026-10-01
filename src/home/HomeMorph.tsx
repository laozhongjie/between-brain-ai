import { useEffect, useRef } from 'react'
import { homeState } from './chapters'

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

/*
 * Per pixel (CSS px, y down), in polar terms around the disc's centre. At the start the liquid is exactly
 * the mark's white disc. As the window opens its front (uRf) moves outward and its rim grows uneven,
 * drifting fingers (amplitude rising from zero with uAmp, so the circle deforms smoothly); meanwhile it
 * is washed off from the centre outward (uRt, with its own uneven, moving edge), leaving the panels
 * underneath showing, and its tail breaks into beads. Beyond the front the window is still dark. Each half
 * has its own noise, so the two sides flow independently from their own edges. Shading from the
 * thickness field's slope, flat where the liquid is level so it matches the mark's white exactly.
 */
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uCanvas;   // canvas size, device px
uniform float uScale;   // device px per CSS px
uniform vec2 uC;        // disc centre, CSS px
uniform float uGap, uRf, uRt, uAmp, uTime;
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

void main() {
  vec2 p = vec2(gl_FragCoord.x, uCanvas.y - gl_FragCoord.y) / uScale;
  vec2 v = p - uC;
  if (abs(v.x) < uGap) { outColor = vec4(0.0); return; }   // the slit
  float side = sign(v.x);
  vec2 seed = vec2(side * 31.7, side * 12.3);                // each half flows on its own
  float d = length(v);
  float ang = atan(v.y, abs(v.x));                           // -pi/2 .. pi/2 within a half

  // the front: outward, with fingers that drift along the rim and race ahead or lag behind
  float warp = fbm(vec2(ang * 2.0, d / 140.0 - uTime * 0.12) + seed);
  float fn = fbm(vec2(ang * 3.2 + warp * 1.5, uTime * 0.09) + seed);
  float rf = uRf + uAmp * 0.32 * (fn - 0.5);
  // the washed edge, from the centre outward, uneven too and moving
  float tn = fbm(vec2(ang * 4.0 - warp, d / 70.0 - uTime * 0.2) + seed + 7.0);
  float rt = uRt + uAmp * 0.26 * (tn - 0.5);

  float body = smoothstep(rt, rt + 14.0, d) * (1.0 - smoothstep(rf - 1.5, rf + 1.5, d));
  // just inside the washed edge the liquid breaks into beads that trail behind
  float beads = smoothstep(0.6, 0.72, fbm(p / 11.0 + vec2(uTime * 0.25 * side, -uTime * 0.1) + seed));
  float tail = (1.0 - smoothstep(rt - 1.0, rt + 1.0, d)) * smoothstep(rt - 46.0, rt - 6.0, d);
  float ripple = fbm(p / 38.0 + vec2(uTime * 0.3 * side, uTime * 0.12) + seed);
  float h = max(body, tail * beads) * (0.9 + 0.1 * smoothstep(0.0, 1.0, uAmp / 200.0) * ripple);

  float a = smoothstep(0.35, 0.45, h);
  // a soft sheen where the surface tilts; level liquid stays exactly the mark's white
  vec3 nrm = normalize(vec3(-dFdx(h) * 6.0, dFdy(h) * 6.0, 1.0));
  float sheen = pow(clamp(dot(nrm.xy, normalize(vec2(-0.6, 0.8))) * 2.5, 0.0, 1.0), 2.0);
  float shade = clamp(dot(nrm.xy, normalize(vec2(0.6, -0.8))) * 1.5, 0.0, 1.0);
  vec3 col = vec3(0.961) * (1.0 - 0.18 * shade) + 0.04 * sheen;

  // beyond the front the window is still dark
  float dark = smoothstep(rf - 1.5, rf + 1.5, d);
  vec3 cover = vec3(0.052, 0.058, 0.07);
  float alpha = max(a, dark);
  outColor = vec4(mix(cover * dark, col, a), alpha);   // premultiplied
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh))
  return sh
}

/**
 * The white halves of the split disc turning into brain | AI as a flowing white liquid. As the disc opens
 * the white flows outward from its edge in uneven fingers, over the brain to the left and the network to
 * the right, and is washed off from the centre outward, leaving the real brain | AI showing. Drawn by
 * one fragment shader (FRAG), clipped to the growing disc in CSS (.home-morph).
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
    const u = (name: string) => gl.getUniformLocation(prog, name)
    const U = { canvas: u('uCanvas'), scale: u('uScale'), c: u('uC'), gap: u('uGap'), rf: u('uRf'), rt: u('uRt'), amp: u('uAmp'), time: u('uTime') }
    let raf = 0
    let shown = false

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
      gl.viewport(0, 0, cv.width, cv.height)
      // how far the window has opened past the mark (g px, u 0..1) sets the front and the washed edge:
      // both start at the mark's disc and end beyond the stage's corners
      const { r0, r, gap } = homeState
      const g = Math.max(0, r - r0)
      const u = Math.min(1, g / (Math.hypot(w / 2, h / 2) + 8 - r0))
      gl.uniform2f(U.canvas, cv.width, cv.height)
      gl.uniform1f(U.scale, cv.width / w)
      gl.uniform2f(U.c, w / 2, h / 2)
      gl.uniform1f(U.gap, gap)
      gl.uniform1f(U.rf, r0 + g * (0.9 + 0.3 * u))
      gl.uniform1f(U.rt, g * (0.25 + 1.15 * u) - 5)
      gl.uniform1f(U.amp, g)
      gl.uniform1f(U.time, now / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="home-morph" aria-hidden />
}
