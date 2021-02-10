var express = require("express");
var router = express.Router();

/* GET users listing. - Admin only */
router.get("/users", function (req, res) {
	res.send("hello!");
});

module.exports = router;
