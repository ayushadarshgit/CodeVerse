const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { authCheck } = require("../middleware");
const passports = require("../controllers/passportControllers");

const router = require("express").Router();

router.get('/signin',passport.authenticate('google',{
    scope: ['profile','email']
}));
router.get('/login',passport.authenticate('google'),authCheck,passports.loginSuccess);
router.get('/loginfail',passports.loginFail);

module.exports = router;