const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addApi,
    getAllApis,
    getSingleApi,
    editApi,
    removeApi
} = require("../controllers/apiController");

// Create API
router.post("/", verifyToken, addApi);

// Get All APIs
router.get("/", verifyToken, getAllApis);

// Get API By ID
router.get("/:id", verifyToken, getSingleApi);

// Update API
router.put("/:id", verifyToken, editApi);

// Delete API
router.delete("/:id", verifyToken, removeApi);

module.exports = router;