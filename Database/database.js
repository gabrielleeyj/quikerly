const mongoose = require("mongoose");
const Order = require("./orders");
const Counter = require("./counter");

const connectToMongo = () => {
	mongoose.connect(
		"mongodb+srv://quikadmin:Leroy834@cluster0.ddqvf.mongodb.net/db?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
};
mongoose.set("useFindAndModify", false);
module.exports = {
	connectToMongo,
	Order,
};
