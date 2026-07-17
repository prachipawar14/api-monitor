const db = require("../config/db");

// Get all monitoring history
const getAllHistory = (callback) => {

    const sql = `
        SELECT
            monitoring_history.*,
            apis.api_name
        FROM monitoring_history
        JOIN apis
        ON monitoring_history.api_id = apis.id
        ORDER BY checked_at DESC
    `;

    db.query(sql, callback);

};

// Get monitoring history of one API
const getHistoryByApiId = (apiId, callback) => {

    const sql = `
        SELECT *
        FROM monitoring_history
        WHERE api_id = ?
        ORDER BY checked_at DESC
    `;

    db.query(sql, [apiId], callback);

};

module.exports = {
    getAllHistory,
    getHistoryByApiId
};