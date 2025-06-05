import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

# Load and preprocess data based on the notebook
def load_and_preprocess_data(filepath):
    # Load the data
    df = pd.read_csv(filepath)
    
    # Rename columns to be more consistent (lowercase, underscores)
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    
    # Select relevant columns based on notebook analysis
    df = df[['make', 'model', 'year', 'engine_fuel_type', 'engine_hp',
             'engine_cylinders', 'transmission_type', 'driven_wheels',
             'number_of_doors', 'market_category', 'vehicle_size',
             'vehicle_style', 'highway_mpg', 'city_mpg', 'popularity', 'msrp']]
    
    # Handle missing values
    df = df.dropna()
    
    # Convert categorical columns to lowercase and replace spaces with underscores
    categorical_cols = ['make', 'model', 'engine_fuel_type', 'transmission_type', 
                       'driven_wheels', 'market_category', 'vehicle_size', 'vehicle_style']
    
    for col in categorical_cols:
        df[col] = df[col].astype(str).str.lower().str.replace(' ', '_')
    
    # Create a copy of the dataframe for label encoding
    df_encoded = df.copy()
    le_dict = {}
    
    # Label encode categorical variables
    for col in categorical_cols:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df[col])
        le_dict[col] = le
    
    # Define features and target
    features = ['year', 'engine_hp', 'engine_cylinders', 'number_of_doors', 
               'highway_mpg', 'city_mpg', 'popularity'] + categorical_cols
    
    # Ensure all feature columns exist
    features = [f for f in features if f in df_encoded.columns]
    target = 'msrp'
    
    X = df_encoded[features]
    y = df_encoded[target]
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Save the column order for later use in prediction
    feature_columns = X.columns.tolist()
    joblib.dump(feature_columns, 'feature_columns.pkl')
    
    return X_train, X_test, y_train, y_test, le_dict, df.columns.tolist()

def train_and_save_model():
    # Path to the data file
    data_path = '../data.csv'
    
    try:
        print("Loading and preprocessing data...")
        X_train, X_test, y_train, y_test, le_dict, original_columns = load_and_preprocess_data(data_path)
        
        print("Training model...")
        # Use better hyperparameters based on the notebook analysis
        model = RandomForestRegressor(
            n_estimators=200,
            max_depth=20,
            min_samples_split=5,
            min_samples_leaf=2,
            max_features='sqrt',
            random_state=42,
            n_jobs=-1  # Use all CPU cores
        )
        
        # Train the model
        model.fit(X_train, y_train)
        
        # Make predictions
        y_train_pred = model.predict(X_train)
        y_test_pred = model.predict(X_test)
        
        # Calculate metrics
        train_r2 = r2_score(y_train, y_train_pred)
        test_r2 = r2_score(y_test, y_test_pred)
        train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
        test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
        
        # Print metrics
        print("\nModel Training Complete!")
        print(f"Train R²: {train_r2:.4f}")
        print(f"Test R²: {test_r2:.4f}")
        print(f"Train RMSE: {train_rmse:.2f}")
        print(f"Test RMSE: {test_rmse:.2f}")
        
        # Save model and artifacts
        print("\nSaving model and artifacts...")
        artifacts = {
            'model': model,
            'label_encoders': le_dict,
            'original_columns': original_columns,
            'feature_importances': dict(zip(X_train.columns, model.feature_importances_))
        }
        
        joblib.dump(artifacts, 'model_artifacts.pkl')
        print("Model and artifacts saved successfully!")
        
        # Print feature importances
        print("\nFeature Importances:")
        for feature, importance in sorted(artifacts['feature_importances'].items(), 
                                       key=lambda x: x[1], reverse=True):
            print(f"{feature}: {importance:.4f}")
        
    except Exception as e:
        print(f"Error training model: {str(e)}")
        raise

if __name__ == "__main__":
    train_and_save_model()
