const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    fetchAllHistory,
    fetchHistoryByApi
} = require("../controllers/historyController");

router.get("/", verifyToken, fetchAllHistory);

router.get("/:apiId", verifyToken, fetchHistoryByApi);

module.exports = router;