import { useState, useEffect } from "react";

function ApiModal({ isOpen, onClose, onSubmit, editingApi = null }) {
    const [formData, setFormData] = useState({
        api_name: "",
        endpoint_url: "",
        http_method: "GET",
        expected_status: 200,
        monitoring_interval: 60,
        description: ""
    });

    useEffect(() => {
        if (editingApi) {
            setFormData({
                api_name: editingApi.api_name,
                endpoint_url: editingApi.endpoint_url,
                http_method: editingApi.http_method,
                expected_status: editingApi.expected_status,
                monitoring_interval: editingApi.monitoring_interval,
                description: editingApi.description || ""
            });
        } else {
            setFormData({
                api_name: "",
                endpoint_url: "",
                http_method: "GET",
                expected_status: 200,
                monitoring_interval: 60,
                description: ""
            });
        }
    }, [editingApi]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, editingApi?.id);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editingApi ? "Edit API" : "Add New API"}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>API Name</label>
                    <input
                        type="text"
                        name="api_name"
                        value={formData.api_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Endpoint URL</label>
                    <input
                        type="url"
                        name="endpoint_url"
                        value={formData.endpoint_url}
                        onChange={handleChange}
                        required
                    />

                    <label>HTTP Method</label>
                    <select
                        name="http_method"
                        value={formData.http_method}
                        onChange={handleChange}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>

                    <label>Expected Status Code</label>
                    <input
                        type="number"
                        name="expected_status"
                        value={formData.expected_status}
                        onChange={handleChange}
                    />

                    <label>Monitoring Interval (seconds)</label>
                    <input
                        type="number"
                        name="monitoring_interval"
                        value={formData.monitoring_interval}
                        onChange={handleChange}
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-btn">
                            {editingApi ? "Update API" : "Add API"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApiModal;
