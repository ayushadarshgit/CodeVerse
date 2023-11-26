const router = require("express").Router();

const files = require("../controllers/fileControllers");
const { validateUserSignin, isLoggedIn, validateFile } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route('/')
    .get(validateUserSignin,isLoggedIn,catchAsync(files.getFileContent));

router.route('/create')
    .post(validateUserSignin,isLoggedIn, validateFile, catchAsync(files.createFile));

router.route('/save')
    .put(validateUserSignin,isLoggedIn,catchAsync(files.saveChanges));

router.route('/delete')
    .put(validateUserSignin,isLoggedIn,catchAsync(files.deleteFile));

module.exports = router;