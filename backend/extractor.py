import re

def extract_urls(text):
    pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
    urls = re.findall(pattern, text)
    urls = [url.rstrip('.,;)>') for url in urls]
    return list(set(urls))

def extract_ips(text):
    pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
    ips = re.findall(pattern, text)
    valid_ips = []
    for ip in ips:
        parts = ip.split('.')
        if all(0 <= int(p) <= 255 for p in parts):
            valid_ips.append(ip)
    return list(set(valid_ips))

def extract_sender_info(raw_email):
    from_pattern = r'From:?\s*(.*?)\s*[\n\r]'
    match = re.search(from_pattern, raw_email, re.IGNORECASE)

    if not match:
        return {"display_name": None, "email": None, "domain": None}

    from_line = match.group(1).strip()

    email_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'
    email_match = re.search(email_pattern, from_line)
    email = email_match.group(0) if email_match else None

    domain = email.split('@')[1] if email else None

    display_name = re.sub(r'<.*?>', '', from_line).strip().strip('"')

    return {
        "display_name": display_name,
        "email": email,
        "domain": domain
    }

def extract_all(email_text):
    return {
        "urls": extract_urls(email_text),
        "ips": extract_ips(email_text),
        "sender": extract_sender_info(email_text)
    }