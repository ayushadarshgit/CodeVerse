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
                searchedUser.lastToken = token;
                await searchedUser.save();
                return res.json({ success: true, token: token, user: searchedUser });
            }
        } catch (error) {
            throw new ExpressError("Username and password not matching", 400);
        }
    }
}

module.exports.signInUser = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, JWTSecret);
        const userToLogin = await User.findOne({ email: decoded.username }, "-password");
        if (!userToLogin) {
            throw new ExpressError("No user found", 400);
        }
        if (userToLogin.lastToken !== token) {
            throw new ExpressError("Token given has been expired!", 400);
        }
        return res.json({ success: true, decoded: decoded, user: userToLogin });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ExpressError("Token Expired ", 400);
        } else if (error.name === 'JsonWebTokenError') {
            throw new ExpressError('Invalid JWT token.', 400);
        } else {
            throw new ExpressError(error.message, 400);
        }
    }
}

module.exports.signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        const u = await User.findOne({ email: email });
        if (u) {
            throw new ExpressError("Email address Already exists", 400);
        }
        const newUser = new User(req.body.user);

        const p = await Bcrypt.hashPassword(password);
        const createdFolder = new Folder();
        createdFolder.foldername = "root"
        createdFolder.isdefaultfolder = true;

        await createdFolder.save();

        newUser.password = p;
        newUser.defaultfolder = createdFolder;
        newUser.isEmailVerified = false;
        const token = jwt.sign({ username: newUser.email }, JWTSecret, { expiresIn: '7d' });
        newUser.lastToken = token;
        await newUser.save();
        return res.json({ success: true, token: token, user: newUser });
    } catch (error) {
        console.log(error);
        throw new ExpressError(error);
    }
}

module.exports.allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ],
    } :
        {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    return res.status(200).json({ success: true, users: users });
}