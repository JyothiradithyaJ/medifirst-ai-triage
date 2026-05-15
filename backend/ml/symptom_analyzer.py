from rapidfuzz import fuzz, process

EMERGENCY_KEYWORDS = {
    "chest pain": 40,
    "breathlessness": 40,
    "difficulty breathing": 40,
    "shortness of breath": 40,
    "seizure": 45,
    "seizures": 45,
    "unconscious": 50,
    "unconsciousness": 50,
    "blood vomiting": 45,
    "vomiting blood": 45,
    "severe bleeding": 45,
    "stroke": 50,
    "paralysis": 45,
    "sudden weakness": 40,
    "blue lips": 45,
    "severe allergic reaction": 45,
}

COMMON_SYMPTOMS = [
    "fever",
    "cough",
    "cold",
    "headache",
    "stomach pain",
    "abdominal pain",
    "vomiting",
    "diarrhea",
    "dizziness",
    "fatigue",
    "body pain",
    "chest pain",
    "breathlessness",
    "difficulty breathing",
    "sore throat",
    "rash",
    "wound",
    "burn",
    "back pain",
    "joint pain",
    "nausea",
    "weakness",
    "seizure",
    "unconsciousness",
    "blood vomiting",
]

def normalize_text(text):
    if not text:
        return ""

    return text.lower().strip()


def detect_emergency_keywords(text):
    normalized_text = normalize_text(text)
    detected = []
    emergency_score = 0

    for keyword, score in EMERGENCY_KEYWORDS.items():
        if keyword in normalized_text:
            detected.append(keyword)
            emergency_score += score

    return {
        "has_emergency": len(detected) > 0,
        "emergency_keywords": detected,
        "emergency_score": emergency_score,
    }


def extract_symptoms(text, min_score=85):
    normalized_text = normalize_text(text)

    if not normalized_text:
        return []

    detected_symptoms = set()

    for symptom in COMMON_SYMPTOMS:
        if symptom in normalized_text:
            detected_symptoms.add(symptom)

    words = normalized_text.replace(",", " ").replace(".", " ").split()
    candidates = []

    for size in (1, 2, 3):
        for index in range(len(words) - size + 1):
            candidates.append(" ".join(words[index:index + size]))

    for candidate in candidates:
        match = process.extractOne(
            candidate,
            COMMON_SYMPTOMS,
            scorer=fuzz.ratio,
        )

        if match and match[1] >= min_score:
            detected_symptoms.add(match[0])

    return list(detected_symptoms)


def analyze_symptoms(text):
    extracted_symptoms = extract_symptoms(text)
    emergency_data = detect_emergency_keywords(text)

    return {
        "input_text": text,
        "extracted_symptoms": extracted_symptoms,
        "has_emergency": emergency_data["has_emergency"],
        "emergency_keywords": emergency_data["emergency_keywords"],
        "emergency_score": emergency_data["emergency_score"],
    }

