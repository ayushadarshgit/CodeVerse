const { userSchema, chatSchema, fileSchema, folderSchema, messageSchema } = require("./schemas");
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
    if (!code){
        const msg = "Provide Code To Compile..."
        throw new ExpressError(msg,400);
    }else if(!lang){
        const msg = "Provide Language To Compile..."
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}