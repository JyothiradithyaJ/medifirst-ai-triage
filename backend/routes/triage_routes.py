from flask import Blueprint, jsonify, request
from backend.ml.triage_engine import triage_patient


triage_bp = Blueprint("triage", __name__, url_prefix="/api/triage")


@triage_bp.route("/analyze", methods=["POST"])
def analyze_triage():
    data = request.get_json() or {}

    symptoms_text = data.get("symptoms_text", "")
    selected_symptoms = data.get("selected_symptoms", [])
    body_areas = data.get("body_areas", [])
    rural_mode = data.get("rural_mode", False)

    if not symptoms_text and not selected_symptoms:
        return jsonify({
            "error": "Please provide symptoms text or selected symptoms."
        }), 400

    result = triage_patient(
        symptoms_text=symptoms_text,
        selected_symptoms=selected_symptoms,
        body_areas=body_areas,
        rural_mode=rural_mode,
    )

    return jsonify({
        "message": "Triage analysis completed successfully.",
        "result": result,
    }), 200