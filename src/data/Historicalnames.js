/**
 * HISTORICAL DISPLAY NAMES
 * ─────────────────────────────────────────────────────────────────────────────
 * CShapes 2.0 uses single cntry_name strings across multiple political eras
 * (e.g. "Russia (Soviet Union)" covers the Tsarist, Soviet, and modern periods).
 * This file maps those strings to period-accurate display names for the hover panel.
 */

const NAMES = {
  // ── Russia ────────────────────────────────────────────────────────────────
  'Russia (Soviet Union)': [
    { endYear: 1917,   displayName: 'Russian Empire' },
    { startYear: 1917, endYear: 1922,  displayName: 'Russia' },
    { startYear: 1922, endYear: 1991,  displayName: 'Soviet Union' },
    { startYear: 1991,                 displayName: 'Russia' },
  ],

  // ── Ottoman Empire / Turkey ───────────────────────────────────────────────
  'Turkey (Ottoman Empire)': [
    { endYear: 1922,   displayName: 'Ottoman Empire' },
    { startYear: 1923, displayName: 'Turkey' },
  ],

  // ── Persia / Iran ─────────────────────────────────────────────────────────
  'Iran (Persia)': [
    { endYear: 1934,   displayName: 'Persia' },
    { startYear: 1935, displayName: 'Iran' },
  ],

  // ── Italy / Kingdom of Sardinia ───────────────────────────────────────────
  'Italy/Sardinia': [
    { endYear: 1860,   displayName: 'Kingdom of Sardinia' },
    { startYear: 1861, displayName: 'Italy' },
  ],

  // ── Germany ───────────────────────────────────────────────────────────────
  'Germany (Prussia)': [
    { endYear: 1870,   displayName: 'North German Confederation' },
    { startYear: 1871, endYear: 1918,  displayName: 'German Empire' },
    { startYear: 1919, endYear: 1932,  displayName: 'Weimar Republic' },
    { startYear: 1933, endYear: 1945,  displayName: 'Nazi Germany' },
  ],

  // ── Korea ─────────────────────────────────────────────────────────────────
  'Korea': [
    { endYear: 1910,   displayName: 'Korea (Joseon)' },
    { startYear: 1910, endYear: 1945,  displayName: 'Korea (Japanese)' },
  ],
  'Korea, People\'s Republic of': [{ displayName: 'North Korea' }],
  'Korea, Republic of':           [{ displayName: 'South Korea' }],

  // ── Vietnam ───────────────────────────────────────────────────────────────
  'Vietnam (Annam/Cochin China/Tonkin)': [
    { endYear: 1954,   displayName: 'French Indochina (Vietnam)' },
  ],
  'Vietnam, Democratic Republic of': [{ displayName: 'North Vietnam' }],
  'Vietnam, Republic of':            [{ displayName: 'South Vietnam' }],

  // ── Former Yugoslav republics ─────────────────────────────────────────────
  'Macedonia (FYROM/North Macedonia)': [
    { endYear: 2018,   displayName: 'Macedonia (FYROM)' },
    { startYear: 2019, displayName: 'North Macedonia' },
  ],

  // ── Burma / Myanmar ───────────────────────────────────────────────────────
  'Myanmar (Burma)': [
    { endYear: 1988,   displayName: 'Burma' },
    { startYear: 1989, displayName: 'Myanmar' },
  ],

  // ── Cambodia ─────────────────────────────────────────────────────────────
  'Cambodia (Kampuchea)': [
    { endYear: 1953,   displayName: 'French Indochina (Cambodia)' },
    { startYear: 1954, endYear: 1975,  displayName: 'Cambodia' },
    { startYear: 1975, endYear: 1979,  displayName: 'Kampuchea' },
    { startYear: 1979, displayName: 'Cambodia' },
  ],

  // ── Sri Lanka ─────────────────────────────────────────────────────────────
  'Sri Lanka (Ceylon)': [
    { endYear: 1971,   displayName: 'Ceylon' },
    { startYear: 1972, displayName: 'Sri Lanka' },
  ],

  // ── Tanzania ─────────────────────────────────────────────────────────────
  'Tanzania (Tanganyika)': [
    { endYear: 1963,   displayName: 'Tanganyika' },
    { startYear: 1964, displayName: 'Tanzania' },
  ],

  // ── Burkina Faso ─────────────────────────────────────────────────────────
  'Burkina Faso (Upper Volta)': [
    { endYear: 1983,   displayName: 'Upper Volta' },
    { startYear: 1984, displayName: 'Burkina Faso' },
  ],

  // ── Madagascar ───────────────────────────────────────────────────────────
  'Madagascar (Malagasy)': [
    { endYear: 1974,   displayName: 'Malagasy Republic' },
    { startYear: 1975, displayName: 'Madagascar' },
  ],

  // ── Congo (DRC) ──────────────────────────────────────────────────────────
  'Congo, Democratic Republic of (Zaire)': [
    { endYear: 1907,   displayName: 'Congo Free State' },
    { startYear: 1908, endYear: 1959,  displayName: 'Belgian Congo' },
    { startYear: 1960, endYear: 1964,  displayName: 'Republic of the Congo' },
    { startYear: 1965, endYear: 1996,  displayName: 'Zaire' },
    { startYear: 1997, displayName: 'Democratic Republic of the Congo' },
  ],

  // ── Zimbabwe ─────────────────────────────────────────────────────────────
  'Zimbabwe (Rhodesia)': [
    { endYear: 1964,   displayName: 'Southern Rhodesia' },
    { startYear: 1965, endYear: 1979,  displayName: 'Rhodesia' },
    { startYear: 1979, endYear: 1980,  displayName: 'Zimbabwe Rhodesia' },
    { startYear: 1980, displayName: 'Zimbabwe' },
  ],

  // ── Belarus ──────────────────────────────────────────────────────────────
  'Belarus (Byelorussia)': [
    { endYear: 1991,   displayName: 'Byelorussian SSR' },
    { startYear: 1991, displayName: 'Belarus' },
  ],

  // ── Bosnia ───────────────────────────────────────────────────────────────
  'Bosnia': [{ displayName: 'Bosnia (Austro-Hungarian)' }],

  // ── India ────────────────────────────────────────────────────────────────
  'India': [
    { endYear: 1947,   displayName: 'British India' },
    { startYear: 1947, displayName: 'India' },
  ],

  // ── Austria-Hungary ──────────────────────────────────────────────────────
  'Austria-Hungary': [{ displayName: 'Austria-Hungary' }], 

  // ── Yemen ────────────────────────────────────────────────────────────────
  'Yemen (Arab Republic of Yemen)':  [{ displayName: 'Yemen Arab Republic (North Yemen)' }],
  'Yemen, People\'s Republic of':    [{ displayName: 'People\'s Democratic Republic of Yemen (South Yemen)' }],

  // ── Rumania ──────────────────────────────────────────────────────────────
  'Rumania': [{ displayName: 'Romania' }],

  // ── Czechoslovakia / German Democratic Republic ───────────────────────────
  'German Democratic Republic': [{ displayName: 'East Germany' }],
  'German Federal Republic':    [{ displayName: 'West Germany' }],

  // ── Thailand / Siam ───────────────────────────────────────────────────────
  'Thailand': [
    { endYear: 1938,   displayName: 'Siam' },
    { startYear: 1939, endYear: 1944,  displayName: 'Thailand' },
    { startYear: 1945, endYear: 1949,  displayName: 'Siam' },
    { startYear: 1950, displayName: 'Thailand' },
  ],

  // ── Sweden ────────────────────────────────────────────────────────────────
  'Sweden': [
    { endYear: 1904,   displayName: 'United Kingdoms of Sweden and Norway' },
    { startYear: 1905, displayName: 'Sweden' },
  ],

  // ── Norway ────────────────────────────────────────────────────────────────
  'Norway': [
    { endYear: 1904,   displayName: 'United Kingdoms of Sweden and Norway' },
    { startYear: 1905, displayName: 'Norway' },
  ],

  // ── Oman ──────────────────────────────────────────────────────────────────
  'Oman': [
    { endYear: 1969,   displayName: 'Sultanate of Muscat and Oman' },
    { startYear: 1970, displayName: 'Oman' },
  ],

  // ── Indonesia ─────────────────────────────────────────────────────────────
  'Indonesia': [
    { endYear: 1944,   displayName: 'Indonesia (Dutch East Indies)' },
    { startYear: 1945, displayName: 'Indonesia' },
  ],

  // ── China ─────────────────────────────────────────────────────────────────
  'China': [
    { endYear: 1911,   displayName: 'China (Qing Dynasty)' },
    { startYear: 1912, displayName: 'China' },
  ],
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a period-accurate display name for the hover panel.
 * @param {Object} props - GeoJSON feature.properties
 * @param {number} currentYear - The active game year being displayed (CRITICAL for accuracy)
 * @returns {string|null}
 */
export function getDisplayName(props, currentYear) {
  if (!props || !props.cntry_name) return null
  const periods = NAMES[props.cntry_name]
  if (!periods) return null

  // 1. Most Accurate: Evaluate against the specific game year being rendered
  if (currentYear) {
    for (const period of periods) {
      if (period.startYear && currentYear < period.startYear) continue
      if (period.endYear && currentYear > period.endYear) continue
      return period.displayName
    }
  }

  // 2. Fallback: If no year is provided, test against the midpoint of the feature's lifespan
  const gwsyear = props.gwsyear ?? -Infinity
  const gweyear = props.gweyear ?? Infinity
  const endYearBoundary = gweyear === -1 ? 2016 : gweyear
  const midpoint = (gwsyear === -Infinity && gweyear === Infinity) ? 1950 :
                   (gwsyear === -Infinity) ? endYearBoundary - 10 :
                   (gweyear === Infinity) ? gwsyear + 10 :
                   (gwsyear + endYearBoundary) / 2;

  for (const period of periods) {
    if (period.startYear && midpoint < period.startYear) continue
    if (period.endYear   && midpoint > period.endYear)   continue
    return period.displayName
  }

  return null
}