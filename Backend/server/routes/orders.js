var express = require("express");
var router = express.Router();

/* GET ALL orders listing. */
router.get(
	"/orders",
	function (req, res, next) {
		res.send("respond with a resource", req.body);
		next();
	},
	function (req, res) {
		res.send("All orders!");
	}
);

/* GET order listing. */
router.get("/orders/:orderId", function (req, res, next) {
	res.send("respond with a resource");
});

/* DELETE order */
router.delete("/orders/:orderId", function (req, res, next) {
	res.send("respond with a resource");
});

/* CREATE order */
router.post("/create", function (req, res, next) {
	res.send("respond with a resource");
});

/* EDIT/UPDATE order */
router.patch("/update/:orderId", function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
