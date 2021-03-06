const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

router.route('/')
    .get(helpers.getOrders)
    .post(helpers.createOrder)

router.route('/:orderId')
    .put(helpers.updateOrder)
    .delete(helpers.removeOrder)

// end the input stream and allow the process to exit 
module.exports = router;
