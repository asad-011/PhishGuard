const s = {
    panel: {
        backgroundColor: "#0d1221",
        border: "1px solid #1e2535",
        borderRadius: "10px",
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
    panelTitle: { fontSize: "14px", fontWeight: "600", color: "#c8d0e0", flex: 1 },
    panelBody: { padding: "16px" },
    grid: { display: "flex", flexWrap: "wrap", gap: 6 },
    tag: {
        backgroundColor: "#1a1200",
        border: "1px solid #ffaa0040",
        color: "#ffaa00",
        fontSize: "11px",
        padding: "3px 10px",
        borderRadius: "4px",
    },
};

export default function KeywordPanel({ keywordAnalysis }) {
    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>🕵️</span>
                <span style={s.panelTitle}>
                    Phishing Keywords ({keywordAnalysis.keyword_count})
                </span>
            </div>
            <div style={s.panelBody}>
                <div style={s.grid}>
                    {keywordAnalysis.keywords_found.length === 0 ? (
                        <span style={{ color: "#00cc55" }}>None detected</span>
                    ) : (
                        keywordAnalysis.keywords_found.map((kw, i) => (
                            <span key={i} style={s.tag}>{kw}</span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}