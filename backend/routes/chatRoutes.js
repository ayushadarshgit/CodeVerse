const { validateUserSignin, isLoggedIn, validateChat } = require("../middleware");
const chats = require("../controllers/chatControllers");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route('/getchat')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(chats.getChat));

router.route('/fetchchats')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(chats.fetchChats));

router.route('/creategroupchat')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(validateChat), catchAsync(chats.createGroupChat));

router.route('/renamegroup')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(chats.renameGroup));

router.route('/addtogroup')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(chats.addToGroup));

router.route('/removefromgroup')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(chats.removeFromGroup));

module.exports = router;