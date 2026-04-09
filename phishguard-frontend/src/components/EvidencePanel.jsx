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
        backgroundColor: "#cc222220",
        color: "#cc2222",
        border: "1px solid #cc222240",
        fontSize: "11px",
        padding: "2px 8px",
        borderRadius: "10px",
    },
    panelBody: { padding: "16px" },
    item: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 0",
        borderBottom: "1px solid #1e2535",
        fontSize: "14px",
        lineHeight: 1.6,
    },
    dot: {
        width: 6, height: 6,
        borderRadius: "50%",
        backgroundColor: "#cc2222",
        marginTop: 7,
        flexShrink: 0,
        boxShadow: "0 0 4px #cc2222",
    },
};

export default function EvidencePanel({ reasons }) {
    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>📋</span>
                <span style={s.panelTitle}>Evidence</span>
                <span style={s.badge}>{reasons.length} findings</span>
            </div>
            <div style={s.panelBody}>
                {reasons.map((reason, i) => (
                    <div key={i} style={s.item}>
                        <div style={s.dot}></div>
                        <span>{reason}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}