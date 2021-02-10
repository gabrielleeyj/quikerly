// import env config
require("dotenv").config();

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || 5000,
	uri: process.env.URI,
	options: {
		useNewUrlParser: true, // prevent deprecation warnings
		useUnifiedTopology: true, // use new connection management engine
		useCreateIndex: true, // for creating index with unique
		useFindAndModify: false, // use native driver for findOneAndUpdate
		serverSelectionTimeoutMS: 5000, // set timeout in milliseconds
	},
};
