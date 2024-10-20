const User = require('../model/user');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
