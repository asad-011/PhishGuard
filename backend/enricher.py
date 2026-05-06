import requests
import os
import base64
from dotenv import load_dotenv

load_dotenv()

VT_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
ABUSE_API_KEY = os.getenv("ABUSEIPDB_API_KEY")

def check_virustotal_url(url):
    try:
        # VirusTotal requires URL to be base64 encoded
        url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
        
        headers = {"x-apikey": VT_API_KEY}
        
        response = requests.get(
            f"https://www.virustotal.com/api/v3/urls/{url_id}",
            headers=headers,
            timeout=10
        )

        if response.status_code == 200:
            data = response.json()
            stats = data["data"]["attributes"]["last_analysis_stats"]
            return {
                "url": url,
                "malicious": stats.get("malicious", 0),
                "suspicious": stats.get("suspicious", 0),
                "harmless": stats.get("harmless", 0),
                "status": "success"
            }
        else:
            return {
                "url": url,
                "malicious": 0,
                "suspicious": 0,
                "harmless": 0,
                "status": "not_found"
            }

    except Exception as e:
        return {
            "url": url,
            "malicious": 0,
            "suspicious": 0,
            "harmless": 0,
            "status": f"error: {str(e)}"
        }

def check_abuseipdb(ip):
    try:
        headers = {
            "Key": ABUSE_API_KEY,
            "Accept": "application/json"
        }

        params = {
            "ipAddress": ip,
            "maxAgeInDays": 90
        }

        response = requests.get(
            "https://api.abuseipdb.com/api/v2/check",
            headers=headers,
            params=params,
            timeout=10
        )

        if response.status_code == 200:
            data = response.json()["data"]
            return {
                "ip": ip,
                "abuse_score": data.get("abuseConfidenceScore", 0),
                "country": data.get("countryCode", "Unknown"),
                "total_reports": data.get("totalReports", 0),
                "status": "success"
            }
        else:
            return {
                "ip": ip,
                "abuse_score": 0,
                "country": "Unknown",
                "total_reports": 0,
                "status": "error"
            }

    except Exception as e:
        return {
            "ip": ip,
            "abuse_score": 0,
            "country": "Unknown",
            "total_reports": 0,
            "status": f"error: {str(e)}"
        }

def enrich_all(urls, ips):
    url_results = [check_virustotal_url(url) for url in urls]
    ip_results = [check_abuseipdb(ip) for ip in ips]
    
    return {
        "url_results": url_results,
        "ip_results": ip_results
    }