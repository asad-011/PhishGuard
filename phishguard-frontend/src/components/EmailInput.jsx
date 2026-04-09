const s = {
    panel: {
        backgroundColor: "#0d1221",
        border: "1px solid #1e2535",
        borderRadius: "10px",
        marginBottom: "16px",
        overflow: "hidden",
    },
    panelHeader: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        borderBottom: "1px solid #1e2535",
        backgroundColor: "#0b0f1a",
    },
    panelIcon: { fontSize: "14px" },
    panelTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#c8d0e0",
        flex: 1,
    },
    panelBody: { padding: "16px" },
    inputLabel: {
        fontSize: "12px",
        color: "#8892a4",
        marginBottom: "8px",
        marginTop: 0,
    },
    textarea: {
        width: "100%",
        backgroundColor: "#0b0f1a",
        border: "1px solid #2a3347",
        borderRadius: "6px",
        color: "#c8d0e0",
        padding: "12px",
        fontSize: "12px",
        resize: "vertical",
        boxSizing: "border-box",
        fontFamily: "monospace",
        lineHeight: 1.6,
    },
    analyzeBtn: {
        marginTop: "10px",
        background: "linear-gradient(135deg, #1a4a8a 0%, #1a6aaa 100%)",
        color: "#ffffff",
        border: "none",
        padding: "11px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        width: "100%",
        fontWeight: "600",
    },
    errorBox: {
        marginTop: "10px",
        backgroundColor: "#1a0a0a",
        border: "1px solid #cc2222",
        borderRadius: "6px",
        padding: "10px",
        color: "#cc2222",
        fontSize: "13px",
    },
};

export default function EmailInput({ emailText, setEmailText, onAnalyze, loading, error }) {
    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>📧</span>
                <span style={s.panelTitle}>Email Input</span>
            </div>
            <div style={s.panelBody}>
                <p style={s.inputLabel}>Paste suspicious email content below</p>
                <textarea
                    style={s.textarea}
                    placeholder={`From: support@paypa1-support.com\nSubject: Urgent action required\n\nPaste full email here...`}
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    rows={14}
                />
                <button
                    style={{ ...s.analyzeBtn, opacity: loading ? 0.7 : 1 }}
                    onClick={onAnalyze}
                    disabled={loading}
                >
                    {loading ? "⏳  Running Playbook..." : "🔍  Analyze Email"}
                </button>
                {error && <div style={s.errorBox}>⚠️ {error}</div>}
            </div>
        </div>
    );
}