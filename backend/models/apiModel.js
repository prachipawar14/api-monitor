const db = require("../config/db");

// ========================
// Create API
// ========================
const createApi = (apiData, callback) => {

    const sql = `
        INSERT INTO apis
        (user_id, api_name, endpoint_url, http_method,
         expected_status, monitoring_interval, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            apiData.user_id,
            apiData.api_name,
            apiData.endpoint_url,
            apiData.http_method,
            apiData.expected_status,
            apiData.monitoring_interval,
            apiData.description
        ],
        callback
    );
};

// ========================
// Get All APIs
// ========================
const getApisByUser = (userId, callback) => {

    const sql = `
        SELECT *
        FROM apis
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], callback);
};

// ========================
// Get API By ID
// ========================
const getApiById = (id, userId, callback) => {

    const sql = `
        SELECT *
        FROM apis
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);
};

// ========================
// Update API
// ========================
const updateApi = (id, userId, apiData, callback) => {

    const sql = `
        UPDATE apis
        SET
            api_name = ?,
            endpoint_url = ?,
            http_method = ?,
            expected_status = ?,
            monitoring_interval = ?,
            description = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            apiData.api_name,
            apiData.endpoint_url,
            apiData.http_method,
            apiData.expected_status,
            apiData.monitoring_interval,
            apiData.description,
            id,
            userId
        ],
        callback
    );
};

// ========================
// Delete API
// ========================
const deleteApi = (id, userId, callback) => {

    const sql = `
        DELETE FROM apis
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);
};

module.exports = {
    createApi,
    getApisByUser,
    getApiById,
    updateApi,
    deleteApi
};