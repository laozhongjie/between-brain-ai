import { describe, expect, it } from 'vitest'
import { EVENTS } from '../src/sim/director'
import { eventLanes } from '../src/ui/timelineLayout'

describe('mobile timeline markers', () => {
  it.each([252, 282, 672])('keeps events in each lane separated at width %s', width => {
    const lanes = eventLanes(EVENTS.map(event => event.tl), width)
    for (let index = 0; index < EVENTS.length; index++) {
      for (let previous = 0; previous < index; previous++) {
        if (lanes[previous] === lanes[index]) expect((EVENTS[index].tl - EVENTS[previous].tl) / 1440 * width).toBeGreaterThanOrEqual(24)
      }
    }
    expect(lanes).toHaveLength(EVENTS.length)
    expect(Math.max(...lanes)).toBeLessThan(5)
  })
})
