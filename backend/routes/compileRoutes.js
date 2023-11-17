const { compileCodeCompilex, compileCodeRapidApi } = require("../controllers/compileControllers");

const router = require("express").Router();

router.route('/').post(compileCodeCompilex);
router.route('/api').post(compileCodeRapidApi);

module.exports = router;