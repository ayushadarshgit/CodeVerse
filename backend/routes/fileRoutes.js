const router = require("express").Router();

const files = require("../controllers/fileControllers");
const { validateUserSignin, isLoggedIn, validateFile } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route('/')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(files.getFileContent));

router.route('/create')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn), catchAsync(validateFile), catchAsync(files.createFile));
    
router.route('/createtempfile')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn), catchAsync(files.saveTempFile));

router.route('/save')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(files.saveChanges));

router.route('/delete')
    .post(catchAsync(validateUserSignin),catchAsync(isLoggedIn),catchAsync(files.deleteFile));

module.exports = router;