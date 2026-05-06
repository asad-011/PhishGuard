import sqlite3
import json
from datetime import datetime

DB_PATH = "phishguard.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            email_snippet TEXT,
            urls_found TEXT,
            ips_found TEXT,
            keywords_found TEXT,
            sender_email TEXT,
            sender_domain TEXT,
            score INTEGER,
            verdict TEXT,
            reasons TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def save_analysis(email_text, extraction, enrichment, keyword_analysis, sender_mismatch, score_result):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Snippet of email for display
    email_snippet = email_text[:150].replace('\n', ' ').strip()

    cursor.execute('''
        INSERT INTO analyses (
            timestamp,
            email_snippet,
            urls_found,
            ips_found,
            keywords_found,
            sender_email,
            sender_domain,
            score,
            verdict,
            reasons
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        email_snippet,
        json.dumps(extraction.get("urls", [])),
        json.dumps(extraction.get("ips", [])),
        json.dumps(keyword_analysis.get("keywords_found", [])),
        extraction.get("sender", {}).get("email"),
        extraction.get("sender", {}).get("domain"),
        score_result.get("score"),
        score_result.get("verdict"),
        json.dumps(score_result.get("reasons", []))
    ))

    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id

def get_all_analyses():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT id, timestamp, email_snippet, sender_email, 
               sender_domain, score, verdict
        FROM analyses
        ORDER BY timestamp DESC
        LIMIT 20
    ''')

    rows = cursor.fetchall()
    conn.close()

    analyses = []
    for row in rows:
        analyses.append({
            "id": row[0],
            "timestamp": row[1],
            "email_snippet": row[2],
            "sender_email": row[3],
            "sender_domain": row[4],
            "score": row[5],
            "verdict": row[6]
        })

    return analyses

def get_analysis_by_id(analysis_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM analyses WHERE id = ?', (analysis_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "id": row[0],
        "timestamp": row[1],
        "email_snippet": row[2],
        "urls_found": json.loads(row[3]),
        "ips_found": json.loads(row[4]),
        "keywords_found": json.loads(row[5]),
        "sender_email": row[6],
        "sender_domain": row[7],
        "score": row[8],
        "verdict": row[9],
        "reasons": json.loads(row[10])
    }

# Initialize database when module loads
init_db()