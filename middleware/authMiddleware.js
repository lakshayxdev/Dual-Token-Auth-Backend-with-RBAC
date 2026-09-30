const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const verify = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = verify;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token"
        });
    }
};

module.exports = protect;