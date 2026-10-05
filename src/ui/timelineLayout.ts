export function eventLanes(times: number[], width: number, spacing = 24): number[] {
  const ends: number[] = []
  return times.map(time => {
    const position = time / 1440 * width
    let lane = ends.findIndex(end => position - end >= spacing)
    if (lane < 0) lane = ends.length
    ends[lane] = position
    return lane
  })
}
