const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user exists
            req.user = await User.findById(decoded.userId || decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found, not authorized" });
            }

            next();
        } catch (error) {
            console.error("JWT Error:", error);
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect; //direct export
