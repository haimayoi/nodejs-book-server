const express = require('express');

module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(400).json({ message: "Access denied."});
    }
};