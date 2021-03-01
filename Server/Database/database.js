const mongoose = require('mongoose');
const Order = require('./orders');

const connectToMongo = () => {
    mongoose.connect('Your Url', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    connectToMongo,
    Order
}