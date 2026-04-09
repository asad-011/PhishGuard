import useAnalysis from "./hooks/useAnalysis";
import Navbar from "./components/Navbar";
import EmailInput from "./components/EmailInput";
import PlaybookSteps from "./components/PlaybookSteps";
import VerdictBanner from "./components/VerdictBanner";
import StatsRow from "./components/StatsRow";
import EvidencePanel from "./components/EvidencePanel";
import URLAnalysis from "./components/URLAnalysis";
import IPReputation from "./components/IPReputation";
import KeywordPanel from "./components/KeywordPanel";
import SenderInfo from "./components/SenderInfo";
import HistoryModal from "./components/HistoryModal";

const s = {
  page: {
    backgroundColor: "#0b0f1a",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', -apple-system, sans-serif",
    color: "#c8d0e0",
  },
  pageHeader: {
    padding: "28px 28px 0",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#e2e8f0",
    margin: "0 0 6px 0",
  },
  pageSubtitle: {
    color: "#8892a4",
    fontSize: "14px",
    margin: 0,
  },
  mainLayout: {
    display: "flex",
    gap: "20px",
    padding: "20px 28px",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "flex-start",
  },
  leftCol: { width: "340px", flexShrink: 0 },
  rightCol: { flex: 1, minWidth: 0 },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 40px",
    backgroundColor: "#0d1221",
    border: "1px solid #1e2535",
    borderRadius: "10px",
    textAlign: "center",
  },
  emptyIcon: { fontSize: "3rem", marginBottom: 16, opacity: 0.4 },
  emptyTitle: { color: "#c8d0e0", margin: "0 0 8px 0", fontSize: "1.1rem" },
  emptyDesc: { color: "#8892a4", fontSize: "13px", lineHeight: 1.6, margin: 0 },
};

export default function App() {
  const {
    emailText, setEmailText,
    result, loading, error,
    history, showHistory,
    analyzeEmail, loadHistory, closeHistory
  } = useAnalysis();

  return (
    <div style={s.page}>
      <Navbar onHistoryClick={loadHistory} />

      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Email Threat Analysis</h1>
        <p style={s.pageSubtitle}>
          Automated phishing detection powered by VirusTotal & AbuseIPDB
        </p>
      </div>

      <div style={s.mainLayout}>
        {/* Left Column */}
        <div style={s.leftCol}>
          <EmailInput
            emailText={emailText}
            setEmailText={setEmailText}
            onAnalyze={analyzeEmail}
            loading={loading}
            error={error}
          />
          <PlaybookSteps done={!!result} />
        </div>

        {/* Right Column */}
        <div style={s.rightCol}>
          {!result && !loading && (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>🔍</div>
              <h3 style={s.emptyTitle}>Awaiting Analysis</h3>
              <p style={s.emptyDesc}>
                Paste a suspicious email on the left and click Analyze
                to run the automated playbook
              </p>
            </div>
          )}

          {loading && (
            <div style={s.emptyState}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>⚙️</div>
              <h3 style={s.emptyTitle}>Running Playbook...</h3>
              <p style={s.emptyDesc}>
                Extracting indicators and querying threat intelligence APIs
              </p>
            </div>
          )}

          {result && (
            <>
              <VerdictBanner result={result} />
              <StatsRow result={result} />
              <EvidencePanel reasons={result.reasons} />
              <URLAnalysis urlResults={result.enrichment.url_results} />
              <IPReputation ipResults={result.enrichment.ip_results} />
              <div style={s.twoCol}>
                <KeywordPanel keywordAnalysis={result.keyword_analysis} />
                <SenderInfo
                  sender={result.extraction.sender}
                  senderMismatch={result.sender_mismatch}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {showHistory && (
        <HistoryModal history={history} onClose={closeHistory} />
      )}
    </div>
  );
}