const { validateUserSignin, isLoggedIn, validateFolder } = require("../middleware");
const folders = require("../controllers/folderControllers");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route('/getdetails')
    .get(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(folders.getFolderDetails));

router.route('/createfolder')
    .post(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(validateFolder), catchAsync(folders.createFolder));

router.route('/deletefolder')
    .put(catchAsync(validateUserSignin), catchAsync(isLoggedIn), catchAsync(folders.deleteFolder));

module.exports = router;