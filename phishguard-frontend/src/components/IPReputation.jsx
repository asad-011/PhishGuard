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
    ipCard: {
        backgroundColor: "#0b0f1a",
        border: "1px solid #2a3347",
        borderRadius: "6px",
        padding: "14px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ipAddress: { fontSize: "14px", fontFamily: "monospace", color: "#c8d0e0", fontWeight: "600" },
    ipMeta: { fontSize: "12px", color: "#8892a4", marginTop: 4 },
    abuseLabel: { fontSize: "10px", color: "#8892a4", letterSpacing: "1px", marginBottom: 4, textAlign: "right" },
    abuseScore: { fontSize: "1.8rem", fontWeight: "800" },
};

export default function IPReputation({ ipResults }) {
    if (!ipResults.length) return null;

    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>🌐</span>
                <span style={s.panelTitle}>IP Reputation</span>
                <span style={s.badge}>{ipResults.length} IPs</span>
            </div>
            <div style={s.panelBody}>
                {ipResults.map((ip, i) => (
                    <div key={i} style={s.ipCard}>
                        <div>
                            <div style={s.ipAddress}>{ip.ip}</div>
                            <div style={s.ipMeta}>{ip.country} · {ip.total_reports} reports</div>
                        </div>
                        <div>
                            <div style={s.abuseLabel}>ABUSE SCORE</div>
                            <div style={{
                                ...s.abuseScore,
                                color: ip.abuse_score > 50 ? "#cc2222" :
                                       ip.abuse_score > 20 ? "#ffaa00" : "#00cc55"
                            }}>
                                {ip.abuse_score}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}