
import joblib
import pandas as pd
import numpy as np
import os

MODEL_PATH = "d:/cardio/model.joblib"
SCALER_PATH = "d:/cardio/scaler.joblib"

model = None
scaler = None

def load_model():
    global model, scaler
    try:
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            print("Model and scaler loaded successfully.")
        else:
            print(f"Error: Model or scaler not found at {MODEL_PATH} or {SCALER_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")

def make_prediction(data: dict):
    if model is None or scaler is None:
        load_model()
        if model is None or scaler is None:
             raise Exception("Model not loaded. Please check file paths.")

    # Calculate BMI
    # height is in cm, weight in kg
    # bmi = weight / (height/100)**2
    height_m = data['height'] / 100
    bmi = data['weight'] / (height_m ** 2)

    # Feature order derived from notebook analysis:
    # gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, age_years, bmi
    
    features = [
        data['gender'],
        data['height'],
        data['weight'],
        data['ap_hi'],
        data['ap_lo'],
        data['cholesterol'],
        data['gluc'],
        data['smoke'],
        data['alco'],
        data['active'],
        data['age'], # acts as age_years
        bmi
    ]
    
    features_array = np.array([features])
    
    # Scale features
    # Note: If scaler was fitted on a DataFrame, it might warn about feature names, but should work with array
    try:
        scaled_features = scaler.transform(features_array)
    except Exception as e:
        print(f"Scaling error: {e}")
        # Fallback? No, crucial step.
        raise e
    
    # Predict
    prediction = model.predict(scaled_features)[0]
    raw_risk_score = model.predict_proba(scaled_features)[0][1] 
    
    # --- HEURISTIC OVERRIDES ---
    # The model sometimes undervalues high BP/Cholesterol if lifestyle factors (smoke, active) are good.
    # We enforce minimum risk floors based on medical guidelines.
    
    heuristic_floor = 0.0
    
    # Blood Pressure (Systolic)
    if data['ap_hi'] >= 180: heuristic_floor = max(heuristic_floor, 0.90) # Hypertensive Crisis
    elif data['ap_hi'] >= 160: heuristic_floor = max(heuristic_floor, 0.80) # Stage 2 Hypertension
    elif data['ap_hi'] >= 140: heuristic_floor = max(heuristic_floor, 0.50) # Stage 1 Hypertension
    elif data['ap_hi'] >= 130: heuristic_floor = max(heuristic_floor, 0.30) # Elevated
    
    # Blood Pressure (Diastolic)
    if data['ap_lo'] >= 110: heuristic_floor = max(heuristic_floor, 0.90)
    elif data['ap_lo'] >= 100: heuristic_floor = max(heuristic_floor, 0.80)
    elif data['ap_lo'] >= 90: heuristic_floor = max(heuristic_floor, 0.50)
    
    # Cholesterol (1: Normal, 2: Above Normal, 3: Well Above Normal)
    if data['cholesterol'] == 3: heuristic_floor = max(heuristic_floor, 0.60)
    elif data['cholesterol'] == 2: heuristic_floor = max(heuristic_floor, 0.35)
    
    # BMI
    if bmi >= 40: heuristic_floor = max(heuristic_floor, 0.70)
    elif bmi >= 35: heuristic_floor = max(heuristic_floor, 0.50)
    elif bmi >= 30: heuristic_floor = max(heuristic_floor, 0.30)
    
    # Rescale model score (0.10 - 0.26 -> 0.0 - 1.0)
    MIN_RAW_SCORE = 0.10
    MAX_RAW_SCORE = 0.26
    
    normalized_score = (raw_risk_score - MIN_RAW_SCORE) / (MAX_RAW_SCORE - MIN_RAW_SCORE)
    normalized_score = max(0.0, min(1.0, normalized_score))
    
    # Combine model score and heuristic floor
    # We take the MAXIMUM of the two
    # Model score mapped to 5-95%
    model_derived_risk = (normalized_score * 0.90) + 0.05
    
    risk_score = max(model_derived_risk, heuristic_floor)
    
    # Adjust prediction label based on new score
    prediction = 1 if risk_score > 0.5 else 0
    
    return int(prediction), float(risk_score)

