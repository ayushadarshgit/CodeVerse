const router = require("express").Router();
const verify = require("../controllers/verificationControllers");
const { validateUserSignin, isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route('/sendmail')
    .get(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(verify.sendOtp));

router.route('/verificationlink/:id')
    .get(catchAsync(verify.verifyEmail));

router.route('/otpverification')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(verify.verifyOtp));

router.route('/forgotpassword')
    .get(catchAsync(verify.forgotPassword));

router.route('/changepassword')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(verify.changePassword));

module.exports = router;