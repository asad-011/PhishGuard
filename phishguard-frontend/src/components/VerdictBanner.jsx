import ScoreGauge from "./ScoreGauge";

const getVerdictConfig = (verdict) => {
    if (verdict === "MALICIOUS") return {
        bg: "linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 100%)",
        border: "#cc2222",
        color: "#cc2222",
        glow: "0 0 30px rgba(204,34,34,0.2)",
        icon: "🚨",
    };
    if (verdict === "SUSPICIOUS") return {
        bg: "linear-gradient(135deg, #1a1200 0%, #2d2000 100%)",
        border: "#ffaa00",
        color: "#ffaa00",
        glow: "0 0 30px rgba(255,170,0,0.2)",
        icon: "⚠️",
    };
    return {
        bg: "linear-gradient(135deg, #0a1a0f 0%, #0f2d1a 100%)",
        border: "#00cc55",
        color: "#00cc55",
        glow: "0 0 30px rgba(0,204,85,0.2)",
        icon: "✅",
    };
};

const s = {
    banner: {
        borderRadius: "10px",
        padding: "28px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        fontSize: "10px",
        letterSpacing: "2px",
        color: "#8892a4",
        marginBottom: 10,
        fontWeight: "600",
    },
    value: {
        fontSize: "3rem",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: 8,
    },
    sub: { fontSize: "13px", color: "#8892a4" },
    gaugeLabel: {
        fontSize: "10px",
        letterSpacing: "2px",
        color: "#8892a4",
        marginBottom: 8,
        fontWeight: "600",
        textAlign: "center",
    },
};

export default function VerdictBanner({ result }) {
    const vc = getVerdictConfig(result.verdict);
    return (
        <div style={{
            ...s.banner,
            background: vc.bg,
            border: `1px solid ${vc.border}`,
            boxShadow: vc.glow
        }}>
            <div>
                <div style={s.label}>THREAT VERDICT</div>
                <div style={{ ...s.value, color: vc.color }}>
                    {vc.icon} {result.verdict}
                </div>
                <div style={s.sub}>
                    {result.reasons.length} indicator{result.reasons.length !== 1 ? "s" : ""} detected
                </div>
            </div>
            <div>
                <div style={s.gaugeLabel}>RISK SCORE</div>
                <ScoreGauge score={result.score} color={vc.color} />
            </div>
        </div>
    );
}