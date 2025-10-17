const User = require('../model/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all request fields."});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use."});
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json({ message: "Registered successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all request fields."});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials."});
        }

        const checkMatch = await bcrypt.compare(password, user.password);
        if (!checkMatch) {
            return res.status(400).json({ message: "Invalid credentials."});
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.status(200).json({
            message: "Login successfully!",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: true })
    }
}; 