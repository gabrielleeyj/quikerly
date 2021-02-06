var express = require("express");
var router = express.Router();

/* GET users listing. - Admin only */
router.get("/users", function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
