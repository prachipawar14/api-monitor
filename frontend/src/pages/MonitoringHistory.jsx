import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";
import API from "../services/api";
import "../styles/history.css";

function MonitoringHistory() {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const res = await API.get("/monitoring");
            if (res.data.success) {
                setHistory(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="page-header">
                    <h1>Monitoring History</h1>
                </div>
                <HistoryTable history={history} />
            </main>
        </div>
    );
}

export default MonitoringHistory;
