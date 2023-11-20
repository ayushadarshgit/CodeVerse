const jwt = require("jsonwebtoken");
const Bcrypt = require("../bcrypt/index");
const ExpressError = require("../utils/ExpressError");

const User = require("../models/User");
const Folder = require("../models/Folder");

const JWTSecret = process.env.JWTSECRET;

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body.user;
    const searchedUser = await User.findOne({ email: username });
    if (!searchedUser) {
        throw new ExpressError("The Username Entered By You Not found", 400);
    } else {
        try {
            const passwordMatched = await Bcrypt.matchPassword(password, searchedUser.password);
            if (!passwordMatched) {
                throw new ExpressError("The username and password didn't match", 400);
            } else {
                const token = jwt.sign({ username: searchedUser.email }, JWTSecret, { expiresIn: '7d' });
                return res.json({ success: true, token: token, user: searchedUser });
            }
        } catch (error) {
            new ExpressError("Password Matching Error", 400);
        }
    }
}

module.exports.signInUser = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, JWTSecret);
        const userToLogin = await User.findOne({ email: decoded.username });
        if (!userToLogin) {
            throw new ExpressError("No user found", 400);
        }
        return res.json({ success: true, decoded: decoded, user: userToLogin });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ExpressError("Token Expired ", 400);
        } else if (error.name === 'JsonWebTokenError') {
            throw new ExpressError('Invalid JWT token.', 400);
        } else {
            throw new ExpressError('No such token found', 400);
        }
    }
}

module.exports.signUpUser = async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body.user;
        const u = await User.findOne({ email: email });
        if (u) {
            throw new ExpressError("Email address Already exists", 400);
        }
        const us = await User.findOne({ phoneNumber: phoneNumber });
        if (us) {
            throw new ExpressError("Phone Already exists in the database", 400);
        }

        const p = await Bcrypt.hashPassword(password);
        const createdFolder = new Folder();
        createdFolder.foldername = "root"
        createdFolder.isdefaultfolder = true;

        await createdFolder.save();

        const newUser = new User(req.body.user);
        newUser.password = p;
        newUser.defaultfolder = createdFolder;

        await newUser.save();
        const token = jwt.sign({ username: newUser.email }, JWTSecret, { expiresIn: '7d' });
        return res.json({ success: true, token: token, user: newUser });
    } catch (error) {
        throw new ExpressError("Signup Filed Try Again Later",400);
    }
}