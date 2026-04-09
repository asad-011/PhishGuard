export default function ScoreGauge({ score, color }) {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto" }}>
            <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="70" cy="70" r="54" fill="none" stroke="#1e2535" strokeWidth="12" />
                <circle
                    cx="70" cy="70" r="54" fill="none"
                    stroke={color} strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{
                        transition: "stroke-dashoffset 1s ease",
                        filter: `drop-shadow(0 0 6px ${color})`
                    }}
                />
            </svg>
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center"
            }}>
                <div style={{ fontSize: "2rem", fontWeight: "800", color, lineHeight: 1 }}>
                    {score}
                </div>
                <div style={{ fontSize: "11px", color: "#8892a4", marginTop: 2 }}>/ 100</div>
            </div>
        </div>
    );
}