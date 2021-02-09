const express = require("express");
const router = express.Router();
const { Orders, Users } = require("../models/orders");

/* GET ALL orders listing. */
router.get(
	"/orders",
	function (err, req, res, next) {
		if (err.name === "ValidationError") {
			err.statusCode = 400;
		}
		if (err.name === "MongoError") {
			err.statusCode = 422;
			err.message = "Duplicate Title Error.";
		}
		next();
	},
	function (req, res, next) {
		const orderCollection = Orders.find();
		req.status(200).send(orderCollection);
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
