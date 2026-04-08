import sqlite3
from datetime import datetime

class PhishDatabase:
    def __init__(self, db_name="phishguard.db"):
        self.db_name = db_name
        self.init_db()

    def get_connection(self):
        return sqlite3.connect(self.db_name)

    def init_db(self):
        """Creates the analysis table if it doesn't exist."""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                sender_domain TEXT,
                risk_score INTEGER,
                verdict TEXT,
                raw_text TEXT
            )
        ''')
        conn.commit()
        conn.close()

    def save_scan(self, domain, score, verdict, text):
        """Saves a completed analysis to the history."""
        conn = self.get_connection()
        cursor = conn.cursor()
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute('''
            INSERT INTO scans (timestamp, sender_domain, risk_score, verdict, raw_text)
            VALUES (?, ?, ?, ?, ?)
        ''', (timestamp, domain, score, verdict, text[:500])) # Save first 500 chars of text
        conn.commit()
        conn.close()

    def get_history(self):
        """Retrieves the last 10 scans for the sidebar."""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT id, timestamp, sender_domain, risk_score, verdict FROM scans ORDER BY id DESC LIMIT 10')
        history = cursor.fetchall()
        conn.close()
        return history

# --- Quick Test ---
if __name__ == "__main__":
    db = PhishDatabase()
    db.save_scan("malicious-site.com", 85, "MALICIOUS", "Sample phishing email body...")
    print("Saved! Current History:")
    for entry in db.get_history():
        print(entry)