var express = require("express");
var router = express.Router();

/* GET home page. */
router.get(
	"/",
	function (req, res, next) {
		if (err.name === "ValidationError") {
			err.statusCode = 400;
		}
		if (err.name === "MongoError") {
			err.statusCode = 422;
			err.message = "Duplicate Title Error.";
		}
		next();
	},
	function (req, res) {
		res.send("Quikerly API");
	}
);

module.exports = router;
