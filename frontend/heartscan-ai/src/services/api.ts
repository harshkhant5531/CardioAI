
export interface HealthData {
    age: number;
    gender: number;
    height: number;
    weight: number;
    ap_hi: number;
    ap_lo: number;
    cholesterol: number;
    gluc: number;
    smoke: number;
    alco: number;
    active: number;
}

export interface PredictionResult {
    risk_score: number;
    prediction: number;
}

// http://localhost:8000

const API_URL = import.meta.env.VITE_CARDIO_API_URL;

export const predictHealthRisk = async (data: HealthData): Promise<PredictionResult> => {
    const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch prediction');
    }

    return response.json();
};
