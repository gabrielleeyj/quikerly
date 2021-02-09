// Imports
const express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var createError = require("http-errors");

// Routes
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
		// initialize express
		const app = express();

		app.use(logger("dev"));
		app.use(cors());
		app.use(express.json());
		app.use(cookieParser());

		// routes
		app.use("/orders", orderRouter);
		app.use("/users", userRouter);
		app.use("/", indexRouter);
		console.log("Connected to MongoDB");

		// start express backend server
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch((e) => {
		console.error("Connection error: ", e.message);
	});

const db = mongoose.connection;
module.exports = db;
