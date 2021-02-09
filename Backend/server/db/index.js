const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const orderRouter = require("../routes/orders");
const userRouter = require("../routes/users");
const indexRouter = require("../routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/", indexRouter);

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
	})
	.catch((e) => {
		console.error("Connection error: ", e.message);
	});

const db = mongoose.connection;

module.exports = db;

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
