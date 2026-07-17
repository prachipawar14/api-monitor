import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ApiTable from "../components/ApiTable";
import ApiModal from "../components/AddApiModal";
import API from "../services/api";
import "../styles/apiManagement.css";

function ApiManagement() {
    const [apis, setApis] = useState([]);
    const [filteredApis, setFilteredApis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApi, setEditingApi] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMethod, setFilterMethod] = useState("");
    const [sortBy, setSortBy] = useState("api_name");
    const navigate = useNavigate();

    const fetchApis = async () => {
        try {
            const res = await API.get("/apis");
            if (res.data.success) {
                setApis(res.data.data);
                setFilteredApis(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch APIs:", error);
        }
    };

    useEffect(() => {
        let result = [...apis];

        // Search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(api => 
                api.api_name.toLowerCase().includes(term) || 
                api.endpoint_url.toLowerCase().includes(term)
            );
        }

        // Filter
        if (filterMethod) {
            result = result.filter(api => api.http_method === filterMethod);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "api_name") {
                return a.api_name.localeCompare(b.api_name);
            } else if (sortBy === "response_time") {
                return (a.response_time || 0) - (b.response_time || 0);
            } else if (sortBy === "status") {
                return (a.expected_status || 0) - (b.expected_status || 0);
            }
            return 0;
        });

        setFilteredApis(result);
    }, [apis, searchTerm, filterMethod, sortBy]);

    const handleSubmitApi = async (apiData, apiId) => {
        try {
            if (apiId) {
                await API.put(`/apis/${apiId}`, apiData);
            } else {
                await API.post("/apis", apiData);
            }
            fetchApis();
        } catch (error) {
            console.error("Failed to save API:", error);
        }
    };

    const handleEditApi = (api) => {
        setEditingApi(api);
        setIsModalOpen(true);
    };

    const handleViewApi = (apiId) => {
        navigate(`/apis/${apiId}`);
    };

    const handleDeleteApi = async (id) => {
        if (window.confirm("Are you sure you want to delete this API?")) {
            try {
                await API.delete(`/apis/${id}`);
                fetchApis();
            } catch (error) {
                console.error("Failed to delete API:", error);
            }
        }
    };

    const handleOpenAddModal = () => {
        setEditingApi(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingApi(null);
    };

    useEffect(() => {
        fetchApis();
    }, []);

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="page-header">
                    <h1>API Management</h1>
                    <button className="add-btn" onClick={handleOpenAddModal}>Add New API</button>
                </div>
                <div className="filters-container">
                    <input
                        type="text"
                        placeholder="Search APIs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Methods</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="api_name">Sort by Name</option>
                        <option value="status">Sort by Expected Status</option>
                        <option value="response_time">Sort by Response Time</option>
                    </select>
                </div>
                <ApiTable 
                    apis={filteredApis} 
                    onDelete={handleDeleteApi}
                    onEdit={handleEditApi}
                    onView={handleViewApi}
                />
            </main>
            <ApiModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitApi}
                editingApi={editingApi}
            />
        </div>
    );
}

export default ApiManagement;
