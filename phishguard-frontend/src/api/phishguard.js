import axios from "axios";

const BASE_URL = "https://phishguard-9k7z.onrender.com";

export const analyzeEmail = async (emailText) => {
    const response = await axios.post(`${BASE_URL}/analyze`, {
        email_text: emailText,
    });
    return response.data;
};

export const fetchHistory = async () => {
    const response = await axios.get(`${BASE_URL}/history`);
    return response.data;
};