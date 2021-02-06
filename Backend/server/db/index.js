const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client.connect((err) => {
	const collection = client.db("db").collection("orders");
	// perform actions on the collection object
	if (err != null) {
		console.log(err);
		client.close();
	}
	console.log("Collection Connected");
});

// mongoose
// 	.connect(uri, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	})
// 	.then(() => {
// 		console.log("Connection Opened");
// 	})
// 	.catch((e) => {
// 		console.error("Connection error: ", e.message);
// 	});

const db = mongoose.connection;

module.exports = db;

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
