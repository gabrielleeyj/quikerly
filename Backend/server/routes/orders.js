const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");

/* GET ALL orders listing. */
router.get("/orders", async (req, res) => {
	try {
		const orderCollection = await Orders.find({});
		res.send(orderCollection);
	} catch {
		res.status(404);
		res.send({ error: "No Orders!" });
	}
});

/* GET order listing. */
router.get("/orders/:orderId", async (req, res) => {
	try {
		const order = await Orders.findById({
			delivery_order: req.params.delivery_order,
		});
		res.status(204).send(order);
	} catch {
		res.status(404);
		res.send({ error: "Invalid Order!" });
	}
});

/* DELETE order */
router.delete("/orders/:orderId", async (req, res) => {
	try {
		await Orders.deleteOne({ delivery_order: req.params.delivery_order });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Order doesn't exist!" });
	}
});

/* CREATE order */
router.post("/orders", async (req, res) => {
	const {
		delivery_order,
		user,
		recipient,
		instructions,
		pickupTime,
		cost,
		driver,
		status,
		timestamps,
	} = req.body;
	try {
		const order = new Order({
			delivery_order,
			user,
			recipient,
			instructions,
			pickupTime,
			cost,
			driver,
			status,
			timestamps,
		});
		await order.save();
		res.send(order);
	} catch {
		res.status(404);
		res.send({ error: "Order Not Found!" });
	}
});

/* EDIT/UPDATE order */
router.patch("/orders/:orderId", async (req, res) => {
	try {
		const order = Orders.findOne({ delivery_order: req.body.delivery_order });
		if (req.body.delivery_order) {
			post.delivery_order = req.body.delivery_order;
		}
		if (req.body.recipient) {
			post.recipient = req.body.recipient;
		}
		if (req.body.pickupTime) {
			post.pickupTime = req.body.pickupTime;
		}
		if (req.body.cost) {
			post.cost = req.body.cost;
		}
		if (req.body.driver) {
			post.driver = req.body.driver;
		}

		await order.save();
		res.send(order);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

module.exports = router;
