/**
 * COUNTRY COLOR OVERRIDES
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed colors keyed by cntry_name exactly as it appears in CShapes 2.0.
 * These override the graph-coloring algorithm for specific countries/territories.
 *
 * Year-dependent entries (Russia/USSR, China) are handled in getCountryColor().
 * Nicaragua's second listed color (#92B3BF) takes precedence over the first.
 */

const STATIC_COLORS = {
  // ── Americas ──────────────────────────────────────────────────────────────
  'United States of America': '#425EC1',
  'Mexico':                   '#ADF2AF',
  'Haiti':                    '#8BB3CF',
  'Canada':                   '#773027',
  'Nicaragua':                '#92B3BF',
  'Costa Rica':               '#98802B',
  'Honduras':                 '#809141',
  'Guatemala':                '#482770',
  'El Salvador':              '#9882BF',
  'Belize':                   '#C9385D',
  'Colombia':                 '#FFEAA8',
  'Venezuela':                '#FFB08C',
  'Ecuador':                  '#2B8DAC',
  'Bolivia':                  '#CCA66C',
  'Chile':                    '#EC9F59',
  'Paraguay':                 '#D9E0B3',
  'Uruguay':                  '#826556',
  'Peru':                     '#C4BDCC',
  'Brazil':                   '#81B17D',
  'Argentina':                '#6566A3',

  // ── Western Europe ────────────────────────────────────────────────────────
  'France':                   '#223BBF',
  'Spain':                    '#E7B50C',
  'Netherlands':              '#DC8A39',
  'Greece':                   '#77A8C2',
  'Italy/Sardinia':           '#49984C',  // CShapes name covers both periods
  'Denmark':                  '#AC4642',
  'Sweden':                   '#5782C7',
  'Finland':                  '#C2C6D7',
  'Norway':                   '#6F4747',
  'Switzerland':              '#E00505',
  'Luxembourg':               '#37898B',
  'United Kingdom':           '#D1423A',
  'Germany':                  '#858094',
  
  // ── Central / Eastern Europe ──────────────────────────────────────────────
  'Poland':                   '#C55C6A',
  'Rumania':                  '#D7C448',  // CShapes spelling
  'Yugoslavia':               '#48497E',
  'Federal Republic of Yugoslavia':          '#48497E',
  'Socialist Federal Republic of Yugoslavia':'#48497E',
  'Latvia':                   '#524CB0',
  'Lithuania':                '#DBDB77',
  'Estonia':                  '#3287AF',
  'Austria':                  '#C2C6D7',
  'Austria-Hungary':          '#C2C6D7',
  'Bulgaria':                 '#339B00',
  'Czechoslovakia':           '#36A79C',
  'Czech Republic':           '#36A79C',
  'Serbia':                   '#A64839',
  'Moldova':                  '#7F9218',
  'Portugal':                 '#39A065',
  'Russia':                   '#5E7F34',

  // ── Africa ───────────────────────────────────────────────────────────────
  'Morocco':                  '#E09271',
  'Egypt':                    '#FFCD9B',
  'Transvaal':                '#8CB79A',
  'South Africa':             '#9882BF',
  'Ethiopia':                 '#5889AC',
  'Libya':                    '#00B400',
  'Tunisia':                  '#928639',
  'Algeria':                  '#C8B64C',
  'Madagascar':               '#B9C5B1',
  'Sudan':                    '#D7CEA3',
  'South Sudan':              '#9AA992',
  'Mauritania':               '#B9AAB5',
  'Botswana':                 '#B4C5CD',

  // ── Asia ─────────────────────────────────────────────────────────────────
  'Korea':                          '#9D9061',
  "Korea, People's Republic of":    '#5A0C0C',
  'Korea, Republic of':             '#046589',
  'Nepal':                          '#89B77C',
  'Thailand':                       '#5889AC',
  'Iran (Persia)':                  '#477161',
  'Afghanistan':                    '#40A0A7',
  'India':                          '#F7631E',
  'China':                          '#C6061D',
  'Laos':                           '#5B0B9E',
  'Thailand':                       '#E1A317',
  'Saudi Arabia':                   '#ABBE98',
  'Japan':                          '#FFC9B2',
  'Philippines':                    '#9882BF',
  'Yemen (Arab Republic of Yemen)': '#FFBFBF',
  "Yemen, People's Republic of":    '#FFBFBF',
  'Oman':                           '#628699',
  'Uzbekistan':                     '#5A8A89',
  'Pakistan':                       '#0A875C',
  'Bangladesh':                     '#44B42B',
  'Turkmenistan':                   '#DABFAF',
  'Kyrgyzstan':                     '#B7BCBF',
  'Tajikistan':                     '#AEBAB5',

  // ── Oceania ───────────────────────────────────────────────────────────────
  'Australia':                '#398F61',
}

/**
 * Returns a fixed hex color for a country, or null to let graph-coloring decide.
 * Handles era-dependent cases (Russia/USSR, Qing China) by year.
 *
 * @param {string} cntryName - feature.properties.cntry_name from CShapes
 * @param {number} year      - the active game year being rendered
 * @returns {string|null}
 */
export function getCountryColor(cntryName, year) {
  // Russia (Soviet Union): same CShapes entry covers Tsarist, Soviet, and modern eras
  if (cntryName === 'Russia (Soviet Union)') {
    return (year >= 1922 && year <= 1991) ? '#7D0D18' : '#77B558'
  }

  // China: Qing dynasty gets a custom color; post-1912 falls back to graph coloring
  if (cntryName === 'China') {
    return year <= 1911 ? '#FFEA9A' : null
  }

  return STATIC_COLORS[cntryName] ?? null
}