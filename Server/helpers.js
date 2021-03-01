var db = require("./Database/database");

exports.getOrders = (req, res) => {
	db.Order.find()
		.then((orders) => {
			res.json(orders);
		})
		.catch((error) => res.send(error));
};

db.Counter.findOne({ id: "orderId" })
	.then((res) => {
		console.log(res);
		if (!res) {
			db.Counter.create({
				id: "orderId",
				orderNumber: 1,
			});
		}
	})
	.catch((err) => console.log(err));

exports.createOrder = (req, res) => {
	const outerRes = res;
	db.Counter.findOne({ id: "orderId" }).then((res) => {
		const data = { ...req.body, deliveryOrderNumber: res.orderNumber };
		db.Counter.findByIdAndUpdate(
			{ _id: res._id },
			{ orderNumber: res.orderNumber + 1 }
		)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		db.Order.create(data)
			.then((newOrder) => {
				outerRes.status(201).json(newOrder);
			})
			.catch((error) => {
				outerRes.send(error);
			});
	});
};

exports.updateOrder = (req, res) =>
	db.Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, {
		new: true,
	})
		.then((order) => {
			console.log(req.body);
			res.status(201).json(order);
		})
		.catch((error) => res.send(error));

module.exports = exports;
