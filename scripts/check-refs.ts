/**
 * Verify every reference: DOIs via Crossref, arXiv ids via the arXiv API, other links via HTTP.
 * The returned title must match ours (word overlap), so a wrong-but-valid DOI is caught too.
 * Run: node scripts/check-refs.ts
 */
import { REFS } from '../src/ai/content/refs.ts'

const words = (s: string) => new Set(s.toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 3))
const overlap = (a: string, b: string) => {
  const A = words(a)
  const B = words(b)
  let n = 0
  for (const w of A) if (B.has(w)) n++
  return n / Math.max(1, Math.min(A.size, B.size))
}

async function titleOf(url: string): Promise<string | null> {
  const doi = url.match(/doi\.org\/(.+)$/)?.[1]
  if (doi) {
    const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { headers: { 'User-Agent': 'brain-dynamics-atlas ref check' } })
    if (!r.ok) return null
    const j = await r.json()
    return (j.message.title?.[0] ?? '') as string
  }
  const ax = url.match(/arxiv\.org\/abs\/(.+)$/)?.[1]
  if (ax) {
    const r = await fetch(`https://export.arxiv.org/api/query?id_list=${ax}`)
    const xml = await r.text()
    const m = [...xml.matchAll(/<title>([\s\S]*?)<\/title>/g)]
    return m[1]?.[1]?.replace(/\s+/g, ' ').trim() ?? null
  }
  const r = await fetch(url, { redirect: 'follow' })
  return r.ok ? '(ok)' : null
}

let bad = 0
for (const ref of REFS) {
  let title: string | null = null
  try {
    title = await titleOf(ref.url)
  } catch (e) {
    title = null
  }
  const ok = title === '(ok)' || (title !== null && overlap(ref.title, title) >= 0.5)
  if (!ok) bad++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${ref.id.padEnd(18)} ${title === null ? '(unresolved)' : title.slice(0, 90)}`)
  await new Promise((r) => setTimeout(r, ref.url.includes('arxiv') ? 3100 : 150))
}
console.log(bad ? `\n${bad} reference(s) failed` : '\nall references verified')
process.exit(bad ? 1 : 0)
