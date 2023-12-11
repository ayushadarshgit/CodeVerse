const router = require("express").Router();

const user = require("../controllers/userControllers");
const { validateUserLogin, validateUserSignin, validateUser } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route("/login")
    .post(catchAsync(validateUserLogin), catchAsync(user.loginUser));

router.route("/signin")
    .post(catchAsync(validateUserSignin), catchAsync(user.signInUser));

router.route("/signup")
    .post(catchAsync(validateUser), catchAsync(user.signUpUser));


module.exports = router;