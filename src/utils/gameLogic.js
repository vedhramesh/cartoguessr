// ─── Seeded PRNG (Mulberry32) ───────────────────────────────────────────────
export function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ─── Daily seed ─────────────────────────────────────────────────────────────
export function getDailySeed() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return parseInt(`${y}${m}${d}`, 10)
}

// Day number relative to epoch (2024-01-01) for display purposes
export function getDayNumber() {
  const epoch = new Date('2024-01-01T00:00:00Z')
  const now = new Date()
  const diff = now - epoch
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

// ─── Round picker ────────────────────────────────────────────────────────────
export function pickRounds(availableYears, prng, count = 5) {
  const pool = [...availableYears]
  const picked = []
  while (picked.length < count && pool.length > 0) {
    const idx = Math.floor(prng() * pool.length)
    picked.push(pool.splice(idx, 1)[0])
  }
  return picked
}

// ─── Scoring ─────────────────────────────────────────────────────────────────
// Max 5000 pts/round. Exact match always returns exactly 5000.
// Exponential decay for non-zero diff. 0 pts if |diff| > 50.
export function calculateScore(actualYear, guessYear) {
  const diff = Math.abs(actualYear - guessYear)
  if (diff === 0) return 5000
  if (diff > 50) return 0
  // k chosen so that diff=25 yields ~1250 pts (25% of max)
  const k = Math.log(4) / 25
  return Math.round(5000 * Math.exp(-k * diff))
}

// ─── Score → emoji blocks ────────────────────────────────────────────────────
export function scoreToBlocks(score) {
  const blocks = []
  const full = Math.floor(score / 1000)
  const partial = score % 1000 > 0 && full < 5 ? 1 : 0
  const empty = 5 - full - partial
  for (let i = 0; i < full; i++) blocks.push('🟦')
  for (let i = 0; i < partial; i++) blocks.push('🟩')
  for (let i = 0; i < empty; i++) blocks.push('⬛')
  return blocks.join('')
}

// ─── Share text generator ─────────────────────────────────────────────────────
export function generateShareText(results, totalScore, dayNumber, isDaily) {
  if (!isDaily) return null
  const header = `Cartoguessr Daily #${dayNumber} — ${totalScore.toLocaleString()} pts`
  const rows = results.map((r, i) => {
    const blocks = scoreToBlocks(r.score)
    return `R${i + 1}: ${blocks} (${r.score.toLocaleString()})`
  })
  return [header, ...rows].join('\n')
}

// ─── Practice PRNG seed ───────────────────────────────────────────────────────
export function getPracticeSeed() {
  return Math.floor(Math.random() * 1_000_000)
}