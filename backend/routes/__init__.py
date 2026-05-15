from backend.routes.auth_routes import auth_bp
from backend.routes.triage_routes import triage_bp
from backend.routes.report_routes import report_bp
from backend.routes.healthcare_routes import healthcare_bp
from backend.routes.patient_routes import patient_bp

__all__ = [
    "auth_bp",
    "triage_bp",
    "report_bp",
    "healthcare_bp",
    "patient_bp",
]
