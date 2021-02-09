// Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var logger = require("morgan");
const mongoose = require("mongoose");

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
		// console.log("Connected to MongoDB");

		// initialize express
		const app = express();

		app.use(logger("dev"));
		app.use(cors());
		app.use(express.json());
		// bodyParser, parses the request body to be a readable json format
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		// routes
		app.get("/orders", orderRouter);
		app.post("/orders", orderRouter);
		app.use("/users", userRouter);
		app.use("/", indexRouter);

		// start express backend server
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch((e) => {
		console.error("Connection error: ", e.message);
	});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
