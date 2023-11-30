const compiler = require("../controllers/compileControllers");
const { validateCodeToCompile } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.route('/')
    .post(catchAsync(validateCodeToCompile), catchAsync(compiler.compileCodeCompilex));
router.route('/api')
    .post(catchAsync(validateCodeToCompile), catchAsync(compiler.compileCodeRapidApi));

module.exports = router;