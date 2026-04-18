/**
 * COLONIAL STATUS LOOKUP
 * ─────────────────────────────────────────────────────────────────────────────
 * CShapes 2.0's GeoJSON export strips the political status fields, so this
 * file encodes colonial relationships manually, keyed on cntry_name strings
 * exactly as they appear in the dataset.
 *
 * Each entry is one of:
 *   { power, label?, startYear?, endYear? }   — single colonial period
 *   [{ power, label?, startYear?, endYear? }]  — multiple periods (same name,
 *                                                different eras, e.g. Philippines)
 *
 *   power     Short name of the colonial power, used to build the default label
 *             "[power] colony" (e.g. "British" → "British colony")
 *   label     Overrides the default label entirely.  Use for protectorates,
 *             mandates, territories, dominions, etc.
 *   startYear Only show the label if feature.gwsyear >= startYear.
 *             Needed when the same cntry_name covers an independent period
 *             BEFORE colonization (e.g. Korea before Japanese annexation).
 *   endYear   Only show the label if feature.gweyear <= endYear.
 *             Needed when the same cntry_name covers both colonial and
 *             independent periods (e.g. India before and after 1947).
 *             Set to the gweyear of the LAST colonial-period feature.
 *
 * Sources: GW state system, CShapes 2.0 docs, Wikipedia, COW colonial history.
 */

