const { validateUserSignin, isLoggedIn, validateChat } = require("../middleware");
const chats = require("../controllers/chatControllers");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route('/getchat')
    .post(validateUserSignin,isLoggedIn,catchAsync(chats.getChat));

router.route('/fetchchats')
    .post(validateUserSignin,isLoggedIn,catchAsync(chats.fetchChats));

router.route('/creategroupchat')
    .post(validateUserSignin,isLoggedIn,validateChat,catchAsync(chats.createGroupChat));

router.route('/renamegroup')
    .post(validateUserSignin,isLoggedIn,catchAsync(chats.renameGroup));

router.route('/addtogroup')
    .post(validateChat,isLoggedIn,catchAsync(chats.addToGroup));

router.route('/removefromgroup')
    .post(validateUserSignin,isLoggedIn,catchAsync(chats.removeFromGroup));

router.route('/updateicon')
    .post(validateChat,isLoggedIn,catchAsync(chats.updateIcon));

module.exports = router;