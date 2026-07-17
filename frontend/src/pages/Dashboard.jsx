import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";
import "../styles/dashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [stats, setStats] = useState({
        totalApis: 0,
        healthyApis: 0,
        failedApis: 0,
        averageResponseTime: 0,
        uptimePercentage: 0,
        recentActivity: [],
        chartData: []
    });

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard");
            setStats(res.data.data);
        } catch (error) {
            console.log("Dashboard Error:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const chartDataLine = {
        labels: stats.chartData.map(item => item.date),
        datasets: [
            {
                label: "Average Response Time (ms)",
                data: stats.chartData.map(item => Math.round(item.avg_response_time)),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4
            }
        ]
    };

    const chartDataDoughnut = {
        labels: ["Healthy", "Failed"],
        datasets: [
            {
                data: [stats.healthyApis, stats.failedApis],
                backgroundColor: ["#10b981", "#ef4444"],
                borderWidth: 0
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="dashboard-container">
                    <h1>API Monitor Dashboard</h1>
                    <div className="cards">
                        <DashboardCard title="Total APIs" value={stats.totalApis} />
                        <DashboardCard title="Healthy APIs" value={stats.healthyApis} />
                        <DashboardCard title="Failed APIs" value={stats.failedApis} />
                        <DashboardCard title="Avg Response" value={stats.averageResponseTime} unit=" ms" />
                        <DashboardCard title="Uptime %" value={stats.uptimePercentage} unit="%" />
                    </div>

                    <div className="charts-container">
                        <div className="chart-card">
                            <h3>Response Time Trend</h3>
                            <div className="chart-wrapper">
                                <Line data={chartDataLine} options={chartOptions} />
                            </div>
                        </div>
                        <div className="chart-card">
                            <h3>API Status Distribution</h3>
                            <div className="chart-wrapper">
                                <Doughnut data={chartDataDoughnut} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="recent-activity">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            {stats.recentActivity.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <span className={`status-dot ${activity.availability.toLowerCase()}`}></span>
                                    <div className="activity-details">
                                        <p className="activity-api">{activity.api_name}</p>
                                        <p className="activity-info">
                                            {activity.availability} • {activity.response_time}ms • {new Date(activity.checked_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {stats.recentActivity.length === 0 && (
                                <p className="no-activity">No recent activity</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;