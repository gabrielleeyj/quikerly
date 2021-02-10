const mongoose = require("mongoose");

// Orders Schema based on this structure
// data: {
// 	_id: "",
// 	delivery_order: "",
// 	timestamp: "",
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

const orderSchema = new mongoose.Schema(
	{
		delivery_order: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
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
	},
	{ timestamps: true },
	{ collection: "users" }
);

// User Schema is based on this model
// user: {
// 	customer: {
//      userName: "",
//      email: "",
// 		firstName: "",
// 		lastName: "",
// 		pickupAddress: "",
// 		pickupPostal: "",
// 	}
// }

const userSchema = new mongoose.Schema(
	{
		user: {
			userName: { type: String, required: true, unique: true },
			email: { type: String, required: true },
			firstName: String,
			lastName: String,
			pickupAddress: String,
			pickupPostal: Number,
		},
	},
	{ timestamps: true },
	{ collection: "users" }
);

const Users = mongoose.model("users", userSchema);
const Orders = mongoose.model("orders", orderSchema);

module.exports = { Orders, Users };
