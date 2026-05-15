import os
import joblib


MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "severity_model.pkl",
)


def load_model():
    if not os.path.exists(MODEL_PATH):
        return None

    return joblib.load(MODEL_PATH)


def predict_severity(features):
    model = load_model()

    if model is None:
        return None

    return model.predict([features])[0]