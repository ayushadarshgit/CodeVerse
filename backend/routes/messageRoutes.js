const router = require("express").Router();

const message = require("../controllers/messageControllers");
const { validateUserSignin, isLoggedIn, validateMessage } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route("/sendmessage")
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(validateMessage),catchAsync(message.sendMessage));

router.route("/allmessage")
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(message.allMessages));

module.exports = router;