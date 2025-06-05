import csv
import json
from collections import defaultdict
import os

# Read the CSV file
makes_models = defaultdict(set)

with open(os.path.join('..', 'data.csv'), 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        make = row['Make'].strip()
        model = row['Model'].strip()
        if make and model:  # Only add if both make and model exist
            makes_models[make].add(model)

# Convert sets to sorted lists
result = {}
for make in sorted(makes_models.keys()):
    result[make] = sorted(list(makes_models[make]))

# Create the output directory if it doesn't exist
output_dir = os.path.join('..', 'frontend', 'src', 'data')
os.makedirs(output_dir, exist_ok=True)

# Write to a JSON file
output_path = os.path.join(output_dir, 'carMakesModels.json')
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2)

print(f'Successfully extracted {len(result)} makes and their models to {output_path}')
