from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_report_pdf(report_data):
    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 50

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(50, y, "MediFirst Triage Report")

    y -= 35

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, y, "AI-assisted healthcare triage and navigation report")
    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Severity Level:")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(160, y, str(report_data.get("severity_level", "N/A")))

    y -= 25

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Severity Score:")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(160, y, str(report_data.get("severity_score", "N/A")))

    y -= 25

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Emergency:")
    pdf.setFont("Helvetica", 12)
    emergency_text = "Yes" if report_data.get("emergency_flag") else "No"
    pdf.drawString(160, y, emergency_text)

    y -= 35

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Symptoms:")
    y -= 20

    pdf.setFont("Helvetica", 11)
    symptoms = report_data.get("symptoms_text", "N/A")
    pdf.drawString(50, y, str(symptoms)[:90])

    y -= 35

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Recommendation:")
    y -= 20

    pdf.setFont("Helvetica", 11)
    recommendation = report_data.get("recommendation", "N/A")
    pdf.drawString(50, y, str(recommendation)[:90])

    y -= 35

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Suggested Care:")
    y -= 20

    pdf.setFont("Helvetica", 11)
    suggested_care = report_data.get("suggested_care", "N/A")
    pdf.drawString(50, y, str(suggested_care)[:90])

    y -= 50

    pdf.setFont("Helvetica-Oblique", 10)
    pdf.drawString(
        50,
        y,
        "Disclaimer: MediFirst provides triage support, not medical diagnosis.",
    )

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return buffer