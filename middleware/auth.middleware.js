const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(400).json({ message: "Access denied."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(400).json({ message: "Invalid token."});
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Invalid token."});
    }
}

