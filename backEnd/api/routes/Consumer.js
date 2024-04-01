import express from 'express'
import User from '../models/Consumer.js'
import bcryptjs from 'bcryptjs'
import Products from '../models/Product.js'
import jwt from 'jsonwebtoken'
import Cart from '../models/Cart.js'
import {Stripe} from 'stripe';

import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27', // Specify the Stripe API version
});
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

// Update the '/signin' route to set the cookie with a consistent name
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
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const age = new Date(Date.now() + 3600000); // Set cookie expiry time (e.g., 1 hour)
        res.cookie('access_token', token, { httpOnly: true, expires: age }); // Correct cookie name
        return res.status(200).json({ user: rest, token }); // Return user data and token
    } catch (e) {
        next(e);
    }
});

consumerroute.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if the product already exists in the cart
      const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        // If the product exists, update its quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ productId, quantity });
      }
    }

    // Save the cart
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
 User.findOne({ _id: req.params.userId }) // Changed from User to User
      .select("-password")
      .then(user => {
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }
          // Find the cart items for the user
          Cart.findOne({ userId: req.params.userId })
              .populate({
                  path: 'items.productId',
                  model: 'Products', // Assuming 'Product' is the name of your product model
                  select: 'productName price photo' // Select the fields you want to populate
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



const stripeSecret = process.env.STRIPE_SECRET;
const stripeInstance = new Stripe(stripeSecret, {
  apiVersion: '2020-08-27', // or your desired version
});

consumerroute.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    // Convert products into lineItems format
    const lineItems = products.map((product) => {
      if (!product || typeof product.price !== 'number' || isNaN(product.price)) {
        console.error('Invalid product data:', product);
        return null;
      }

      const unitAmount = product.price * 100; // Amount in cents
      return {
        price_data: {
          currency: 'usd', // Change to your desired currency
          product_data: {
            name: product.productName,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      };
    }).filter(Boolean); // Filter out any null values

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success', 
      cancel_url: 'http://localhost:5173/cancel', 
    });

    // Return the session ID to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});
export default consumerroute