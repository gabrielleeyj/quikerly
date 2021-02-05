const mongoose = require("mongoose");

// Orders Schema based on this structure
// data: {
// 	_id: "",
// 	delivery_order: "",
// 	timestamp: "",
// 	customer: {
// 		firstName: "",
// 		lastName: "",
// 		pickupAddress: "",
// 		pickupPostal: "",
// 		},
// 	recipient: {
// 		firstName: "",
// 		lastName: "",
// 		contact: "",
// 		deliveryAddress: "",
// 		deliveryPostal: "",
// 		},
// 	instructions: "",
// 	pickupTime: "",
// 	cost: "",
// 	driver: "",
// 	status: "",
// }

const OrdersSchema = new mongoose.Schema({
	delivery_order: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	customer: {
		firstName: String,
		lastName: String,
		pickupAddress: String,
		pickupPostal: Number,
	},
	recipient: {
		firstName: String,
		lastName: String,
		deliveryAddress: String,
		contact: {
			type: Number,
			required: true,
		},
		deliveryPostal: Number,
	},
	instructions: String,
	pickupTime: {
		type: Date,
		default: empty,
	},
	cost: mongoose.Decimal128,
	driver: {
		type: String,
		required: true,
		lowercase: true,
	},
	status: {
		type: String,
		required: true,
	},
});

const Orders = mongoose.model("orders", OrdersSchema);
module.exports = Orders;
