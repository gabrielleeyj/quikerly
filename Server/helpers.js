var db = require('./Database/database');

exports.getOrders = (req, res) => {
    db.Order.find()
        .then((orders) => {
            res.json(orders);
        })
        .catch((error) => res.send(error))
};

exports.createOrder = (req, res) => {
    console.log(req.body)
    db.Order.create(req.body)
        .then((newOrder) => {
            res.status(201).json(newOrder)
        })
        .catch((error) => res.send(error));
}

exports.updateOrder = (req, res) => db.Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true })
    .then((order) => { console.log(req.body); res.status(201).json(order) })
    .catch((error) => res.send(error));

module.exports = exports;