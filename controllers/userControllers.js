import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.json({
            error: true,
            message: 'User already exist!',
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m',
    });

    return res.json({
        user,
        accessToken,
        message: 'Registration Successful',
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m',
        });
        return res.json({
            message: 'Login successful',
            email,
            accessToken,
        });
    }else{
        return res.status(400).json({
            message: 'Wrong email or password',
        })
    }
};
