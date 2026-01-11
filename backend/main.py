
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import HealthCheckRequest, HealthCheckResponse
from prediction import make_prediction, load_model

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    load_model()
    yield
    # Shutdown (if needed)

app = FastAPI(lifespan=lifespan)

# Allow CORS for frontend
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=HealthCheckResponse)
def predict_health(request: HealthCheckRequest):
    try:
        data = request.dict()
        prediction, risk_score = make_prediction(data)
        
        # risk_score is probability (0.0 to 1.0)
        # Convert to percentage (0 to 100)
        risk_percentage = risk_score * 100
        
        return HealthCheckResponse(risk_score=risk_percentage, prediction=prediction)
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
