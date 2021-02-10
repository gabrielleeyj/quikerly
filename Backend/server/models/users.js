const mongoose = require("mongoose");

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
	{ timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
