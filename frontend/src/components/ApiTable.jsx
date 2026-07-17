function ApiTable({ apis, onDelete, onEdit, onView }) {
    return (
        <div className="table-container">
            <table className="api-table">
                <thead>
                    <tr>
                        <th>API Name</th>
                        <th>URL</th>
                        <th>Method</th>
                        <th>Expected Status</th>
                        <th>Interval (s)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {apis.map((api) => (
                        <tr key={api.id}>
                            <td>{api.api_name}</td>
                            <td><a href={api.endpoint_url} target="_blank" rel="noreferrer">{api.endpoint_url}</a></td>
                            <td>{api.http_method}</td>
                            <td>{api.expected_status}</td>
                            <td>{api.monitoring_interval}</td>
                            <td>
                                <button className="view-btn" onClick={() => onView(api.id)}>View</button>
                                <button className="edit-btn" onClick={() => onEdit(api)}>Edit</button>
                                <button className="delete-btn" onClick={() => onDelete(api.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ApiTable;
