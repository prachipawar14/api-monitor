import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";
import API from "../services/api";
import "../styles/history.css";

function ApiDetail() {
    const { apiId } = useParams();
    const navigate = useNavigate();
    const [api, setApi] = useState(null);
    const [history, setHistory] = useState([]);

    const fetchApiDetails = async () => {
        try {
            const res = await API.get(`/apis/${apiId}`);
            if (res.data.success) {
                setApi(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch API details:", error);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await API.get(`/monitoring/${apiId}`);
            if (res.data.success) {
                setHistory(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    useEffect(() => {
        if (apiId) {
            fetchApiDetails();
            fetchHistory();
        }
    }, [apiId]);

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="page-header">
                    <button className="back-btn" onClick={() => navigate("/apis")}>← Back to APIs</button>
                    <h1>{api?.api_name}</h1>
                </div>
                {api && (
                    <div className="api-details-card">
                        <p><strong>Endpoint:</strong> <a href={api.endpoint_url} target="_blank" rel="noreferrer">{api.endpoint_url}</a></p>
                        <p><strong>Method:</strong> {api.http_method}</p>
                        <p><strong>Expected Status:</strong> {api.expected_status}</p>
                        <p><strong>Monitoring Interval:</strong> {api.monitoring_interval}s</p>
                        <p><strong>Description:</strong> {api.description || "No description"}</p>
                    </div>
                )}
                <h2>Monitoring History</h2>
                <HistoryTable history={history} />
            </main>
        </div>
    );
}

export default ApiDetail;