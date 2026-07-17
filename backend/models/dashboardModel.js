const db = require("../config/db");

// Total APIs
const getTotalApis = (callback) => {
    db.query(
        "SELECT COUNT(*) AS total FROM apis",
        callback
    );
};

// Healthy APIs (latest status = UP)
const getHealthyApis = (callback) => {

    const sql = `
        SELECT COUNT(DISTINCT api_id) AS healthy
        FROM monitoring_history
        WHERE availability='UP'
    `;

    db.query(sql, callback);

};

// Failed APIs
const getFailedApis = (callback) => {

    const sql = `
        SELECT COUNT(DISTINCT api_id) AS failed
        FROM monitoring_history
        WHERE availability='DOWN'
    `;

    db.query(sql, callback);

};

// Average Response Time
const getAverageResponseTime = (callback) => {

    db.query(
        "SELECT AVG(response_time) AS average FROM monitoring_history",
        callback
    );

};

// Recent Activity
const getRecentActivity = (callback) => {
    const sql = `
        SELECT mh.id, mh.api_id, a.api_name, mh.availability, mh.response_time, mh.checked_at
        FROM monitoring_history mh
        JOIN apis a ON mh.api_id = a.id
        ORDER BY mh.checked_at DESC
        LIMIT 10
    `;
    db.query(sql, callback);
};

// Chart Data
const getChartData = (callback) => {
    const sql = `
        SELECT 
            DATE(checked_at) AS date,
            COUNT(*) AS total_checks,
            SUM(CASE WHEN availability='UP' THEN 1 ELSE 0 END) AS successful_checks,
            AVG(response_time) AS avg_response_time
        FROM monitoring_history
        GROUP BY DATE(checked_at)
        ORDER BY date ASC
        LIMIT 30
    `;
    db.query(sql, callback);
};

module.exports = {
    getTotalApis,
    getHealthyApis,
    getFailedApis,
    getAverageResponseTime,
    getRecentActivity,
    getChartData
};