const router = require("express").Router();

const message = require("../controllers/messageControllers");
const { validateUserSignin, isLoggedIn, validateMessage } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route("/sendmessage")
    .post(validateUserSignin,isLoggedIn,validateMessage,catchAsync(message.sendMessage));

router.route("/allmessage")
    .get(validateUserSignin,isLoggedIn,catchAsync(message.allMessages));

module.exports = router;