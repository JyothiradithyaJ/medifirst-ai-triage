from datetime import datetime
from backend.database.db import db


class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    symptoms_text = db.Column(db.Text, nullable=False)
    selected_symptoms = db.Column(db.Text, nullable=True)
    body_areas = db.Column(db.Text, nullable=True)

    severity_score = db.Column(db.Integer, nullable=False, default=0)
    severity_level = db.Column(db.String(50), nullable=False, default="low")
    emergency_flag = db.Column(db.Boolean, nullable=False, default=False)

    recommendation = db.Column(db.Text, nullable=False)
    precautions = db.Column(db.Text, nullable=True)
    suggested_care = db.Column(db.String(120), nullable=True)

    language = db.Column(db.String(30), nullable=False, default="english")
    rural_mode = db.Column(db.Boolean, nullable=False, default=False)

    image_path = db.Column(db.String(255), nullable=True)

    sync_status = db.Column(db.String(30), nullable=False, default="synced")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    patient = db.relationship("Patient", backref="reports")
    user = db.relationship("User", backref="reports")

    def to_dict(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "user_id": self.user_id,
            "symptoms_text": self.symptoms_text,
            "selected_symptoms": self.selected_symptoms,
            "body_areas": self.body_areas,
            "severity_score": self.severity_score,
            "severity_level": self.severity_level,
            "emergency_flag": self.emergency_flag,
            "recommendation": self.recommendation,
            "precautions": self.precautions,
            "suggested_care": self.suggested_care,
            "language": self.language,
            "rural_mode": self.rural_mode,
            "image_path": self.image_path,
            "sync_status": self.sync_status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }