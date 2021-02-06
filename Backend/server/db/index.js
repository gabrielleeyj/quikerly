const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://quikadmin:Leroy834!@cluster0.oaiam.mongodb.net/quikerly?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.catch((e) => {
		console.error("Connection error", e.message);
	});

const db = mongoose.connection;

module.exports = db;
