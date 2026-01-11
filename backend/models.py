from pydantic import BaseModel

class HealthCheckRequest(BaseModel):
    age: int
    gender: int
    height: int
    weight: float
    ap_hi: int
    ap_lo: int
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

class HealthCheckResponse(BaseModel):
    risk_score: float
    prediction: int
