from flask import Blueprint, jsonify, request


healthcare_bp = Blueprint("healthcare", __name__, url_prefix="/api/healthcare")


@healthcare_bp.route("/nearby", methods=["GET"])
def get_nearby_healthcare():
    latitude = request.args.get("lat")
    longitude = request.args.get("lng")

    centers = [
        {
            "id": 1,
            "name": "Primary Health Centre",
            "type": "PHC",
            "distance": "1.8 km",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "emergency": False,
        },
        {
            "id": 2,
            "name": "Community Health Clinic",
            "type": "Clinic",
            "distance": "3.2 km",
            "latitude": 12.9816,
            "longitude": 77.6046,
            "emergency": False,
        },
        {
            "id": 3,
            "name": "Government Emergency Hospital",
            "type": "Emergency Hospital",
            "distance": "5.5 km",
            "latitude": 12.9616,
            "longitude": 77.5846,
            "emergency": True,
        },
    ]

    return jsonify({
        "message": "Nearby healthcare centers fetched successfully.",
        "user_location": {
            "latitude": latitude,
            "longitude": longitude,
        },
        "centers": centers,
    }), 200