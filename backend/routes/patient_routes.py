from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from backend.database.db import db
from backend.models.patient import Patient


patient_bp = Blueprint("patients", __name__, url_prefix="/api/patients")


@patient_bp.route("/", methods=["POST"])
@jwt_required(optional=True)
def create_patient():
    data = request.get_json() or {}

    name = data.get("name", "").strip()

    if not name:
        return jsonify({"error": "Patient name is required."}), 400

    patient = Patient(
        name=name,
        age=data.get("age"),
        gender=data.get("gender"),
        village=data.get("village"),
        phone=data.get("phone"),
        created_by=get_jwt_identity(),
    )

    db.session.add(patient)
    db.session.commit()

    return jsonify({
        "message": "Patient created successfully.",
        "patient": patient.to_dict(),
    }), 201


@patient_bp.route("/", methods=["GET"])
@jwt_required(optional=True)
def get_patients():
    current_user_id = get_jwt_identity()
    query = Patient.query.order_by(Patient.created_at.desc())

    if current_user_id:
        query = query.filter_by(created_by=current_user_id)

    patients = query.all()

    return jsonify({
        "patients": [patient.to_dict() for patient in patients],
    }), 200


@patient_bp.route("/<int:patient_id>", methods=["GET"])
@jwt_required(optional=True)
def get_patient(patient_id):
    patient = Patient.query.get(patient_id)

    if not patient:
        return jsonify({"error": "Patient not found."}), 404

    return jsonify({"patient": patient.to_dict()}), 200
