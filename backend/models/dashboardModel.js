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

module.exports = {
    getTotalApis,
    getHealthyApis,
    getFailedApis,
    getAverageResponseTime
};