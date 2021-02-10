const { port, env } = require("./db/config");
const app = require("./db/express");
const mongoose = require("./db/mongoose");

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));
