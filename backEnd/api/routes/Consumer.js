import express from 'express'
import ConsumerSchema from '../models/Consumer.js'
import bcryptjs from 'bcryptjs'
// import Product from '../models/Product.js'
import jwt from 'jsonwebtoken'

const consumerroute = express.Router()


consumerroute.post("/signup",async(req,res)=>{
    const {name,userName,password,email} = req.body;
    try{
         const existingUser = await ConsumerSchema.findOne({$or:[{email},{userName}]})
         if(existingUser){
            return res.status(401).json({error:"user already exists"})
         }
         const hashedPassword = bcryptjs.hashSync(password,10)
    
    const consumer = new ConsumerSchema({
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

consumerroute.post("/signin",async (req,res,next)=>{
    const {email,password} = req.body;
    try{
        const validUser = await ConsumerSchema.findOne({email})
        if(!validUser){
            return next (console.log("not found"))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(console.log("wrong password"));
        }
        const {password:hashedPassword,...rest} = validUser._doc;
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const age = new Date(Date.now()+3600000);
        res.cookie('access token',token,{httpOnly:true,expires:age})
        .status(200).json(rest)

    }catch(e){
        next(e);
    }
})
consumerroute.post("/add-to-cart",async(req,res,next)=>{
    const {userId,productId} = req.body;
    try{
        const consumer = await ConsumerSchema.findById(userId);
        if(!consumer){
            return res.status(404).json({error:"User not found"});
        }
        // add productId to user's cart
        consumer.cart.push(productId);
        await consumer.save();
        res.json({message:"Product added to cart successfully"})
    }catch(error){
        next(error)
        res.status(500).json({error:"Server error"})
    }
})
consumerroute.get("/get-cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const consumer = await ConsumerSchema.findById(userId).populate('cart');
        if (!consumer) {
            return res.status(404).json({ error: "User not found" });
        }
        // Extract cart items with additional product details
        const cartItems = consumer.cart.map(product => ({
            _id: product._id,
            name: product.productName,
            quantity:product. quantityAvailable,
            price: product.price,
            // Add more fields as needed
        }));
        res.json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

consumerroute.post("/remove-from-cart",async (req,res)=>{
    const {userId,productId} = req.body;
    try{
        const consumer = await ConsumerSchema.findById(userId);
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
        const consumer = await ConsumerSchema.findById(userId);
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