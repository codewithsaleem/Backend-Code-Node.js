const mongoose = require("mongoose");
const {Schema} = mongoose;

const cartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    CategoryName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('cart', cartSchema);