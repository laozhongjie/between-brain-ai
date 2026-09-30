import { useEffect, useState } from 'react'

/** Re-render the calling component every `ms` milliseconds (for panels that read the live engine). */
export function useTicker(ms: number) {
  const [, set] = useState(0)
  useEffect(() => {
    const id = setInterval(() => set((x) => x + 1), ms)
    return () => clearInterval(id)
  }, [ms])
}
