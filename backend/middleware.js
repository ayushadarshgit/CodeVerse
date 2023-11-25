const { userSchema, chatSchema, fileSchema, folderSchema, messageSchema, userLogin } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

const mapErrorDetails = (err) => {
    const msg = err.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400);
}

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateChat = (req, res, next) => {
    const { error } = chatSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateFile = (req, res, next) => {
    const { error } = fileSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateFolder = (req, res, next) => {
    const { error } = folderSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateMessage = (req, res, next) => {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateCodeToCompile = (req, res, next) => {
    const { code, lang } = req.body;
    if (!code) {
        const msg = "Provide Code To Compile..."
        throw new ExpressError(msg, 400);
    } else if (!lang) {
        const msg = "Provide Language To Compile..."
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateUserLogin = (req, res, next) => {
    const { error } = userLogin.validate(req.body);
    if (error) {
        mapErrorDetails(error);
    } else {
        next();
    }
}

module.exports.validateUserSignin = (req, res, next) => { 
    if(!req.body.token){
        throw new ExpressError("Token Not Provided", 400);
    }
    next();
}

module.exports.authCheck = (req,res,next)=>{
    if(!req.user){
        return res.send("Not authenticated");
    }
    next();
}