from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS with explicit settings
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Global variables for model and artifacts
model = None
label_encoders = None
feature_columns = None
original_columns = None

def load_model_artifacts():
    """Load the trained model and preprocessing artifacts."""
    global model, label_encoders, feature_columns, original_columns
    
    try:
        logger.info("Loading model artifacts...")
        
        # Load the model and artifacts
        if not os.path.exists('model_artifacts.pkl') or not os.path.exists('feature_columns.pkl'):
            logger.error("Required model files not found. Please train the model first.")
            return False
            
        artifacts = joblib.load('model_artifacts.pkl')
        logger.info("Loaded model_artifacts.pkl")
        
        model = artifacts.get('model')
        label_encoders = artifacts.get('label_encoders', {})
        original_columns = artifacts.get('original_columns', [])
        
        # Load feature columns
        feature_columns = joblib.load('feature_columns.pkl')
        logger.info(f"Loaded feature columns: {feature_columns}")
        
        if model is None or not feature_columns:
            logger.error("Failed to load required model components")
            return False
            
        logger.info("Model and artifacts loaded successfully")
        logger.info(f"Model type: {type(model).__name__}")
        logger.info(f"Number of label encoders: {len(label_encoders)}")
        logger.info(f"Number of feature columns: {len(feature_columns)}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error loading model artifacts: {str(e)}", exc_info=True)
        return False

def preprocess_input(input_data):
    """Preprocess the input data to match the model's training format."""
    try:
        # Create a DataFrame with the input data
        df = pd.DataFrame([input_data])
        
        # Convert column names to match training data format
        df.columns = [col.lower().replace(' ', '_') for col in df.columns]
        
        # Apply the same preprocessing as in training
        categorical_cols = ['make', 'model', 'engine_fuel_type', 'transmission_type', 
                          'driven_wheels', 'market_category', 'vehicle_size', 'vehicle_style']
        
        # Label encode categorical variables
        for col in categorical_cols:
            if col in df.columns and col in label_encoders:
                # Handle unknown categories by using a default value
                le = label_encoders[col]
                df[col] = df[col].apply(lambda x: x.lower().replace(' ', '_'))
                mask = ~df[col].isin(le.classes_)
                if mask.any():
                    # Replace unknown categories with the most frequent category
                    df.loc[mask, col] = le.classes_[0]
                df[col] = le.transform(df[col])
        
        # Ensure all required columns are present
        for col in feature_columns:
            if col not in df.columns:
                # Add missing columns with default values
                if col in categorical_cols:
                    df[col] = 0  # Default to first category
                else:
                    df[col] = 0.0  # Default numeric value
        
        # Reorder columns to match training data
        df = df[feature_columns]
        
        return df
    except Exception as e:
        logger.error(f"Error in preprocessing: {str(e)}")
        raise

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests."""
    try:
        # Get data from request
        if not request.is_json:
            return jsonify({
                'status': 'error',
                'message': 'Request must be JSON'
            }), 400
            
        data = request.json
        logger.info(f"Received prediction request: {data}")
        
        # Validate required fields
        required_fields = ['make', 'model', 'year', 'engine_hp', 'transmission_type']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'status': 'error',
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
            
        # Ensure model is loaded
        if model is None or not feature_columns:
            logger.error("Model not loaded")
            return jsonify({
                'status': 'error',
                'message': 'Model not loaded. Please try again later.'
            }), 503
        
        # Preprocess the input data
        processed_data = preprocess_input(data)
        
        # Make prediction
        prediction = model.predict(processed_data)
        
        # Format the prediction
        predicted_price = float(prediction[0])
        
        # Log the prediction
        logger.info(f"Prediction successful: ${predicted_price:,.2f}")
        
        # Return the prediction
        return jsonify({
            'status': 'success',
            'prediction': predicted_price,
            'formatted_prediction': f"${predicted_price:,.2f}",
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        error_msg = f"Prediction error: {str(e)}"
        logger.error(error_msg)
        return jsonify({
            'status': 'error',
            'message': 'Failed to process prediction',
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded'
        }), 503
    
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    logger.info("Starting application...")
    if not load_model_artifacts():
        logger.error("Failed to load model artifacts. Exiting...")
        exit(1)
    else:
        port = int(os.environ.get('PORT', 5000))
        logger.info(f"Starting Flask server on port {port}...")
        app.run(debug=False, host='0.0.0.0', port=port)
