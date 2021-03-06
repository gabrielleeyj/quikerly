var db = require('./Database/database');

exports.getOrders = (req, res) => {
    db.Order.find()
        .then((orders) => {
            res.json(orders);
        })
        .catch((error) => res.send(error))
};

db.Counter.findOne({ id: 'orderId' })
    .then(res => {
        console.log(res)
        if (!res) {
            db.Counter.create({
                id: 'orderId',
                orderNumber: 1
            })
        }
    })
    .catch(err => console.log(err))


exports.createOrder = (req, res) => {
    const outerRes = res;
    db.Counter.findOne({ id: 'orderId' })
        .then(counter => {
            let num = counter.orderNumber.toString()
            switch (num.length) {
                case '1':
                    return num = '00' + num
                case '2':
                    return num = '0' + num
                default:
                    break
            }
            const dON = req.body.deliveryOrderNumber + num;
            const data = { ...req.body, deliveryOrderNumber: dON }
            db.Counter.findByIdAndUpdate({ _id: counter._id }, { orderNumber: counter.orderNumber + 1 })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            db.Order.create(data)
                .then((newOrder) => {
                    outerRes.status(201).json(newOrder)
                })
                .catch((error) => {
                    outerRes.send(error)
                });
        })

}

exports.updateOrder = (req, res) => db.Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true })
    .then((order) => { console.log(req.body); res.status(201).json(order) })
    .catch((error) => res.send(error));


exports.removeOrder = (req, res) => db.Order.deleteOne({ _id: req.params.orderId })
    .then(() => res.json('Deleted'))
    .catch((err) => res.send(err))

module.exports = exports;