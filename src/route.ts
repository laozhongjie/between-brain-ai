import { useEffect, useState } from 'react'

const parse = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)

/** Minimal hash router (works on GitHub Pages without server rewrites). */
export function useRoute(): string[] {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export function go(path: string) {
  window.location.hash = path.startsWith('/') ? path : `/${path}`
}
