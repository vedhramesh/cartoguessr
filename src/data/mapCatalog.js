/**
 * GEOJSON DATA CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 * This file defines the universe of historical maps available in the game.
 *
 * HOW TO CONNECT YOUR CSHAPES DATA:
 * ─────────────────────────────────
 * The CShapes 2.0 dataset (https://icr.ethz.ch/data/cshapes/) provides
 * GeoJSON/shapefiles of state boundaries for every year from 1886 to 2019.
 *
 * Workflow:
 *  1. Download CShapes 2.0 from the ICR ETH Zürich website.
 *  2. Use the R `cshapes` package or Python/GeoPandas to slice by year:
 *       cshp(date=as.Date("1920-01-01"))   # R
 *       # or filter by 'gwsdate'/'gweyear' columns in Python
 *  3. Export each slice as GeoJSON and place it in /public/geojson/{year}.json
 *  4. Add an entry to MAP_CATALOG below.
 *
 * CURRENTLY: The app ships with PLACEHOLDER ENTRIES for demonstration.
 * Replace `geojsonPath` values with your actual exported files.
 * The `label` is never shown to the player during a round (no labels rule),
 * but is used in the results screen after guessing.
 */

export const MAP_CATALOG = Array.from({ length: 2019 - 1886 + 1 }, (_, i) => {
  const year = 1886 + i;
  return {
    year: year,
    geojsonPath: `/cartoguessr/geojson/${year}.json`,
    label: `World, ${year}`
  };
});

// Min/max year for the slider
export const YEAR_MIN = MAP_CATALOG[0].year
export const YEAR_MAX = MAP_CATALOG[MAP_CATALOG.length - 1].year
