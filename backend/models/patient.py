from datetime import datetime
from backend.database.db import db


class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(30), nullable=True)
    village = db.Column(db.String(120), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    creator = db.relationship("User", backref="patients")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "village": self.village,
            "phone": self.phone,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }