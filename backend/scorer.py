class RiskScorer:
    def __init__(self, enrichment_data, keyword_results):
        self.enrichment = enrichment_data  # Data from Step 2
        self.keywords = keyword_results    # Data from Step 3
        self.score = 0
        self.reasons = []

    def calculate_score(self):
        """
        Calculates a risk score from 0 to 100 with boosted weights for demoing.
        """
        self.score = 0
        self.reasons = []

        # 1. VirusTotal Hits (High Weight)
        vt_stats = self.enrichment.get('vt_results', {})
        malicious_count = vt_stats.get('malicious', 0)
        if malicious_count > 0:
            # Boost: 25 points per engine hit, max 60
            weight = min(malicious_count * 25, 60) 
            self.score += weight
            self.reasons.append(f"CRITICAL: {malicious_count} engines flagged URL as malicious.")

        # 2. AbuseIPDB Score (Medium Weight)
        ip_confidence = self.enrichment.get('ip_score', 0)
        if ip_confidence > 10:
            # Boost: Max 40 points
            weight = (ip_confidence / 100) * 40 
            self.score += weight
            self.reasons.append(f"IP Reputation: High abuse confidence ({ip_confidence}%).")

        # 3. Domain Age (Contextual Weight)
        domain_age = self.enrichment.get('domain_age')
        if domain_age is not None:
            if domain_age < 30:
                self.score += 40 # Boosted from 25
                self.reasons.append("ALERT: Domain is brand new (< 30 days).")
            elif domain_age < 180:
                self.score += 20
                self.reasons.append("Notice: Domain is relatively new (< 6 months).")

        # 4. Keyword Analysis (NOW MUCH STRONGER)
        # If keywords are detected, we want them to actually change the verdict.
        kw_score = self.keywords.get('keyword_score', 0) # Value between 0.0 and 1.0
        if kw_score > 0:
            # Boost: Keywords can now provide up to 50 points
            boosted_kw_points = kw_score * 50
            self.score += boosted_kw_points
            
            total_matches = self.keywords.get('total_matches', 0)
            self.reasons.append(f"Psychological Triggers: {total_matches} phishing keywords found.")

        # Cap the final score at 100
        self.score = min(round(self.score), 100)
        return self.score, self.get_verdict(), self.reasons

    def get_verdict(self):
        # Adjusted thresholds for better demo responsiveness
        if self.score >= 70:
            return "MALICIOUS"
        elif self.score >= 35: # Lowered from 40
            return "SUSPICIOUS"
        else:
            return "SAFE"

# --- Quick Test ---
if __name__ == "__main__":
    # Test Scenario: No API keys, just keyword hits
    mock_enrichment = {'vt_results': {}, 'ip_score': 0, 'domain_age': None}
    mock_keywords = {'keyword_score': 0.8, 'total_matches': 5}
    
    scorer = RiskScorer(mock_enrichment, mock_keywords)
    final_score, verdict, reasons = scorer.calculate_score()
    print(f"Score: {final_score}/100 | Verdict: {verdict}")
    print(f"Reasons: {reasons}")