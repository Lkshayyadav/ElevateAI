const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }
        const isBlacklisted = await tokenBlacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized: Token is blacklisted"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "Lakshay123");
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = { authUser };