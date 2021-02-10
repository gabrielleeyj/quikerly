// import mongoose module
const mongoose = require("mongoose");

const { uri, options } = require("./config");

exports.connect = () => {
	mongoose
		.connect(uri, options)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((e) => {
			console.error("Connection error: ", e.message);
		});
	return mongoose.connection;
};
