const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "api_monitor"
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed");
        console.error("Error details:", err);
        console.error("Please make sure:");
        console.error("1. MySQL server is running");
        console.error("2. Database credentials in .env are correct");
        console.error("3. Database 'api_monitor' exists");
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = connection;