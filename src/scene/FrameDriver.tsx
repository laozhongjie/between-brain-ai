import { advance, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { onFrame } from '../sim/loop'

/**
 * Renders its Canvas (frameloop="never") on the shared, capped frame clock, so the scene redraws in step
 * with the simulation and never faster than it. While `active` returns false the canvas is not drawn.
 */
export function FrameDriver({ active }: { active?: () => boolean }) {
  const get = useThree((s) => s.get)
  useEffect(() => {
    let t = 0
    let last = performance.now()
    return onFrame((now) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      if (active && !active()) return
      t += dt
      advance(t, true, get())
    })
  }, [get, active])
  return null
}
