def calculate_score(url_results, ip_results, keyword_analysis, sender_mismatch):
    score = 0
    reasons = []

    # URL scoring — max 40 points
    for url_result in url_results:
        malicious = url_result.get("malicious", 0)
        suspicious = url_result.get("suspicious", 0)

        if malicious >= 5:
            score += 40
            reasons.append(
                f"URL '{url_result['url']}' flagged malicious by {malicious} engines on VirusTotal"
            )
        elif malicious >= 1:
            score += 25
            reasons.append(
                f"URL '{url_result['url']}' flagged by {malicious} engines on VirusTotal"
            )
        elif suspicious >= 1:
            score += 10
            reasons.append(
                f"URL '{url_result['url']}' flagged suspicious by {suspicious} engines"
            )

    # IP scoring — max 30 points
    for ip_result in ip_results:
        abuse_score = ip_result.get("abuse_score", 0)

        if abuse_score >= 50:
            score += 30
            reasons.append(
                f"IP {ip_result['ip']} has high abuse confidence score of {abuse_score}%"
            )
        elif abuse_score >= 20:
            score += 15
            reasons.append(
                f"IP {ip_result['ip']} has moderate abuse score of {abuse_score}%"
            )

    # Keyword scoring — max 20 points
    keyword_count = keyword_analysis.get("keyword_count", 0)
    keywords_found = keyword_analysis.get("keywords_found", [])

    if keyword_count >= 5:
        score += 20
        reasons.append(
            f"{keyword_count} phishing keywords detected: {', '.join(keywords_found[:5])}..."
        )
    elif keyword_count >= 2:
        score += 10
        reasons.append(
            f"{keyword_count} phishing keywords detected: {', '.join(keywords_found)}"
        )
    elif keyword_count == 1:
        score += 5
        reasons.append(f"Phishing keyword detected: {keywords_found[0]}")

    # Sender mismatch — 20 points
    if sender_mismatch.get("mismatch"):
        score += 20
        brand = sender_mismatch.get("brand_claimed")
        actual = sender_mismatch.get("actual_domain")
        expected = sender_mismatch.get("expected_domain")
        reasons.append(
            f"Sender claims to be {brand} but domain is {actual} instead of {expected}"
        )

    # Cap at 100
    score = min(score, 100)

    # Verdict
    if score <= 30:
        verdict = "SAFE"
        color = "green"
    elif score <= 60:
        verdict = "SUSPICIOUS"
        color = "orange"
    else:
        verdict = "MALICIOUS"
        color = "red"

    return {
        "score": score,
        "verdict": verdict,
        "color": color,
        "reasons": reasons
    }