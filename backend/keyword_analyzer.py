PHISHING_KEYWORDS = [
    # Urgency
    "urgent", "immediately", "within 24 hours", "act now",
    "expire", "expiring", "limited time", "as soon as possible",
    
    # Account threats
    "suspended", "blocked", "locked", "deactivated",
    "unauthorized access", "unusual activity", "compromised",
    
    # Action demands
    "verify", "confirm", "validate", "update your information",
    "click here", "login here", "sign in here",
    
    # Fear tactics
    "failure to", "will result", "permanent", "immediately or",
    "legal action", "account closure", "terminated",
    
    # Reward tactics
    "you have been selected", "congratulations", "winner",
    "claim your prize", "free gift", "you won"
]

def analyze_keywords(email_text):
    email_lower = email_text.lower()
    found_keywords = []

    for keyword in PHISHING_KEYWORDS:
        if keyword.lower() in email_lower:
            found_keywords.append(keyword)

    return {
        "keywords_found": found_keywords,
        "keyword_count": len(found_keywords),
        "high_risk": len(found_keywords) >= 3
    }

def check_sender_mismatch(sender_info):
    display_name = (sender_info.get("display_name") or "").lower()
    domain = (sender_info.get("domain") or "").lower()

    # Known brands and their legitimate domains
    brand_domains = {
        "paypal": "paypal.com",
        "amazon": "amazon.com",
        "google": "google.com",
        "microsoft": "microsoft.com",
        "apple": "apple.com",
        "netflix": "netflix.com",
        "bank": "bank.com",
        "facebook": "facebook.com",
        "instagram": "instagram.com"
    }

    for brand, legitimate_domain in brand_domains.items():
        if brand in display_name:
            if domain != legitimate_domain:
                return {
                    "mismatch": True,
                    "brand_claimed": brand,
                    "actual_domain": domain,
                    "expected_domain": legitimate_domain
                }

    return {
        "mismatch": False,
        "brand_claimed": None,
        "actual_domain": domain,
        "expected_domain": None
    }

def analyze_all(email_text, sender_info):
    keyword_result = analyze_keywords(email_text)
    mismatch_result = check_sender_mismatch(sender_info)

    return {
        "keywords": keyword_result,
        "sender_mismatch": mismatch_result
    }