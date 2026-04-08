import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

# Import our custom modules
from extractor import EmailExtractor
from enricher import ThreatEnricher
from keyword_analyzer import KeywordAnalyzer
from scorer import RiskScorer
from database import PhishDatabase
from report_generator import ReportGenerator

app = Flask(__name__)
CORS(app) # Allow React to connect

# Initialize Database
db = PhishDatabase()

# API Keys (Ideally use environment variables for security)
VT_KEY = "4983f7c2e23c7df0fe0ebe3cb73617173a024493e4bb07802293433881a2bedb"
ABUSE_KEY = "e0bc37ba2ddabfcde1b84ba2dfd4f924499cb9c8687cb3958495c4ca1480012fc416381d61f7f046"

@app.route('/api/analyze', methods=['POST'])
def analyze_email():
    data = request.json
    email_text = data.get('email_text', '')

    if not email_text:
        return jsonify({"error": "No text provided"}), 400

    # 1. Extraction
    extractor = EmailExtractor(email_text)
    iocs = extractor.get_all_indicators()

    # 2. Enrichment
    enricher = ThreatEnricher(vt_api_key=VT_KEY, abuse_api_key=ABUSE_KEY)
    
    # We'll just check the first URL and IP for the MVP
    vt_results = enricher.check_vt_url(iocs['urls'][0]) if iocs['urls'] else {}
    ip_score = enricher.check_abuse_ip(iocs['ips'][0]) if iocs['ips'] else 0
    domain_age = enricher.get_domain_age(iocs['domain']) if iocs['domain'] else None

    enrichment_data = {
        "vt_results": vt_results,
        "ip_score": ip_score,
        "domain_age": domain_age
    }

    # 3. Keyword Analysis
    analyzer = KeywordAnalyzer(email_text)
    keyword_results = analyzer.analyze()

    # 4. Scoring
    scorer = RiskScorer(enrichment_data, keyword_results)
    final_score, verdict, reasons = scorer.calculate_score()

    # 5. Save to History
    db.save_scan(iocs['domain'] or "Unknown", final_score, verdict, email_text)

    # 6. Prepare Response
    full_analysis = {
        "verdict": verdict,
        "score": final_score,
        "reasons": reasons,
        "iocs": iocs,
        "enrichment": enrichment_data,
        "keywords": keyword_results
    }

    return jsonify(full_analysis)

@app.route('/api/history', methods=['GET'])
def get_history():
    history = db.get_history()
    # Format for JSON
    formatted_history = [
        {"id": x[0], "time": x[1], "domain": x[2], "score": x[3], "verdict": x[4]} 
        for x in history
    ]
    return jsonify(formatted_history)

@app.route('/api/report', methods=['POST'])
def generate_report():
    data = request.json
    if not os.path.exists('reports'): os.makedirs('reports')
    
    generator = ReportGenerator(data)
    report_path = generator.generate()
    
    return send_file(report_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=5000)