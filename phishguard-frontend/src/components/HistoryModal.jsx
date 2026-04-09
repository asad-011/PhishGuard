const s = {
    overlay: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#0d1221",
        border: "1px solid #1e2535",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "640px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "1px solid #1e2535",
    },
    title: { margin: 0, fontSize: "1rem", color: "#e2e8f0" },
    closeBtn: {
        backgroundColor: "#1e2535",
        color: "#c8d0e0",
        border: "1px solid #2a3347",
        width: 32, height: 32,
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
    },
    body: { padding: "16px 20px", overflowY: "auto" },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #1e2535",
    },
    time: { fontSize: "11px", color: "#8892a4", marginBottom: 4 },
    snippet: { fontSize: "12px", color: "#c8d0e0", marginBottom: 3 },
    domain: { fontSize: "11px", color: "#4a9eff", fontFamily: "monospace" },
    score: { fontSize: "1.4rem", fontWeight: "800" },
    verdict: { fontSize: "10px", fontWeight: "700", letterSpacing: "1px" },
};

const getVerdictColor = (verdict) => {
    if (verdict === "MALICIOUS") return "#cc2222";
    if (verdict === "SUSPICIOUS") return "#ffaa00";
    return "#00cc55";
};

export default function HistoryModal({ history, onClose }) {
    return (
        <div style={s.overlay}>
            <div style={s.modal}>
                <div style={s.header}>
                    <h2 style={s.title}>📋 Analysis History</h2>
                    <button style={s.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div style={s.body}>
                    {history.length === 0 ? (
                        <p style={{ color: "#8892a4" }}>No analyses recorded yet.</p>
                    ) : (
                        history.map((item, i) => (
                            <div key={i} style={s.item}>
                                <div>
                                    <div style={s.time}>{item.timestamp}</div>
                                    <div style={s.snippet}>{item.email_snippet}...</div>
                                    <div style={s.domain}>{item.sender_domain || "Unknown domain"}</div>
                                </div>
                                <div style={{ textAlign: "right", marginLeft: 16 }}>
                                    <div style={{ ...s.score, color: getVerdictColor(item.verdict) }}>
                                        {item.score}
                                    </div>
                                    <div style={{ ...s.verdict, color: getVerdictColor(item.verdict) }}>
                                        {item.verdict}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}