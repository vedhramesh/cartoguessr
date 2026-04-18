import json
import os
import glob

# Process every JSON file in the current folder
for filepath in glob.glob("*.json"):
    filename = os.path.basename(filepath)
    year_str = filename.replace('.json', '')
    
    # Skip any files that aren't named as years
    if not year_str.isdigit():
        continue
        
    year = int(year_str)
    
    # The bug only exists after the USSR dissolves
    if year < 1991:
        continue

    with open(filepath, 'r') as f:
        topology = json.load(f)

    modified = False
    geometries = topology.get('objects', {}).get('countries', {}).get('geometries', [])
    
    for geo in geometries:
        if geo.get('properties', {}).get('cntry_name') == 'Armenia':
            arcs = geo.get('arcs', [])
            
            # TopoJSON structure: Polygons -> Rings -> Arcs
            for polygon in arcs:
                for ring in polygon:
                    # Enclaves/Exclaves are usually formed by a single shared arc.
                    # If it's drawn clockwise (positive), we flip it to counter-clockwise (negative).
                    if len(ring) == 1 and ring[0] >= 0:
                        ring[0] = -ring[0] - 1
                        modified = True
            
    if modified:
        with open(filepath, 'w') as f:
            # separators=(',', ':') removes whitespace to keep the JSON files minified and fast to load
            json.dump(topology, f, separators=(',', ':'))
        print(f"✅ Fixed Armenia in {filename}")

print("All files processed!")