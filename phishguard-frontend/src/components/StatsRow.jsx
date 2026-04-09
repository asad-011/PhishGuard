const s = {
    statsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        backgroundColor: "#0d1221",
        border: "1px solid #1e2535",
        borderRadius: "8px",
        padding: "20px 14px",
        textAlign: "center",
    },
    statIcon: { fontSize: "1.4rem", marginBottom: 8 },
    statValue: { fontSize: "2rem", fontWeight: "700", color: "#e2e8f0" },
    statLabel: { fontSize: "12px", color: "#8892a4", marginTop: 4 },
};

export default function StatsRow({ result }) {
    const stats = [
        { label: "URLs Scanned", value: result.enrichment.url_results.length, icon: "🔗" },
        { label: "IPs Checked", value: result.enrichment.ip_results.length, icon: "🌐" },
        { label: "Keywords", value: result.keyword_analysis.keyword_count, icon: "🕵️" },
        { label: "Indicators", value: result.reasons.length, icon: "⚠️" },
    ];

    return (
        <div style={s.statsRow}>
            {stats.map((stat, i) => (
                <div key={i} style={s.statCard}>
                    <div style={s.statIcon}>{stat.icon}</div>
                    <div style={s.statValue}>{stat.value}</div>
                    <div style={s.statLabel}>{stat.label}</div>
                </div>
            ))}
        </div>
    );
}