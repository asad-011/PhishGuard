const s = {
    navbar: {
        backgroundColor: "#0d1221",
        borderBottom: "1px solid #1e2535",
        padding: "0 24px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
    },
    navLeft: { display: "flex", alignItems: "center", gap: 16 },
    navLogo: { display: "flex", alignItems: "center", gap: 8 },
    logoIcon: { fontSize: "1.4rem" },
    logoText: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#e2e8f0",
        letterSpacing: "0.5px"
    },
    logoBadge: {
        backgroundColor: "#1a3a5c",
        color: "#4a9eff",
        fontSize: "10px",
        fontWeight: "700",
        padding: "2px 6px",
        borderRadius: "4px",
        letterSpacing: "1px"
    },
    navRight: { display: "flex", alignItems: "center", gap: 16 },
    navStatus: { display: "flex", alignItems: "center", gap: 6 },
    statusDot: {
        width: 8, height: 8,
        borderRadius: "50%",
        backgroundColor: "#00cc55",
        boxShadow: "0 0 6px #00cc55",
    },
    statusText: { fontSize: "12px", color: "#8892a4" },
    navBtn: {
        backgroundColor: "#1e2535",
        color: "#c8d0e0",
        border: "1px solid #2a3347",
        padding: "7px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "500",
    },
};

export default function Navbar({ onHistoryClick }) {
    return (
        <div style={s.navbar}>
            <div style={s.navLeft}>
                <div style={s.navLogo}>
                    <span style={s.logoIcon}>🛡️</span>
                    <span style={s.logoText}>PhishGuard</span>
                    <span style={s.logoBadge}>SOC</span>
                </div>
            </div>
            <div style={s.navRight}>
                <div style={s.navStatus}>
                    <span style={s.statusDot}></span>
                    <span style={s.statusText}>System Online</span>
                </div>
                <button style={s.navBtn} onClick={onHistoryClick}>
                    📋 Analysis History
                </button>
            </div>
        </div>
    );
}