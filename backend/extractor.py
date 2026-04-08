import re
from urllib.parse import urlparse

class EmailExtractor:
    def __init__(self, raw_text):
        self.text = raw_text

    def extract_urls(self):
        """Finds all URLs and returns a unique list."""
        url_pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+[/\w\.-]*'
        urls = re.findall(url_pattern, self.text)
        return list(set(urls))

    def extract_ips(self):
        """Finds all IPv4 addresses."""
        ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
        ips = re.findall(ip_pattern, self.text)
        # Filter out local/internal IPs if necessary
        return list(set(ips))

    def extract_sender_domain(self):
        """
        Attempts to find the 'From:' field or general email domains.
        Returns the domain of the first email address found.
        """
        email_pattern = r'[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)'
        match = re.search(email_pattern, self.text)
        return match.group(1) if match else None

    def get_all_indicators(self):
        return {
            "urls": self.extract_urls(),
            "ips": self.extract_ips(),
            "domain": self.extract_sender_domain()
        }

# --- Quick Test ---
if __name__ == "__main__":
    sample_email = """
    From: support@secure-bank-login.com
    Message: Please click here http://malicious-site.net/login 
    to verify your account. Your login originated from 192.168.1.1 and 8.8.8.8.
    """
    extractor = EmailExtractor(sample_email)
    print(extractor.get_all_indicators())