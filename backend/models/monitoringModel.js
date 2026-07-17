const db = require("../config/db");

// Get all registered APIs
const getAllApis = (callback) => {

    const sql = `
        SELECT *
        FROM apis
    `;

    db.query(sql, callback);

};

// Save monitoring result
const saveMonitoringResult = (monitorData, callback) => {

    const sql = `
        INSERT INTO monitoring_history
        (api_id, status_code, response_time, availability, error_message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            monitorData.api_id,
            monitorData.status_code,
            monitorData.response_time,
            monitorData.availability,
            monitorData.error_message
        ],
        callback
    );

};

module.exports = {
    getAllApis,
    saveMonitoringResult
};