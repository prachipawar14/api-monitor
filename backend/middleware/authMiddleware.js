const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    // Get Authorization Header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    // Remove "Bearer " from token
    const token = authHeader.split(" ")[1];

    // Verify Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        // Save logged-in user information
        req.user = decoded;

        next(); // Continue to the controller
    });

};

module.exports = verifyToken;