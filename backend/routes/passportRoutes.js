const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { authCheck } = require("../middleware");
const passports = require("../controllers/passportControllers");

const router = require("express").Router();

router.route('/signin')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.route('/login')
    .get(passport.authenticate('google'), authCheck, passports.loginSuccess);

router.route('/loginfail')
    .get(passports.loginFail);

module.exports = router;