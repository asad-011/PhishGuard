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
    step: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid #1e2535",
    },
    stepNum: {
        width: 32, height: 32,
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: "700",
        flexShrink: 0,
    },
    stepLabel: { fontSize: "13px", fontWeight: "600", color: "#c8d0e0" },
    stepDesc: { fontSize: "11px", color: "#8892a4", marginTop: 2 },
};

const STEPS = [
    { step: "01", label: "Extract", desc: "URLs, IPs, Sender Info" },
    { step: "02", label: "Enrich", desc: "VirusTotal + AbuseIPDB" },
    { step: "03", label: "Analyze", desc: "Keyword + Domain Check" },
    { step: "04", label: "Score", desc: "Weighted Risk Calculation" },
    { step: "05", label: "Report", desc: "Verdict + Evidence" },
];

export default function PlaybookSteps({ done }) {
    return (
        <div style={s.panel}>
            <div style={s.panelHeader}>
                <span style={s.panelIcon}>⚙️</span>
                <span style={s.panelTitle}>Playbook Steps</span>
            </div>
            <div style={s.panelBody}>
                {STEPS.map((item) => (
                    <div key={item.step} style={s.step}>
                        <div style={{
                            ...s.stepNum,
                            backgroundColor: done ? "#00cc5520" : "#1e2535",
                            color: done ? "#00cc55" : "#8892a4",
                            border: `1px solid ${done ? "#00cc55" : "#2a3347"}`
                        }}>
                            {done ? "✓" : item.step}
                        </div>
                        <div>
                            <div style={s.stepLabel}>{item.label}</div>
                            <div style={s.stepDesc}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}