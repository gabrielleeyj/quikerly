// Import express modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// debugger for server
var logger = require("morgan");

// Import Routes
const orderRouter = require("../routes/orders");
const userRouter = require("../routes/users");
const indexRouter = require("../routes/index");

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

module.exports = app;
