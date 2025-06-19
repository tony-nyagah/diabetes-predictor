# Diabetes Progression Predictor

A web app that predicts diabetes progression using machine learning. Built with FastAPI and scikit-learn.

## Features

- Web interface for diabetes progression prediction
- Random Forest model trained on clinical data
- REST API for programmatic access
- Responsive design with data validation

## Quick Start

### Local Development

You can fork this repository and run it locally using the following steps:

```bash
# Clone and install
git clone <your-repo-url>
cd diabetes-progression-predictor
uv sync

# Train model
uv run python train_model.py

# Start server
uv run uvicorn app.main:app --reload

# Visit http://localhost:8000
```

### Docker (from GitHub Container Registry)

```bash
# Pull and run the latest image
docker run -p 8000:8000 ghcr.io/tony-nyagah/diabetes-progression-predictor:latest

# Or use Docker Compose with the registry image
docker-compose pull
docker-compose up
```

### Building locally

```bash
# Build and run locally
docker build -t diabetes-progression-predictor .
docker run -p 8000:8000 diabetes-progression-predictor

# Or use Docker Compose for local development
docker-compose -f docker-compose.dev.yaml up
```

## API Usage

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 0.05, "sex": 0.05, "bmi": 0.06, "bp": 0.02,
    "s1": -0.04, "s2": -0.03, "s3": -0.02, "s4": -0.01,
    "s5": 0.01, "s6": 0.02
  }'
```

## Input Data

All values are normalized physiological measurements:

- `age`: Patient age
- `sex`: Biological sex
- `bmi`: Body mass index
- `bp`: Blood pressure
- `s1-s6`: Serum measurements

## Model

- **Algorithm**: Random Forest Regressor
- **Dataset**: 442 diabetes patients
- **Output**: Progression score (higher = more progression)

## Requirements

- Python 3.13+
- Dependencies in `pyproject.toml`

## License

MIT
