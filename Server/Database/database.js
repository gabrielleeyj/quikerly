const mongoose = require("mongoose");
const Order = require("./orders");
const Counter = require("./counter");

require("dotenv").config();

const connectToMongo = () => {
	mongoose.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
};
mongoose.set("useFindAndModify", false);
module.exports = {
	connectToMongo,
	Order,
	Counter,
};
