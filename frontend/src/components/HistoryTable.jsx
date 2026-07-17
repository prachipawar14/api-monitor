function HistoryTable({ history }) {
    return (
        <div className="table-container">
            <table className="history-table">
                <thead>
                    <tr>
                        <th>API ID</th>
                        <th>API Name</th>
                        <th>Status Code</th>
                        <th>Response Time (ms)</th>
                        <th>Status</th>
                        <th>Checked At</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item.id}>
                            <td>{item.api_id}</td>
                            <td>{item.api_name || "-"}</td>
                            <td>{item.status_code || "-"}</td>
                            <td>{item.response_time || "-"}</td>
                            <td>
                                <span className={`status-badge ${item.availability === "UP" ? "success" : "error"}`}>
                                    {item.availability}
                                </span>
                            </td>
                            <td>{new Date(item.checked_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryTable;
