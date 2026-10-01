import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { BRAIN_CENTER } from './layout'

/**
 * The medium the brain floats in: a deep teal backdrop with slow, faint caustic light, and sparse suspended
 * particles drifting upward. Kept dim (under the bloom threshold) so signals stay the brightest thing.
 * Frozen when the viewer prefers reduced motion.
 */
const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const backdropVert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const backdropFrag = /* glsl */ `
  uniform float uTime;
  varying vec3 vDir;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int k = 0; k < 4; k++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
  void main() {
    vec3 d = normalize(vDir);
    // spherical coordinates so the pattern wraps the whole view without seams in front
    vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * 2.2;
    float t = uTime * 0.035;
    // two drifting layers, ridged into thin bright filaments like caustics
    float c1 = fbm(uv * 1.6 + vec2(t, -t * 0.7));
    float c2 = fbm(uv * 2.3 - vec2(t * 0.8, t * 0.5) + c1);
    float caustic = pow(1.0 - abs(c2 * 2.0 - 1.0), 6.0);
    // deep teal, lighter towards the horizon band the camera mostly looks through, black above and below
    float band = 1.0 - smoothstep(0.0, 0.9, abs(d.y + 0.05));
    // linear colours (the composer converts to sRGB): deep ≈ #070a10, teal ≈ #0b1a22
    vec3 deep = vec3(0.0021, 0.0030, 0.0052);
    vec3 teal = vec3(0.0034, 0.0103, 0.0160);
    vec3 col = mix(deep, teal, band);
    col += vec3(0.004, 0.012, 0.016) * caustic * band;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Backdrop() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: backdropVert,
        fragmentShader: backdropFrag,
        side: THREE.BackSide,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  )
  useFrame(({ clock }) => {
    if (!still) mat.uniforms.uTime.value = clock.elapsedTime
  })
  return (
    <mesh renderOrder={-10} raycast={() => {}} frustumCulled={false}>
      <sphereGeometry args={[40, 48, 24]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

const COUNT = 260
const SPAN = new THREE.Vector3(7, 5, 7) // particle volume around the brain
/** Per-particle base position in [0,1)³ and a phase, fixed for the page's lifetime */
const SEED = Float32Array.from({ length: COUNT * 4 }, () => Math.random())

const particleVert = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSpan;
  uniform vec3 uCenter;
  attribute vec4 seed; // xyz: base position in [0,1), w: per-particle phase
  varying float vFade;
  void main() {
    vec3 p = seed.xyz;
    // slow upward drift (wrapping) with a gentle sway
    p.y = fract(p.y + uTime * (0.006 + 0.006 * seed.w));
    vec3 pos = uCenter + (p - 0.5) * uSpan;
    pos.x += sin(uTime * 0.25 + seed.w * 6.28) * 0.08;
    pos.z += cos(uTime * 0.21 + seed.w * 5.1) * 0.08;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = -mv.z;
    gl_PointSize = min(9.0, (0.8 + 1.6 * seed.w) * 26.0 / dist);
    // fade at the top/bottom of the volume (no popping when wrapping) and with distance
    vFade = smoothstep(0.0, 0.12, p.y) * (1.0 - smoothstep(0.88, 1.0, p.y)) * clamp(1.6 - dist * 0.18, 0.15, 1.0);
  }
`
const particleFrag = /* glsl */ `
  varying float vFade;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(vec3(0.20, 0.38, 0.46), a * a * 0.5 * vFade);
  }
`

function Particles() {
  const { geo, mat } = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('seed', new THREE.BufferAttribute(SEED, 4))
    // position is unused by the shader but three.js needs it for the draw count
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3))
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uSpan: { value: SPAN }, uCenter: { value: BRAIN_CENTER } },
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
    return { geo: g, mat: m }
  }, [])
  useFrame(({ clock }) => {
    if (!still) mat.uniforms.uTime.value = clock.elapsedTime
  })
  return <points geometry={geo} material={mat} renderOrder={-5} raycast={() => {}} frustumCulled={false} />
}

export function Medium() {
  return (
    <>
      <Backdrop />
      <Particles />
    </>
  )
}
