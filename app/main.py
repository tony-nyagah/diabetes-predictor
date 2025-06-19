from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import pickle
import numpy as np
import os


class PatientData(BaseModel):
    age: float
    sex: float
    bmi: float
    bp: float  # blood pressure
    s1: float  # serum measurement 1
    s2: float  # serum measurement 2
    s3: float  # serum measurement 3
    s4: float  # serum measurement 4
    s5: float  # serum measurement 5
    s6: float  # serum measurement 6

    class Config:
        schema_extra = {
            "example": {
                "age": 0.05,
                "sex": 0.05,
                "bmi": 0.06,
                "bp": 0.02,
                "s1": -0.04,
                "s2": -0.04,
                "s3": -0.02,
                "s4": -0.01,
                "s5": 0.01,
                "s6": 0.02,
            }
        }


# Initialize FastAPI app
app = FastAPI(
    title="Diabetes Progression Predictor",
    description="Predicts diabetes progression score from physiological features. Built by Antony Nyagah (https://antonynyagah.com)",
    version="1.0.0",
    contact={
        "name": "Antony Nyagah",
        "url": "https://antonynyagah.com",
    },
)

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load the trained model
model_path = os.path.join("models", "diabetes_model.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/health")
def health_check():
    return {"status": "healthy", "model": "diabetes_progression_v1"}


@app.post("/predict")
def predict_progression(patient: PatientData):
    """
    Predict diabetes progression score (API endpoint)
    """
    # Convert input to numpy array
    features = np.array(
        [
            [
                patient.age,
                patient.sex,
                patient.bmi,
                patient.bp,
                patient.s1,
                patient.s2,
                patient.s3,
                patient.s4,
                patient.s5,
                patient.s6,
            ]
        ]
    )

    # Make prediction
    prediction = model.predict(features)[0]

    # Return result with additional context
    return {
        "predicted_progression_score": round(prediction, 2),
        "interpretation": get_interpretation(prediction),
    }


@app.post("/predict-form", response_class=HTMLResponse)
def predict_form(
    request: Request,
    age: float = Form(...),
    sex: float = Form(...),
    bmi: float = Form(...),
    bp: float = Form(...),
    s1: float = Form(...),
    s2: float = Form(...),
    s3: float = Form(...),
    s4: float = Form(...),
    s5: float = Form(...),
    s6: float = Form(...),
):
    """
    Predict diabetes progression score (form submission)
    """
    # Convert input to numpy array
    features = np.array([[age, sex, bmi, bp, s1, s2, s3, s4, s5, s6]])

    # Make prediction
    prediction = model.predict(features)[0]

    # Return result with template
    return templates.TemplateResponse(
        "result.html",
        {
            "request": request,
            "prediction": round(prediction, 2),
            "interpretation": get_interpretation(prediction),
            "patient_data": {
                "age": age,
                "sex": sex,
                "bmi": bmi,
                "bp": bp,
                "s1": s1,
                "s2": s2,
                "s3": s3,
                "s4": s4,
                "s5": s5,
                "s6": s6,
            },
        },
    )


def get_interpretation(score: int | float) -> str:
    """Provide human-readable interpretation of the score"""
    if score < 100:
        return "Below average progression"
    elif score < 150:
        return "Average progression"
    else:
        return "Above average progression"


def get_risk_level(score: int | float) -> str:
    """Get risk level for styling"""
    if score < 100:
        return "low"
    elif score < 150:
        return "medium"
    else:
        return "high"
