import joblib
import os

try:
    print("Checking model artifacts...")
    
    # Check feature_columns.pkl
    print("\nLoading feature_columns.pkl...")
    feature_columns = joblib.load('feature_columns.pkl')
    print(f"Feature columns: {feature_columns}")
    
    # Check model_artifacts.pkl
    print("\nLoading model_artifacts.pkl...")
    artifacts = joblib.load('model_artifacts.pkl')
    
    print("\nArtifacts keys:", list(artifacts.keys()))
    
    if 'model' in artifacts:
        print("\nModel found in artifacts")
        print(f"Model type: {type(artifacts['model']).__name__}")
    else:
        print("\nModel NOT found in artifacts")
        
    if 'label_encoders' in artifacts:
        print(f"\nNumber of label encoders: {len(artifacts['label_encoders'])}")
        print("Label encoder keys:", list(artifacts['label_encoders'].keys()))
    
    if 'original_columns' in artifacts:
        print(f"\nOriginal columns: {artifacts['original_columns']}")
        
except Exception as e:
    print(f"\nError: {str(e)}")
    import traceback
    traceback.print_exc()
