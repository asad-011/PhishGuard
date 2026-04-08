import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/history');
      setHistory(response.data);
    } catch (err) {
      console.error("Could not fetch history - Backend might be offline");
    }
  };

  const handleAnalyze = async () => {
    if (!emailText) return alert("Please paste an email first!");
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/analyze', {
        email_text: emailText
      });
      setResult(response.data);
      fetchHistory();
    } catch (err) {
      alert("Backend not responding. Make sure python app.py is running!");
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Scan History</h2>
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{item.time}</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', margin: '4px 0' }}>{item.domain}</div>
            <div style={{ color: item.verdict === 'MALICIOUS' ? '#ef4444' : '#22c55e', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {item.verdict} ({item.score})
            </div>
          </div>
        ))}
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>PHISH<span>GUARD</span></h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>Deep Analysis Email Security Platform</p>
        </header>

        <section className="input-section">
          <textarea 
            placeholder="Paste suspicious email headers or body here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
            {loading ? "SCANNING THREAT ENGINES..." : "RUN DEEP ANALYSIS"}
          </button>
        </section>

        {result && (
          <div className={`verdict-banner ${result.verdict}`}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.8rem', opacity: 0.8 }}>ANALYSIS VERDICT</p>
              <h2 style={{ margin: 0, fontSize: '2.5rem' }}>{result.verdict}</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.8rem', opacity: 0.8 }}>RISK SCORE</p>
              <div className="score-display">{result.score}/100</div>
            </div>
          </div>
        )}

        {result && result.reasons && (
          <div style={{ marginTop: '24px', padding: '24px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ marginTop: 0, color: '#3b82f6' }}>Threat Indicators:</h3>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1' }}>
              {result.reasons.map((reason, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;