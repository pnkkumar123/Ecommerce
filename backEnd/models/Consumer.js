const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ConsumerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    isSeller: {
        type: Boolean,
        default: false
    },
    cart: [{ type: Types.ObjectId, ref: 'Cart' }],
    orders: [{ type: Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model("Consumer", ConsumerSchema);

module.exports = User;
