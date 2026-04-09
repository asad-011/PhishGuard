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
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #1e2535",
        fontSize: "13px",
    },
    key: { color: "#8892a4" },
    val: { color: "#c8d0e0", textAlign: "right", maxWidth: "60%", wordBreak: "break-all" },
};

export default function SenderInfo({ sender, senderMismatch }) {
    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>📨</span>
                <span style={s.panelTitle}>Sender Info</span>
            </div>
            <div style={s.panelBody}>
                <div style={s.row}>
                    <span style={s.key}>Name</span>
                    <span style={s.val}>{sender.display_name || "N/A"}</span>
                </div>
                <div style={s.row}>
                    <span style={s.key}>Email</span>
                    <span style={s.val}>{sender.email || "N/A"}</span>
                </div>
                <div style={s.row}>
                    <span style={s.key}>Domain</span>
                    <span style={s.val}>{sender.domain || "N/A"}</span>
                </div>
                <div style={s.row}>
                    <span style={s.key}>Spoof</span>
                    <span style={{
                        ...s.val,
                        color: senderMismatch.mismatch ? "#cc2222" : "#00cc55"
                    }}>
                        {senderMismatch.mismatch ? "⚠️ Detected" : "✅ Clean"}
                    </span>
                </div>
            </div>
        </div>
    );
}