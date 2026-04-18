/**
 * HISTORICAL DISPLAY NAMES
 * ─────────────────────────────────────────────────────────────────────────────
 * CShapes 2.0 uses single cntry_name strings across multiple political eras
 * (e.g. "Russia (Soviet Union)" covers the Tsarist, Soviet, and modern periods).
 * This file maps those strings to period-accurate display names for the hover panel.
 *
 * Each entry is an array of { startYear?, endYear?, displayName } periods.
 * startYear/endYear are matched against the feature's gwsyear/gweyear fields
 * (i.e., the date range of that specific feature row in CShapes, not the
 * current game year). Omitting startYear means "from the beginning of the
 * dataset"; omitting endYear means "through the end."
 *
 * Only entries that NEED remapping are listed. If a name is fine as-is,
 * it doesn't appear here and the raw cntry_name is shown unchanged.
 */

const NAMES = {

  // ── Russia ────────────────────────────────────────────────────────────────
  // GW codes Russia as a single continuous entity. CShapes splits it into
  // rows covering distinct political eras which we can distinguish by gweyear.
  'Russia (Soviet Union)': [
    { endYear: 1917,   displayName: 'Russian Empire' },
    { startYear: 1917, endYear: 1922,  displayName: 'Russia' },         // post-Tsar, pre-USSR
    { startYear: 1922, endYear: 1991,  displayName: 'Soviet Union' },
    { startYear: 1991,                 displayName: 'Russia' },
  ],

  // ── Ottoman Empire / Turkey ───────────────────────────────────────────────
  'Turkey (Ottoman Empire)': [
    { endYear: 1922,   displayName: 'Ottoman Empire' },
    { startYear: 1923, displayName: 'Turkey' },
  ],

  // ── Persia / Iran ─────────────────────────────────────────────────────────
  // Officially renamed from Persia to Iran in 1935.
  'Iran (Persia)': [
    { endYear: 1934,   displayName: 'Persia' },
    { startYear: 1935, displayName: 'Iran' },
  ],

  // ── Italy / Kingdom of Sardinia ───────────────────────────────────────────
  // CShapes codes the pre-unification Sardinian state, which proclaimed the
  // Kingdom of Italy in 1861.
  'Italy/Sardinia': [
    { endYear: 1860,   displayName: 'Kingdom of Sardinia' },
    { startYear: 1861, displayName: 'Italy' },
  ],

  // ── Germany ───────────────────────────────────────────────────────────────
  // CShapes starts Germany (GW 255) at the North German Confederation (1867)
  // and the unified empire is proclaimed in 1871.
  'Germany (Prussia)': [
    { endYear: 1870,   displayName: 'North German Confederation' },
    { startYear: 1871, endYear: 1918,  displayName: 'German Empire' },
    { startYear: 1919, endYear: 1932,  displayName: 'Weimar Republic' },
    { startYear: 1933, endYear: 1945,  displayName: 'Nazi Germany' },
  ],

  // ── Korea ─────────────────────────────────────────────────────────────────
  // The undivided "Korea" entry covers the Japanese colonial period.
  // Post-1945 entries are already named separately in CShapes.
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
  // Officially renamed in 1989, though recognition of the name was contested.
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
    { endYear: 1960,   displayName: 'Belgian Congo' },
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
  // The pre-WWI "Bosnia" entry in CShapes is the Austro-Hungarian occupation.
  'Bosnia': [{ displayName: 'Bosnia (Austro-Hungarian)' }],

  // ── India ────────────────────────────────────────────────────────────────
  // CShapes uses "India" for both colonial British India and independent India.
  'India': [
    { endYear: 1947,   displayName: 'British India' },
    { startYear: 1947, displayName: 'India' },
  ],

  // ── Austria-Hungary ──────────────────────────────────────────────────────
  'Austria-Hungary': [{ displayName: 'Austria-Hungary' }],  // fine as-is, listed for completeness

  // ── Yemen ────────────────────────────────────────────────────────────────
  'Yemen (Arab Republic of Yemen)':  [{ displayName: 'Yemen Arab Republic (North Yemen)' }],
  'Yemen, People\'s Republic of':    [{ displayName: 'People\'s Democratic Republic of Yemen (South Yemen)' }],

  // ── Sudan ────────────────────────────────────────────────────────────────
  // Pre-independence it was an Anglo-Egyptian condominium (handled in
  // colonialStatus.js label), but the name itself is fine.

  // ── Rumania ──────────────────────────────────────────────────────────────
  // CShapes spells it "Rumania" (older transliteration).
  'Rumania': [{ displayName: 'Romania' }],

  // ── Czechoslovakia / German Democratic Republic ───────────────────────────
  'German Democratic Republic': [{ displayName: 'East Germany' }],
  'German Federal Republic':    [{ displayName: 'West Germany' }],

}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a period-accurate display name for the hover panel, or null if the
 * raw cntry_name is already accurate and needs no remapping.
 *
 * @param {Object} props - GeoJSON feature.properties
 *   Must contain: cntry_name (string), gwsyear (number), gweyear (number)
 * @returns {string|null}
 */
export function getDisplayName(props) {
  if (!props || !props.cntry_name) return null
  const periods = NAMES[props.cntry_name]
  if (!periods) return null

  const gwsyear = props.gwsyear ?? -Infinity
  const gweyear = props.gweyear ?? Infinity

  for (const period of periods) {
    if (period.startYear && gwsyear < period.startYear) continue
    if (period.endYear   && gweyear > period.endYear)   continue
    return period.displayName
  }

  return null
}