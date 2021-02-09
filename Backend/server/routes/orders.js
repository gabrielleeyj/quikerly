const express = require("express");
const router = express.Router();
const { Orders, Users } = require("../models/orders");

/* GET ALL orders listing. */
router.get("/orders", async (req, res) => {
	const orderCollection = await Orders.find();
	res.send(orderCollection);
});

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
