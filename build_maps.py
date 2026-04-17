import json
import os
from geojson_rewind import rewind
import topojson as tp # <-- Added TopoJSON library

# Configuration
START_YEAR = 1886
END_YEAR = 2019
MASTER_GEOJSON_FILE = 'CShapes-2.0.geojson' 
GEOJSON_OUTPUT_DIR = '/Users/vedh/Desktop/cartoguessr/public/geojson' 
JS_CATALOG_FILE = 'mapCatalog.js'

def is_active_in_year(feature, target_year):
    """Checks if a geographic feature existed during the target year."""
    props = feature.get("properties", {})
    
    if "gwsyear" in props and "gweyear" in props:
        return props["gwsyear"] <= target_year <= props["gweyear"]
        
    start_date = props.get("gwsdate")
    end_date = props.get("gwedate")
    
    if start_date and end_date:
        try:
            start_year = int(str(start_date).split('-')[0])
            end_year = int(str(end_date).split('-')[0])
            return start_year <= target_year <= end_year
        except ValueError:
            pass
            
    return False

def generate_js_catalog(start_year, end_year):
    """Generates the JS file containing the dynamic map catalog."""
    js_content = f"""/**
 * GEOJSON DATA CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 * AUTO-GENERATED FILE. Do not edit the MAP_CATALOG array manually.
 */

// Dynamically generate the catalog for every year from {start_year} to {end_year}
export const MAP_CATALOG = Array.from({{ length: {end_year} - {start_year} + 1 }}, (_, i) => {{
  const year = {start_year} + i;
  return {{
    year: year,
    geojsonPath: `/cartoguessr/geojson/${{year}}.json`,
    label: `World, ${{year}}`
  }};
}});

// Min/max year for the slider
export const YEAR_MIN = MAP_CATALOG[0].year;
export const YEAR_MAX = MAP_CATALOG[MAP_CATALOG.length - 1].year;
"""
    with open(JS_CATALOG_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Generated {JS_CATALOG_FILE} successfully.")

def main():
    print(f"Loading master GeoJSON from {MASTER_GEOJSON_FILE}...")
    
    try:
        with open(MASTER_GEOJSON_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find '{MASTER_GEOJSON_FILE}'.")
        return

    os.makedirs(GEOJSON_OUTPUT_DIR, exist_ok=True)
    features = data.get("features", [])
    print(f"Loaded {len(features)} total historical features. Slicing and rewinding maps...\n")

    for year in range(START_YEAR, END_YEAR + 1):
        yearly_features = [f for f in features if is_active_in_year(f, year)]
        
        yearly_geojson = {
            "type": "FeatureCollection",
            "features": yearly_features
        }
        
        # ---> THE FIX: Rewind the coordinates to standard counter-clockwise
        yearly_geojson = rewind(yearly_geojson, rfc7946=True)
        
        output_path = os.path.join(GEOJSON_OUTPUT_DIR, f"{year}.json")
        
        # ---> TOPOJSON UPGRADE: Compress the geojson into a topology map
        topo = tp.Topology(yearly_geojson, object_name="countries")
        
        # Save the compressed dictionary to the file, stripping whitespace
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(topo.to_dict(), f, separators=(',', ':'))
            
    print(f"Finished generating maps up to {END_YEAR}.")
    generate_js_catalog(START_YEAR, END_YEAR)

if __name__ == "__main__":
    main()