const { validateUserSignin, isLoggedIn, validateFolder } = require("../middleware");
const folders = require("../controllers/folderControllers");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route('/getdetails')
    .get(validateUserSignin,isLoggedIn,catchAsync(folders.getFolderDetails));

router.route('/createfolder')
    .post(validateUserSignin,isLoggedIn,validateFolder,catchAsync(folders.createFolder));

router.route('/deletefolder')
    .put(validateUserSignin,isLoggedIn,catchAsync(folders.deleteFolder));

module.exports = router;