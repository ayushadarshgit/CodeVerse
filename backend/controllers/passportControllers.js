const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWTSecret = process.env.JWTSECRET;

module.exports.loginSuccess = async (req, res) => {
    const searchedUser = await User.findById(req.user.id)
    const token = jwt.sign({ username: searchedUser.email }, JWTSecret, { expiresIn: '7d' });
    searchedUser.lastToken = token;
    await searchedUser.save();
    // res.send(token);
    res.redirect(`http://localhost:3000/googlelogin?token=${token}`)
}

module.exports.loginFail = (req, res) => {
    res.redirect(`http://localhost:3000/googlelogin?token=${"someerroroccured"}`)
}
module.exports.redirect = (req, res) => {
    return res.send(req.user);
}