const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    isPaid: Boolean,
    amount: Number,
    razorpay: {
        order_id: String,
        payment_id: String,
        signature: String,
    },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = {
    OrderSchema,
    OrderModel
};
