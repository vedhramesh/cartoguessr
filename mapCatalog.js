/**
 * GEOJSON DATA CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 * AUTO-GENERATED FILE. Do not edit the MAP_CATALOG array manually.
 */

// Dynamically generate the catalog for every year from 1886 to 2019
export const MAP_CATALOG = Array.from({ length: 2019 - 1886 + 1 }, (_, i) => {
  const year = 1886 + i;
  return {
    year: year,
    geojsonPath: `/cartoguessr/geojson/${year}.json`,
    label: `World, ${year}`
  };
});

// Min/max year for the slider
export const YEAR_MIN = MAP_CATALOG[0].year;
export const YEAR_MAX = MAP_CATALOG[MAP_CATALOG.length - 1].year;
