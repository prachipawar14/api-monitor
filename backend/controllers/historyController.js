const {
    getAllHistory,
    getHistoryByApiId
} = require("../models/historyModel");

const fetchAllHistory = (req, res) => {

    getAllHistory((err, results) => {

        console.log("Error:", err);
        console.log("Results:", results);

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });

    });

};

const fetchHistoryByApi = (req, res) => {

    getHistoryByApiId(req.params.apiId, (err, results) => {

        console.log("API ID:", req.params.apiId);
        console.log("Results:", results);

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });

    });

};

module.exports = {
    fetchAllHistory,
    fetchHistoryByApi
};