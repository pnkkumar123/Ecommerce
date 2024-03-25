import express from 'express'
import User from '../models/Consumer.js'
import bcryptjs from 'bcryptjs'
import Products from '../models/Product.js'
import jwt from 'jsonwebtoken'
import Cart from '../models/Cart.js'


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
    const { userId, productId, productName, price, photo } = req.body;

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
      cart = new Cart({ userId, items: [{ productId, productName, price, photo }] });
    } else {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
      if (itemIndex === -1) {
        // If product doesn't exist, add it to the cart
        cart.items.push({ productId, productName, price, photo });
      } else {
        // If product exists, update its quantity or any other relevant details
        // For example: cart.items[itemIndex].quantity += 1;
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



consumerroute.get("/cart/:id", (req, res) => {
  // Find the user by ID
 User.findOne({ _id: req.params.id }) // Changed from User to User
      .select("-password")
      .then(user => {
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }
          // Find the cart items for the user
          Cart.findOne({ userId: req.params.id })
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


       


consumerroute.post("/remove-from-cart",async (req,res)=>{
    const {userId,productId} = req.body;
    try{
        const consumer = await User.findById(userId);
        if(!consumer){
            return res.status(404).json({error:"User not found"});
        }
        // remove the productId from the user's cart
        consumer.cart = consumer.cart.filter(item=>item.toString() !== productId);
        await consumer.save();
        res.json({message:'Product removed from cart successfully'})
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"})
    }
})
consumerroute.post("/clear-cart",async (req,res)=>{
    const {userId} = req.body;
    try{
        const consumer = await User.findById(userId);
        if(!consumer){
            res.status(404).json({error:'User not found'});
        }
        consumer.cart = [];
        await consumer.save();
        res.json({message:'Cart cleared successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({eror:'Server error'})
    }
})
export default consumerroute