from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from datetime import datetime

class ReportGenerator:
    def __init__(self, data):
        """
        Expects a dictionary containing: 
        verdict, score, domain, urls, ips, and reasons.
        """
        self.data = data
        self.filename = f"reports/Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    def generate(self):
        # Create folder if it doesn't exist (handle this in app.py)
        c = canvas.Canvas(self.filename, pagesize=letter)
        width, height = letter

        # --- Header ---
        c.setFont("Helvetica-Bold", 20)
        c.drawString(50, height - 50, "PhishGuard Incident Report")
        
        c.setFont("Helvetica", 10)
        c.drawString(50, height - 65, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        c.line(50, height - 75, 550, height - 75)

        # --- Verdict Section ---
        verdict = self.data.get('verdict', 'UNKNOWN')
        score = self.data.get('score', 0)
        
        # Color code the verdict
        if verdict == "MALICIOUS":
            c.setFillColor(colors.red)
        elif verdict == "SUSPICIOUS":
            c.setFillColor(colors.orange)
        else:
            c.setFillColor(colors.green)
            
        c.setFont("Helvetica-Bold", 16)
        c.drawString(50, height - 100, f"VERDICT: {verdict}")
        c.setFillColor(colors.black)
        c.drawString(50, height - 120, f"Risk Score: {score}/100")

        # --- Details Section ---
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, height - 160, "Analysis Details:")
        c.setFont("Helvetica", 10)
        
        y_pos = height - 180
        details = [
            f"Sender Domain: {self.data.get('domain')}",
            f"Unique URLs Found: {len(self.data.get('urls', []))}",
            f"IPs Identified: {len(self.data.get('ips', []))}",
        ]
        
        for detail in details:
            c.drawString(60, y_pos, f"• {detail}")
            y_pos -= 15

        # --- Flags/Reasons Section ---
        y_pos -= 20
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, y_pos, "Threat Indicators:")
        y_pos -= 20
        c.setFont("Helvetica", 10)
        
        for reason in self.data.get('reasons', []):
            c.drawString(60, y_pos, f"- {reason}")
            y_pos -= 15

        # --- Footer ---
        c.setFont("Helvetica-Oblique", 8)
        c.drawString(50, 30, "Confidential - PhishGuard Automated Security Analysis")

        c.save()
        return self.filename

# --- Quick Test ---
if __name__ == "__main__":
    import os
    if not os.path.exists('reports'): os.makedirs('reports')
    
    mock_data = {
        "verdict": "MALICIOUS",
        "score": 85,
        "domain": "fake-paypal-support.com",
        "urls": ["http://bit.ly/fake-login"],
        "ips": ["192.168.1.1"],
        "reasons": ["High VirusTotal hit count", "New domain registration", "Urgency keywords detected"]
    }
    gen = ReportGenerator(mock_data)
    path = gen.generate()
    print(f"Report created at: {path}")