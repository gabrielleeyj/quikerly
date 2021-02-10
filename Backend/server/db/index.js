// Import express modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// debugger for server
var logger = require("morgan");

// import mongoose module
const mongoose = require("mongoose");

// Import Routes
const orderRouter = require("../routes/orders");
const userRouter = require("../routes/users");
const indexRouter = require("../routes/index");

// import env config
require("dotenv").config();
const port = process.env.PORT || 5000;

// mongodb connection settings
const uri = process.env.URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true, // prevent deprecation warnings
		useUnifiedTopology: true, // use new connection management engine
		useCreateIndex: true, // for creating index with unique
		useFindAndModify: false, // use native driver for findOneAndUpdate
		serverSelectionTimeoutMS: 5000, // set timeout in milliseconds
	})
	.then(() => {
		console.log("Connected to MongoDB");

		// initialize express
		const app = express();

		app.use(logger("dev"));
		app.use(cors());
		app.use(express.json());
		// bodyParser, parses the request body to be a readable json format
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		// routes - orders
		app.get("/orders", orderRouter);
		app.post("/orders", orderRouter);
		app.delete("/orders/:orderId", orderRouter);
		app.patch("orders/:orderId", orderRouter);

		// routes - users
		app.use("/users", userRouter);

		// routes - index
		app.use("/", indexRouter);

		// start express backend server
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch((e) => {
		console.error("Connection error: ", e.message);
	});

module.exports = db;
