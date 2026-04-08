import requests
import whois
from datetime import datetime

class ThreatEnricher:
    def __init__(self, vt_api_key=None, abuse_api_key=None):
        self.vt_key = vt_api_key
        self.abuse_key = abuse_api_key

    def check_vt_url(self, url):
        """Checks VirusTotal for URL reputation."""
        if not self.vt_key: return {"error": "No API Key"}
        
        # VT requires URLs to be base64 or sent via POST for scanning
        # For simplicity, we use the search endpoint (works for known URLs)
        headers = {"x-apikey": self.vt_key}
        params = {'url': url}
        try:
            # Note: This is a simplified lookup for the sake of the MVP
            response = requests.get("https://www.virustotal.com/api/v3/domains/{}", headers=headers)
            # In a full build, you'd hash the URL or use the /urls endpoint
            return response.json().get('data', {}).get('attributes', {}).get('last_analysis_stats', {})
        except:
            return "Error"

    def check_abuse_ip(self, ip):
        """Checks AbuseIPDB for IP reputation."""
        if not self.abuse_key: return {"score": 0}
        
        url = 'https://api.abuseipdb.com/api/v2/check'
        headers = {'Key': self.abuse_key, 'Accept': 'application/json'}
        params = {'ipAddress': ip, 'maxAgeInDays': '90'}
        
        try:
            response = requests.get(url, headers=headers, params=params)
            return response.json().get('data', {}).get('abuseConfidenceScore', 0)
        except:
            return 0

    def get_domain_age(self, domain):
        """Calculates domain age in days."""
        try:
            w = whois.whois(domain)
            creation_date = w.creation_date
            if isinstance(creation_date, list):
                creation_date = creation_date[0]
            
            if creation_date:
                age = (datetime.now() - creation_date).days
                return age
            return None
        except:
            return None

# --- Quick Test ---
if __name__ == "__main__":
    # Replace with your actual keys to test
    enricher = ThreatEnricher(vt_api_key="YOUR_VT_KEY", abuse_api_key="YOUR_ABUSE_KEY")
    print(f"Domain Age (google.com): {enricher.get_domain_age('google.com')} days")