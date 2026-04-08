import re

class KeywordAnalyzer:
    def __init__(self, text):
        # We store the original text but will search case-insensitively
        self.text = text
        
        # Define threat categories
        self.categories = {
            "urgency": ["urgent", "immediately", "action required", "expiring", "final notice", "24 hours"],
            "financial": ["invoice", "payment", "bank", "wire transfer", "refund", "transaction"],
            "credentials": ["login", "password", "verify", "account", "unauthorized", "security alert"],
            "generic_phish": ["winner", "lottery", "gift card", "free", "clicked here", "click here"]
        }

    def analyze(self):
        """Detects keywords and returns found terms + a density score."""
        findings = {}
        total_matches = 0

        for category, keywords in self.categories.items():
            # Using re.IGNORECASE makes the search much more effective for phishing
            matches = [k for k in keywords if re.search(rf'\b{k}\b', self.text, re.IGNORECASE)]
            if matches:
                findings[category] = matches
                total_matches += len(matches)

        # Increase the score weight: 0.2 points per match (5 matches = 1.0/max score)
        # This ensures that a single email with multiple triggers hits the threshold
        score = min(total_matches * 0.2, 1.0) 

        return {
            "detected_categories": findings,
            "keyword_score": score,
            "total_matches": total_matches
        }

# --- Quick Test ---
if __name__ == "__main__":
    sample_body = "URGENT: Your bank account has seen unauthorized login activity. Verify immediately."
    analyzer = KeywordAnalyzer(sample_body)
    results = analyzer.analyze()
    print(f"Results: {results}")