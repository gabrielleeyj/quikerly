// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const db = require('./db')

// const app = express()
// const apiPort = 3000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(bodyParser.json())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

// initialize express JS and mongoose
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(
	"mongodb+srv://UserName:<password>@cluster0-8vkls.mongodb.net/test?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);

app.use(foodRouter);

app.listen(3000, () => {
	console.log("Server is running...");
});
