const router = require("express").Router();

const user = require("../controllers/userControllers");
const { validateUserLogin, validateUserSignin, validateUser } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const {storage} = require("../cloudinary/index");
const upload = multer({storage});

router.route("/login")
    .post(validateUserLogin, catchAsync(user.loginUser));

router.route("/signin")
    .post(validateUserSignin, catchAsync(user.signInUser));

router.route("/signup")
    .post(upload.single('image'),validateUser, catchAsync(user.signUpUser));


module.exports = router;