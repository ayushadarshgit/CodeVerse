const Joi = require("joi");

const userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]+(?:\s[a-zA-Z]+)*$"))
            .required(),
        email: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            .required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=[A-Za-z1-9@$!%*?&])[^@$!%*?&]*[A-Za-z1-9@$!%*?&]{1,}$"))
            .required(),
        image: Joi.any()
    }).required()
});

const chatSchema = Joi.object({
    chat: Joi.object({
        chatname: Joi.string()
            .required(),
        users: Joi.array()
            .items(Joi.any())
            .min(2)
    }).required()
});

const fileSchema = Joi.object({
    file: Joi.object({
        filename: Joi.string()
            .required(),
        language: Joi.string()
            .required()
    }).required()
});

const folderSchema = Joi.object({
    folder: Joi.object({
        foldername: Joi.string()
            .required()
    }).required()
});

const messageSchema = Joi.object({
    message: Joi.object({
        chat: Joi.any()
            .required(),
        sender: Joi.any()
            .required(),
        iscode: Joi.boolean()
            .required()
    }).required()
});

const codeSchema = Joi.object({
    code: Joi.object({
        code: Joi.string()
            .required(),
        language: Joi.string()
            .required(),
        title: Joi.string()
            .required()
    }).required()
})

const userLogin = Joi.object({
    user: Joi.object({
        username: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            .required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=[A-Za-z1-9@$!%*?&])[^@$!%*?&]*[A-Za-z1-9@$!%*?&]{1,}$"))
            .required()
    }).required()
})

module.exports = {
    userSchema,
    chatSchema,
    fileSchema,
    folderSchema,
    messageSchema,
    userLogin,
    codeSchema
}