import json
from flask import Blueprint, jsonify, request, send_file
from flask_jwt_extended import get_jwt_identity, jwt_required

from backend.database.db import db
from backend.models.report import Report
from backend.utils.pdf_generator import generate_report_pdf


report_bp = Blueprint("reports", __name__, url_prefix="/api/reports")


@report_bp.route("/", methods=["POST"])
@jwt_required(optional=True)
def create_report():
    data = request.get_json() or {}

    symptoms_text = data.get("symptoms_text", "")
    selected_symptoms = data.get("selected_symptoms", [])
    body_areas = data.get("body_areas", [])
    severity_score = data.get("severity_score", 0)
    severity_level = data.get("severity_level", "low")
    emergency_flag = data.get("emergency_flag", False)
    recommendation = data.get("recommendation", "")
    precautions = data.get("precautions", [])
    suggested_care = data.get("suggested_care", "")
    language = data.get("language", "english")
    rural_mode = data.get("rural_mode", False)
    patient_id = data.get("patient_id")

    if not symptoms_text:
        return jsonify({"error": "Symptoms text is required."}), 400

    if not recommendation:
        return jsonify({"error": "Recommendation is required."}), 400

    report = Report(
        patient_id=patient_id,
        user_id=get_jwt_identity(),
        symptoms_text=symptoms_text,
        selected_symptoms=json.dumps(selected_symptoms),
        body_areas=json.dumps(body_areas),
        severity_score=severity_score,
        severity_level=severity_level,
        emergency_flag=emergency_flag,
        recommendation=recommendation,
        precautions=json.dumps(precautions),
        suggested_care=suggested_care,
        language=language,
        rural_mode=rural_mode,
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message": "Report saved successfully.",
        "report": report.to_dict(),
    }), 201


@report_bp.route("/", methods=["GET"])
@jwt_required(optional=True)
def get_reports():
    current_user_id = get_jwt_identity()
    query = Report.query.order_by(Report.created_at.desc())

    if current_user_id:
        query = query.filter_by(user_id=current_user_id)

    reports = query.all()

    return jsonify({
        "reports": [report.to_dict() for report in reports],
    }), 200


@report_bp.route("/<int:report_id>", methods=["GET"])
@jwt_required(optional=True)
def get_report(report_id):
    report = Report.query.get(report_id)

    if not report:
        return jsonify({"error": "Report not found."}), 404

    return jsonify({"report": report.to_dict()}), 200


@report_bp.route("/<int:report_id>/download", methods=["GET"])
@jwt_required(optional=True)
def download_report(report_id):
    report = Report.query.get(report_id)

    if not report:
        return jsonify({"error": "Report not found."}), 404

    pdf_buffer = generate_report_pdf(report.to_dict())

    return send_file(
        pdf_buffer,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=f"medifirst-report-{report.id}.pdf",
    )
