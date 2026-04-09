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
    panelTitle: { fontSize: "14px", fontWeight: "600", color: "#c8d0e0", flex: 1 },
    badge: {
        backgroundColor: "#1e2535",
        color: "#8892a4",
        fontSize: "11px",
        padding: "2px 8px",
        borderRadius: "10px",
        border: "1px solid #2a3347",
    },
    panelBody: { padding: "16px" },
    urlCard: {
        backgroundColor: "#0b0f1a",
        border: "1px solid #2a3347",
        borderRadius: "6px",
        padding: "12px",
        marginBottom: "10px",
    },
    urlTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    urlText: {
        fontSize: "12px",
        fontFamily: "monospace",
        color: "#8892a4",
        wordBreak: "break-all",
        flex: 1,
    },
    pill: {
        fontSize: "10px",
        fontWeight: "700",
        padding: "3px 8px",
        borderRadius: "4px",
        letterSpacing: "0.5px",
        flexShrink: 0,
    },
    urlStats: { display: "flex", gap: 16 },
    urlStat: { fontSize: "12px", color: "#8892a4" },
};

export default function URLAnalysis({ urlResults }) {
    if (!urlResults.length) return null;

    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>🔗</span>
                <span style={s.panelTitle}>URL Analysis</span>
                <span style={s.badge}>{urlResults.length} URLs</span>
            </div>
            <div style={s.panelBody}>
                {urlResults.map((url, i) => {
                    const isMalicious = url.malicious > 0;
                    const isSuspicious = url.suspicious > 0;
                    return (
                        <div key={i} style={s.urlCard}>
                            <div style={s.urlTop}>
                                <span style={s.urlText}>{url.url}</span>
                                <span style={{
                                    ...s.pill,
                                    backgroundColor: isMalicious ? "#cc222220" : isSuspicious ? "#ffaa0020" : "#00cc5520",
                                    color: isMalicious ? "#cc2222" : isSuspicious ? "#ffaa00" : "#00cc55",
                                    border: `1px solid ${isMalicious ? "#cc222240" : isSuspicious ? "#ffaa0040" : "#00cc5540"}`
                                }}>
                                    {isMalicious ? "MALICIOUS" : isSuspicious ? "SUSPICIOUS" : "CLEAN"}
                                </span>
                            </div>
                            <div style={s.urlStats}>
                                <div style={s.urlStat}><span style={{ color: "#cc2222" }}>●</span> Malicious: {url.malicious}</div>
                                <div style={s.urlStat}><span style={{ color: "#ffaa00" }}>●</span> Suspicious: {url.suspicious}</div>
                                <div style={s.urlStat}><span style={{ color: "#00cc55" }}>●</span> Harmless: {url.harmless}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}