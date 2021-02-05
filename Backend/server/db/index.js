const mongoose = require("mongoose");

mongoose
	.connect("mongodb+srv://127.0.0.1:27017/cinema", { useNewUrlParser: true })
	.catch((e) => {
		console.error("Connection error", e.message);
	});

const db = mongoose.connection;

module.exports = db;

const MongoClient = require("mongodb").MongoClient;
const uri =
	"mongodb+srv://quikadmin:<password>@cluster0.oaiam.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
	const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	client.close();
});
