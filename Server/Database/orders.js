const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	deliveryOrderNumber: {
		type: String,
		required: true,
	},
	orderDate: {
		type: String,
		required: true,
	},
	recipientName: {
		type: String,
		required: true,
	},
	recipientContact: {
		type: String,
		required: true,
	},
	recipientAddress: {
		type: String,
		required: true,
	},
	recipientPostalCode: {
		type: String,
		required: true,
	},
	Instructions: {
		type: String,
		required: true,
	},
	pickupTime: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userContact: {
		type: String,
		required: true,
	},
	userAddress: {
		type: String,
		required: true,
	},
	userPostalCode: {
		type: String,
		required: true,
	},
	cost: {
		type: String,
	},
	driver: {
		type: String,
	},
	status: {
		type: String,
	},
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
