const User = require("./models/User");
const { userSchema, chatSchema, fileSchema, folderSchema, messageSchema, userLogin, codeSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const jwt = require("jsonwebtoken");

const mapErrorDetails = (err) => {
    const msg = err.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400);
}

module.exports.validateUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateChat = async (req, res, next) => {
    const { error } = chatSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateFile = async (req, res, next) => {
    const { error } = fileSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateFolder = async (req, res, next) => {
    const { error } = folderSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateMessage = async (req, res, next) => {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        if (!req.body.message.iscode && !req.body.message.message) {
            throw new ExpressError("Please provide the message To be sent", 400);
        }
        const { err } = codeSchema.validate(req.body.message);
        if (err) {
            mapErrorDetails(err);
        }
        else next();
    }
}

module.exports.validateCodeToCompile = async (req, res, next) => {
    const { code, lang } = req.body;
    if (!code) {
        const msg = "Provide Code To Compile...\\n"
        throw new ExpressError(msg, 400);
    } else if (!lang) {
        const msg = "Provide Language To Compile...\\n"
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateUserLogin = async (req, res, next) => {
    const { error } = userLogin.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateUserSignin = async (req, res, next) => {
    if (!req.body.token) {
        throw new ExpressError("Token Not Provided", 400);
    }
    next();
}

module.exports.authCheck = (req, res, next) => {
    if (!req.user) {
        return res.send("Not authenticated");
    }
    next();
}

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        const userToLogin = await User.findOne({ email: decoded.username });
        if (!userToLogin) {
            throw new ExpressError("No user found", 400);
        }
        if (userToLogin.lastToken !== token) {
            throw new ExpressError("Token given has been expired!", 400);
        }
        req.user = userToLogin;
        next();
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