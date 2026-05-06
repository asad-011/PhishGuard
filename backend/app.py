from flask import Flask, request, jsonify
from flask_cors import CORS
from extractor import extract_all
from enricher import enrich_all
from keyword_analyzer import analyze_all
from scorer import calculate_score
from database import save_analysis, get_all_analyses, get_analysis_by_id


app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze_email():
    try:
        data = request.json
        email_text = data.get("email_text", "")

        if not email_text.strip():
            return jsonify({"error": "No email text provided"}), 400

        # STEP 1: Extract
        extraction = extract_all(email_text)
        urls = extraction["urls"]
        ips = extraction["ips"]
        sender = extraction["sender"]

        # STEP 2: Enrich
        enrichment = enrich_all(urls, ips)
        url_results = enrichment["url_results"]
        ip_results = enrichment["ip_results"]

        # STEP 3: Keyword Analysis
        keyword_result = analyze_all(email_text, sender)
        keyword_analysis = keyword_result["keywords"]
        sender_mismatch = keyword_result["sender_mismatch"]

        # STEP 4: Score
        score_result = calculate_score(
            url_results,
            ip_results,
            keyword_analysis,
            sender_mismatch
        )

        # STEP 5: Save to database
        analysis_id = save_analysis(
            email_text,
            extraction,
            enrichment,
            keyword_analysis,
            sender_mismatch,
            score_result
        )

        # STEP 6: Return full report
        return jsonify({
            "id": analysis_id,
            "extraction": {
                "urls": urls,
                "ips": ips,
                "sender": sender
            },
            "enrichment": {
                "url_results": url_results,
                "ip_results": ip_results
            },
            "keyword_analysis": keyword_analysis,
            "sender_mismatch": sender_mismatch,
            "score": score_result["score"],
            "verdict": score_result["verdict"],
            "color": score_result["color"],
            "reasons": score_result["reasons"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/history", methods=["GET"])
def get_history():
    try:
        analyses = get_all_analyses()
        return jsonify(analyses)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/history/<int:analysis_id>", methods=["GET"])
def get_single_analysis(analysis_id):
    try:
        analysis = get_analysis_by_id(analysis_id)
        if not analysis:
            return jsonify({"error": "Analysis not found"}), 404
        return jsonify(analysis)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "PhishGuard running"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)