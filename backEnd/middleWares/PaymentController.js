const Order = require("../models/Order.js");
const Razorpay = require("razorpay");

const createOrder = (request, response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log(request.body);
    const options = {
      amount: request.body.price,
      currency: "INR",
    };
    const order = instance.create(options);
    if (!order) response.send("Some error occurred");
    response.send(order);
  } catch (error) {
    response.send(error);
  }
};

const payOrder = async (request, response) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      request.body;
    const newOrder = await Order.create({
      isPaid: true,
      amount: amount,
      razorpay: {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    response.send({ msg: "payment was successful" });
  } catch (error) {
    response.send(error);
  }
};

const paymentResponse = async (request, response) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    response.send(orders);
  } catch (error) {
    response.send(error);
  }
};

module.exports = {
  createOrder,
  payOrder,
  paymentResponse
};
