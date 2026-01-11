from prediction import make_prediction, load_model
import sys

# Ensure we're running from the right directory context if needed, 
# but usually Cwd in run_command handles it.

try:
    print("Loading model...")
    load_model()

    # The inputs that previously gave 12% (Low Risk)
    data = {
        'gender': 2, 'height': 175, 'weight': 95.2, # BMI ~31.1
        'ap_hi': 165, 'ap_lo': 105, 
        'cholesterol': 2, 'gluc': 1, 'smoke': 0, 'alco': 0, 'active': 1, 
        'age': 60
    }

    print("Making prediction...")
    pred, score = make_prediction(data)
    print(f"Prediction: {pred}")
    print(f"Risk Score: {score * 100:.2f}%")
    
    # Validation
    if score >= 0.80:
        print("SUCCESS: Risk score appropriately high.")
    else:
        print("FAILURE: Risk score still too low.")

except Exception as e:
    print(f"Error: {e}")
