const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
	orderNumber: {
		type: Number,
	},
	id: {
		type: String,
	},
});

const Counter = mongoose.model("counter", counterSchema);
module.exports = Counter;
