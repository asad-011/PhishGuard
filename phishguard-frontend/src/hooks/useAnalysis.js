import { useState } from "react";
import { analyzeEmail as analyzeEmailAPI, fetchHistory as fetchHistoryAPI } from "../api/phishguard";

export default function useAnalysis() {
    const [emailText, setEmailText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const analyzeEmail = async () => {
        if (!emailText.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeEmailAPI(emailText);
            setResult(data);
        } catch (err) {
            setError("Analysis failed. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            const data = await fetchHistoryAPI();
            setHistory(data);
            setShowHistory(true);
        } catch (err) {
            setError("Could not fetch history.");
        }
    };

    const closeHistory = () => setShowHistory(false);

    return {
        emailText, setEmailText,
        result, loading, error,
        history, showHistory,
        analyzeEmail, loadHistory, closeHistory
    };
}