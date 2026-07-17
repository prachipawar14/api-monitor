import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApiManagement from "./pages/ApiManagement";
import MonitoringHistory from "./pages/MonitoringHistory";
import ApiDetail from "./pages/ApiDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/apis" element={<ProtectedRoute><ApiManagement /></ProtectedRoute>} />
                <Route path="/apis/:apiId" element={<ProtectedRoute><ApiDetail /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><MonitoringHistory /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;