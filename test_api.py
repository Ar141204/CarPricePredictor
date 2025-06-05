import requests
import json

# Test data
test_data = {
    "make": "BMW",
    "model": "X5",
    "year": 2020,
    "engine_hp": 300,
    "transmission_type": "AUTOMATIC",
    "driven_wheels": "all wheel drive",
    "number_of_doors": 4,
    "market_category": "Luxury",
    "vehicle_size": "Midsize",
    "vehicle_style": "4dr SUV",
    "highway_mpg": 25,
    "city_mpg": 18,
    "popularity": 1000
}

try:
    # Send POST request to the API
    response = requests.post(
        'http://127.0.0.1:5000/predict',
        json=test_data,
        headers={'Content-Type': 'application/json'}
    )
    
    # Print the response
    print("Status Code:", response.status_code)
    print("Response:", json.dumps(response.json(), indent=2))
    
except requests.exceptions.RequestException as e:
    print("Error making request:", e)