const STATUS = {

  // ── Always colonial throughout their existence in CShapes ─────────────────
  // (No year constraints; the dataset simply has no independent-period entry
  //  under this name, so the check never needs to fire.)

  'Aden':                     { power: 'British' },
  'Alaska':                   { power: 'American', label: 'U.S. territory' },
  'Bokhara':                  { power: 'Russian',  label: 'Russian protectorate' },
  'Bosnia':                   { power: 'Austro-Hungarian' },
  'British Bechuanaland':     { power: 'British' },
  'British Cameroons':        { power: 'British' },
  'British Somaliland (Somaliland Republic)': { power: 'British' },
  'British Togoland':         { power: 'British' },
  'Cape Colony':              { power: 'British' },
  'East Aden Protectorate':   { power: 'British' },
  'Federated Malay States':   { power: 'British', label: 'British protectorate' },
  'Federation of Rhodesia and Nyasaland': { power: 'British' },
  'Federation of South Arabia': { power: 'British' },
  'French Guyana':            { power: 'French',   label: 'French territory' },
  'French Polynesia':         { power: 'French',   label: 'French territory' },
  'French West Africa':       { power: 'French' },
  'German Solomon Islands':   { power: 'German' },
  'German Togoland':          { power: 'German' },
  'Guadeloupe':               { power: 'French',   label: 'French territory' },
  'Hawaii':                   { power: 'American', label: 'U.S. territory' },
  'Herzegovina':              { power: 'Austro-Hungarian' },
  'Inini':                    { power: 'French',   label: 'French territory' },
  'Italian Somaliland':       { power: 'Italian' },
  'Kamerun':                  { power: 'German' },
  'Khiva':                    { power: 'Russian',  label: 'Russian protectorate' },
  'Lagos':                    { power: 'British' },
  'Martinique':               { power: 'French',   label: 'French territory' },
  'Natal':                    { power: 'British' },
  'New Caledonia and Dependencies': { power: 'French', label: 'French territory' },
  'New Guinea (German New Guinea) (Kaiser Wilhelmsland)': { power: 'German' },
  'New South Wales':          { power: 'British' },
  'Northeastern Rhodesia':    { power: 'British' },
  'Northern Nigeria':         { power: 'British' },
  'Northwestern Rhodesia':    { power: 'British' },
  'Oil Rivers Protectorate':  { power: 'British' },
  'Pahang':                   { power: 'British', label: 'British protectorate' },
  'Papua':                    { power: 'British' },
  'Perak':                    { power: 'British', label: 'British protectorate' },
  'Queensland':               { power: 'British' },
  'Reunion':                  { power: 'French',   label: 'French territory' },
  'Rwanda-Urundi':            { power: 'Belgian',  label: 'Belgian mandate' },
  'Sabah (North Borneo)':     { power: 'British' },
  'Sarawak':                  { power: 'British' },
  'Selangore':                { power: 'British', label: 'British protectorate' },
  'Solomon Islands':          { power: 'British' },
  'South Australia':          { power: 'British' },
  'Southern Nigeria':         { power: 'British' },
  'Southern Sakhalin Island': { power: 'Japanese' },
  'Southern zone of Spanish Morocco': { power: 'Spanish' },
  'Spanish Morocco':          { power: 'Spanish', label: 'Spanish protectorate' },
  'Spanish Sahara':           { power: 'Spanish' },
  'Spanish West Africa':      { power: 'Spanish' },
  'Straits Settlements':      { power: 'British' },
  'Tasmania':                 { power: 'British' },
  'Unfederated Malay States': { power: 'British', label: 'British protectorate' },
  'Victoria':                 { power: 'British' },
  'West Irian (Dutch New Guinea)': { power: 'Dutch' },
  'Western Australia':        { power: 'British' },

  // ── Time-constrained ───────────────────────────────────────────────────────
  // Same cntry_name used for both colonial and independent periods.
  // endYear = the gweyear of the colonial-period feature, so independent-period
  // features (which have a much larger gweyear) correctly return null.

  'Algeria':               { power: 'French',            endYear: 1962 },
  'Angola':                { power: 'Portuguese',         endYear: 1975 },
  'Bahamas':               { power: 'British',            endYear: 1973 },
  'Bahrain':               { power: 'British',            endYear: 1971, label: 'British protectorate' },
  'Barbados':              { power: 'British',            endYear: 1966 },
  'Belize':                { power: 'British',            endYear: 1981 },
  'Benin':                 { power: 'French',             endYear: 1960 },
  'Bosnia-Herzegovina':    { power: 'Austro-Hungarian',   endYear: 1918 },
  'Botswana':              { power: 'British',            endYear: 1966, label: 'British protectorate' },
  'Brunei':                { power: 'British',            endYear: 1984, label: 'British protectorate' },
  'Burkina Faso (Upper Volta)': { power: 'French',        endYear: 1960 },
  'Burundi':               { power: 'Belgian',            endYear: 1962 },
  'Cambodia (Kampuchea)':  { power: 'French',             endYear: 1953 },
  'Cape Verde':            { power: 'Portuguese',         endYear: 1975 },
  'Central African Republic': { power: 'French',          endYear: 1960 },
  'Chad':                  { power: 'French',             endYear: 1960 },
  'Comoros':               { power: 'French',             endYear: 1975 },
  'Congo':                 { power: 'French',             endYear: 1960 },
  'Congo, Democratic Republic of (Zaire)': { power: 'Belgian', endYear: 1960 },
  "Cote D'Ivoire":         { power: 'French',             endYear: 1960 },
  'Cuba':                  { power: 'Spanish',            endYear: 1902 },
  'Cyprus':                { power: 'British',            endYear: 1960 },
  'Danzig':                { power: 'League of Nations',  endYear: 1939, label: 'Free City (League of Nations)' },
  'Djibouti':              { power: 'French',             endYear: 1977 },
  'East Timor':            { power: 'Portuguese',         endYear: 1975 },
  'Equatorial Guinea':     { power: 'Spanish',            endYear: 1968 },
  'Eritrea':               { power: 'Italian',            endYear: 1941 },
  'Fiji':                  { power: 'British',            endYear: 1970 },
  'Gabon':                 { power: 'French',             endYear: 1960 },
  'Gambia':                { power: 'British',            endYear: 1965 },
  'Ghana':                 { power: 'British',            endYear: 1957 },
  'Guinea':                { power: 'French',             endYear: 1958 },
  'Guinea-Bissau':         { power: 'Portuguese',         endYear: 1974 },
  'Guyana':                { power: 'British',            endYear: 1966 },
  'India':                 { power: 'British',            endYear: 1947 },
  'Indonesia':             { power: 'Dutch',              endYear: 1949 },
  'Iraq':                  { power: 'British',            endYear: 1932, label: 'British mandate' },
  'Jamaica':               { power: 'British',            endYear: 1962 },
  'Jordan':                { power: 'British',            endYear: 1946, label: 'British mandate' },
  'Kenya':                 { power: 'British',            endYear: 1963 },
  'Korea':                 { power: 'Japanese',           startYear: 1910, endYear: 1945 },
  'Kuwait':                { power: 'British',            endYear: 1961, label: 'British protectorate' },
  'Laos':                  { power: 'French',             endYear: 1953 },
  'Lebanon':               { power: 'French',             endYear: 1943, label: 'French mandate' },
  'Lesotho':               { power: 'British',            endYear: 1966, label: 'British protectorate' },
  'Libya':                 { power: 'Italian',            endYear: 1943 },
  'Madagascar (Malagasy)': { power: 'French',             endYear: 1960 },
  'Malawi':                { power: 'British',            endYear: 1964 },
  'Malaysia':              { power: 'British',            endYear: 1957 },
  'Maldives':              { power: 'British',            endYear: 1965, label: 'British protectorate' },
  'Mali':                  { power: 'French',             endYear: 1960 },
  'Malta':                 { power: 'British',            endYear: 1964 },
  'Mauritania':            { power: 'French',             endYear: 1960 },
  'Mauritius':             { power: 'British',            endYear: 1968 },
  'Morocco':               { power: 'French',             endYear: 1956, label: 'French protectorate' },
  'Mozambique':            { power: 'Portuguese',         endYear: 1975 },
  'Myanmar (Burma)':       { power: 'British',            endYear: 1948 },
  'Namibia':               { power: 'South African',      endYear: 1990, label: 'South African mandate' },
  'Newfoundland':          { power: 'British',            endYear: 1949, label: 'British dominion' },
  'Niger':                 { power: 'French',             endYear: 1960 },
  'Nigeria':               { power: 'British',            endYear: 1960 },
  'Palestine':             { power: 'British',            endYear: 1948, label: 'British mandate' },
  'Papua New Guinea':      { power: 'Australian',         endYear: 1975, label: 'Australian territory' },
  'Qatar':                 { power: 'British',            endYear: 1971, label: 'British protectorate' },
  'Senegal':               { power: 'French',             endYear: 1960 },
  'Sierra Leone':          { power: 'British',            endYear: 1961 },
  'Singapore':             { power: 'British',            endYear: 1965 },
  'Sri Lanka (Ceylon)':    { power: 'British',            endYear: 1948 },
  'Sudan':                 { power: 'British',            endYear: 1956, label: 'Anglo-Egyptian condominium' },
  'Surinam':               { power: 'Dutch',              endYear: 1975 },
  'Swaziland (Eswatini)':  { power: 'British',            endYear: 1968, label: 'British protectorate' },
  'Syria':                 { power: 'French',             endYear: 1946, label: 'French mandate' },
  'Taiwan':                { power: 'Japanese',           endYear: 1945 },
  'Tanzania (Tanganyika)': { power: 'British',            endYear: 1961 },
  'Togo':                  { power: 'French',             endYear: 1960 },
  'Trinidad and Tobago':   { power: 'British',            endYear: 1962 },
  'Tunisia':               { power: 'French',             endYear: 1956, label: 'French protectorate' },
  'Uganda':                { power: 'British',            endYear: 1962 },
  'United Arab Emirates':  { power: 'British',            endYear: 1971, label: 'British protectorate' },
  'Vietnam (Annam/Cochin China/Tonkin)': { power: 'French', endYear: 1954 },
  'Zanzibar':              { power: 'British',            endYear: 1963 },
  'Zimbabwe (Rhodesia)':   { power: 'British',            endYear: 1980 },

  // ── Multi-period: same name, two different colonial masters ───────────────

  'Philippines': [
    { power: 'Spanish',  endYear: 1898 },
    { power: 'American', startYear: 1898, endYear: 1946 },
  ],
  'Puerto Rico': [
    { power: 'Spanish',  endYear: 1898 },
    { power: 'American', startYear: 1898, label: 'U.S. territory' },
  ],
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a display string like "British colony", "French mandate", etc.,
 * or null if the territory is independent during this feature's time window.
 *
 * @param {Object} props - GeoJSON feature.properties from the CShapes output
 *   Must contain: cntry_name (string), gwsyear (number), gweyear (number)
 * @returns {string|null}
 */
export function getColonialLabel(props) {
  const entry = STATUS[props.cntry_name]
  if (!entry) return null

  if (Array.isArray(entry)) {
    for (const period of entry) {
      if (_matches(period, props.gwsyear, props.gweyear)) return _label(period)
    }
    return null
  }

  return _matches(entry, props.gwsyear, props.gweyear) ? _label(entry) : null
}

function _matches(period, gwsyear, gweyear) {
  if (period.startYear && gwsyear < period.startYear) return false
  if (period.endYear   && gweyear > period.endYear)   return false
  return true
}

function _label(period) {
  return period.label ?? `${period.power} colony`
}
