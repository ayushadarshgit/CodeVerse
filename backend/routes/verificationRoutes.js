const router = require("express").Router();
const verify = require("../controllers/verificationControllers");
const { validateUserSignin, isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route('/sendmail')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(verify.sendOtp));

router.route('/verificationlink/:id')
    .post(catchAsync(verify.verifyEmail));

router.route('/otpverification')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(verify.verifyOtp));

router.route('/forgotpassword')
    .post(catchAsync(verify.forgotPassword));

router.route('/changepassword')
    .post(catchAsync(verify.changePassword));

module.exports = router;