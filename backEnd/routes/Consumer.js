const express = require('express');
const User = require('../models/Consumer.js');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart.js');

const dotenv = require('dotenv');
dotenv.config();
const { createOrder, payOrder, paymentResponse } = require('../middleWares/PaymentController.js');

const consumerroute = express.Router()

consumerroute.post("/signup",async(req,res)=>{
    const {name,userName,password,email} = req.body;
    try{
         const existingUser = await User.findOne({$or:[{email},{userName}]})
         if(existingUser){
            return res.status(401).json({error:"user already exists"})
         }
         const hashedPassword = bcryptjs.hashSync(password,10)
    
    const consumer = new User({
        name,
        email,
        password:hashedPassword,
        userName
    }) 
   const result = await consumer.save()
  
        return res.status(201).json({consumer:result,  success:"user created successfully"})
   
}catch(e){
    console.log(e);
}



})


consumerroute.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
          return res.status(401).json({ error: "User not found" });
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
          return res.status(401).json({ error: "Invalid password" });
      }
      const { password: hashedPassword, ...rest } = validUser._doc;
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // Verify JWT_SECRET is properly set
      return res.status(200).json({ user: rest, token }); // Return user data and token without setting cookie
  } catch (e) {
      next(e);
  }
});

consumerroute.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    
    if (!userId || !productId) {
      return res.status(400).json({ message: 'userId and productId are required' });
    }

  
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    let cart = await Cart.findOne({ userId });

    if (!cart) {
     
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
     
      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        // If the product exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ productId, quantity });
      }
    }

    
    await cart.save();
    res.json({ user, cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// products route



consumerroute.get("/cart/:userId", (req, res) => {
  // Find the user by ID
 User.findOne({ _id: req.params.userId }) 
      .select("-password")
      .then(user => {
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }
          // Find the cart items for the user
          Cart.findOne({ userId: req.params.userId })
              .populate({
                  path: 'items.productId',
                  model: 'Products',
                  select: 'productName price photo' 
              })
              .exec()
              .then(cart => {
                  if (!cart) {
                      return res.status(404).json({ error: "Cart not found for this user" });
                  }
                  res.json({ user, cart });
              })
              .catch(err => {
                  return res.status(500).json({ error: "Internal Server Error" });
              });
      })
      .catch(err => {
          return res.status(500).json({ error: "Internal Server Error" });
      });
});


       


consumerroute.delete("/cart/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const result = await Cart.updateOne(
      { userId },
      { $pull: { items: { _id: itemId } } }
    );

    if (result.nModified === 0) {
      return res.status(404).send("Item not found in the cart");
    }

    res.status(204).send();
  
  } catch (e) {
    console.error("Error deleting item:", e);
    res.status(500).send("Error deleting item from cart.");
  }
});


consumerroute.post("/clear-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Find the user by ID
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let cart = await Cart.findOne({ userId });

    
   
      
  
        cart.items = [];
        await cart.save()
        res.json({ user, cart });
    

    // Save the cart
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

consumerroute.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_API_KEY });
});
// Endpoint for initiating Razorpay payment
consumerroute.post("/create-order", createOrder);
consumerroute.post('/pay-order', payOrder);
consumerroute.get('/pay-res', paymentResponse);
module.exports =  consumerroute