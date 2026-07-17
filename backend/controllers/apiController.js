const {
    createApi,
    getApisByUser,
    getApiById,
    updateApi,
    deleteApi
} = require("../models/apiModel");

// ========================
// Create API
// ========================
const addApi = (req, res) => {

    const {
        api_name,
        endpoint_url,
        http_method,
        expected_status,
        monitoring_interval,
        description
    } = req.body;

    if (!api_name || !endpoint_url) {
        return res.status(400).json({
            success: false,
            message: "API Name and Endpoint URL are required."
        });
    }

    const apiData = {
        user_id: req.user.id,
        api_name,
        endpoint_url,
        http_method,
        expected_status,
        monitoring_interval,
        description
    };

    createApi(apiData, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "API Registered Successfully"
        });

    });

};

// ========================
// Get All APIs
// ========================
const getAllApis = (req, res) => {

    getApisByUser(req.user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    });

};

// ========================
// Get API By ID
// ========================
const getSingleApi = (req, res) => {

    getApiById(req.params.id, req.user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "API Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });

    });

};

// ========================
// Update API
// ========================
const editApi = (req, res) => {

    updateApi(
        req.params.id,
        req.user.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "API Not Found"
                });
            }

            res.status(200).json({
                success: true,
                message: "API Updated Successfully"
            });

        }
    );

};

// ========================
// Delete API
// ========================
const removeApi = (req, res) => {

    deleteApi(req.params.id, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "API Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "API Deleted Successfully"
        });

    });

};

module.exports = {
    addApi,
    getAllApis,
    getSingleApi,
    editApi,
    removeApi
};