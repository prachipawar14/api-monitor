const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    createUser,
    findUserByEmail
} = require("../models/userModel");

// ====================== REGISTER ======================
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if email already exists
        findUserByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user
            createUser(name, email, hashedPassword, (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ====================== LOGIN ======================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        findUserByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = results[0];

            console.log("Entered Password:", password);
            console.log("Stored Hash:", user.password);

            const isMatch = await bcrypt.compare(password, user.password);

            console.log("Password Match:", isMatch);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            // JWT Token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "Login Successful",
                token
            });

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};