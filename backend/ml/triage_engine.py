from backend.ml.symptom_analyzer import analyze_symptoms


def get_severity_level(score, has_emergency):
    if has_emergency:
        return "emergency"

    if score >= 60:
        return "high"

    if score >= 30:
        return "moderate"

    return "low"


def get_recommendation(severity_level):
    if severity_level == "emergency":
        return "Seek emergency medical help immediately."

    if severity_level == "high":
        return "Visit a doctor or nearest hospital as soon as possible."

    if severity_level == "moderate":
        return "Visit a nearby PHC or clinic within 24 hours if symptoms continue."

    return "Rest, drink fluids, and monitor symptoms at home."


def get_precautions(severity_level):
    if severity_level == "emergency":
        return [
            "Call emergency services immediately.",
            "Do not leave the patient alone.",
            "Avoid giving food or water if the patient is unconscious.",
        ]

    if severity_level == "high":
        return [
            "Avoid self-medication.",
            "Arrange transport to a healthcare center.",
            "Monitor breathing, fever, pain, and weakness.",
        ]

    if severity_level == "moderate":
        return [
            "Rest properly.",
            "Drink enough water.",
            "Visit a PHC if symptoms worsen.",
        ]

    return [
        "Take rest.",
        "Stay hydrated.",
        "Seek medical help if symptoms become worse.",
    ]


def calculate_score(symptoms, emergency_score):
    score = len(symptoms) * 10
    score += emergency_score

    if score > 100:
        score = 100

    return score


def triage_patient(symptoms_text, selected_symptoms=None, body_areas=None, rural_mode=False):
    selected_symptoms = selected_symptoms or []
    body_areas = body_areas or []

    analysis = analyze_symptoms(symptoms_text)

    all_symptoms = analysis["extracted_symptoms"] + selected_symptoms
    all_symptoms = list(set(all_symptoms))

    score = calculate_score(
        all_symptoms,
        analysis["emergency_score"],
    )

    severity_level = get_severity_level(
        score,
        analysis["has_emergency"],
    )

    return {
        "symptoms": all_symptoms,
        "body_areas": body_areas,
        "severity_score": score,
        "severity_level": severity_level,
        "emergency_flag": analysis["has_emergency"],
        "emergency_keywords": analysis["emergency_keywords"],
        "recommendation": get_recommendation(severity_level),
        "precautions": get_precautions(severity_level),
        "suggested_care": get_recommendation(severity_level),
        "rural_mode": rural_mode,
        "disclaimer": "MediFirst is an AI-assisted triage tool, not a medical diagnosis system.",
    }