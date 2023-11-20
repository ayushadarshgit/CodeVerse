const user = require("../controllers/userControllers");
const { validateUserLogin, validateUserSignin, validateUser } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route("/login").post(validateUserLogin, catchAsync(user.loginUser));
router.route("/signin").post(validateUserSignin,catchAsync(user.signInUser));
router.route("/signup").post(validateUser,catchAsync(user.signUpUser));


module.exports = router;