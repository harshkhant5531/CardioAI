import joblib
import numpy as np

def run():
    try:
        scaler = joblib.load('d:/cardio/scaler.joblib')
        model = joblib.load('d:/cardio/model.joblib')
        
        input_healthy = {
            'gender': 1, 'height': 170, 'weight': 60, 
            'ap_hi': 110, 'ap_lo': 70, 
            'cholesterol': 1, 'gluc': 1, 
            'smoke': 0, 'alco': 0, 'active': 1, 
            'age': 20, 'bmi': 60/((1.7)**2) # ~20.7
        }

        with open('d:/cardio/backend/min_risk.txt', 'w') as f:
            def predict(data, label):
                features = [
                    data['gender'], data['height'], data['weight'],
                    data['ap_hi'], data['ap_lo'], data['cholesterol'],
                    data['gluc'], data['smoke'], data['alco'],
                    data['active'], data['age'], data['bmi']
                ]
                f_arr = np.array([features])
                scaled = scaler.transform(f_arr)
                prob = model.predict_proba(scaled)[0][1]
                f.write(f"{label}: {prob * 100:.2f}%\n")
                return prob * 100

            predict(input_healthy, "Healthy Inputs")
            
    except Exception as e:
         with open('d:/cardio/backend/min_risk.txt', 'w') as f:
            f.write(f"Error: {e}")

if __name__ == "__main__":
    run()
