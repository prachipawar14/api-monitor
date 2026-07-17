const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("./scheduler/monitorScheduler");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/apis", apiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/monitoring", historyRoutes);


// Test Route
app.get("/", (req, res) => {
    res.send("API Monitor Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});