const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Item', ItemSchema);