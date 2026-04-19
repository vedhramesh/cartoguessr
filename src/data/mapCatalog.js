/**
 * GEOJSON DATA CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 * AUTO-GENERATED FILE. Do not edit the MAP_CATALOG array manually.
 *
 * Excluded years: 1915–1917 (WWI) and 1940–1944 (WWII).
 * These years produce ambiguous, heavily contested maps that make
 * for unfair rounds — too many borders in flux simultaneously.
 */

const EXCLUDED_YEARS = new Set([1915, 1916, 1917, 1940, 1941, 1942, 1943, 1944])

export const MAP_CATALOG = Array.from({ length: 2019 - 1886 + 1 }, (_, i) => {
  const year = 1886 + i
  return {
    year,
    geojsonPath: `/cartoguessr/geojson/${year}.json`,
    label: `World, ${year}`
  }
}).filter(entry => !EXCLUDED_YEARS.has(entry.year))

// Min/max year for the slider
export const YEAR_MIN = MAP_CATALOG[0].year
export const YEAR_MAX = MAP_CATALOG[MAP_CATALOG.length - 1].year