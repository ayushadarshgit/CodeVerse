const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWTSecret = process.env.JWTSECRET;

module.exports.loginSuccess = async (req, res) => {
    const searchedUser = await User.findById(req.user.id)
    const token = jwt.sign({ username: searchedUser.email }, JWTSecret, { expiresIn: '7d' });
    searchedUser.lastToken = token;
    await searchedUser.save();
    res.send(token);
}

module.exports.loginFail = (req, res) => {
    res.send("An Error occured");
}
module.exports.redirect = (req, res) => {
    return res.send(req.user);
}