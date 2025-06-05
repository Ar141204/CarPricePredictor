# Car Prediction Model

This directory contains the backend code and model artifacts for the Car Price Prediction system.

## Model Artifacts

The `model_artifacts/` directory contains the following files:

- `model_artifacts.pkl` (33.7 MB) - The trained machine learning model for car price prediction
- `feature_columns.pkl` (210 bytes) - Feature column definitions and preprocessing information

## Setup

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   
   If you don't have a requirements.txt, install the required packages:
   ```bash
   pip install pandas scikit-learn flask flask-cors joblib
   ```

## Training the Model

To train a new model:

```bash
python train_model.py
```

This will:
1. Load and preprocess the training data from `data.csv`
2. Train a new model
3. Save the model artifacts to the `model_artifacts/` directory

## Running the API

Start the Flask API server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `POST /predict` - Make predictions using the trained model
- `GET /model_info` - Get information about the current model

## Model Information

- **Model Type**: [Add model type, e.g., Random Forest, XGBoost, etc.]
- **Features Used**: [List the input features]
- **Target Variable**: [Target variable being predicted]
- **Training Data**: `data.csv`
- **Last Trained**: [Add training date]
- **Performance**: [Add model performance metrics if available]

## Notes

- The `model_artifacts/` directory is ignored by Git due to the large file size
- To get the model, either:
  1. Train it using the instructions above, or
  2. Download the artifacts from [provide link if available]

## Testing

Run the test script to verify the API:

```bash
python test_api.py
```

## Dependencies

- Python 3.7+
- pandas
- scikit-learn
- Flask
- joblib
- flask-cors

## License

[Add your license information here]
