const express = require('express');
const Seller = require('../models/Seller.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const route = express.Router();
dotenv.config()
route.post("/signup",async (req,res,next)=>{
    const {userName,email,name,password} = req.body;
     try {
      const existingUser = await Seller.findOne({$or:[{email},{userName}]});
      if(existingUser){
        return res.status(400).json({error:"User already exists"})
      }
    //   hashed password
    const hashedPassword = bcryptjs.hashSync(password,10)

        const seller = new Seller({
            name,
            userName,
            password:hashedPassword,
            email
        });

        const result = await seller.save();
        return res.status(201).json({seller:result,message:"User created Sucessfully"})
     } catch (error){
        console.log(error);
        return res.status(401).json({error:"Error occured while saving data"})
     }

})
route.post("/signin",async(req,res,next)=>{
  const {email,password} = req.body;
  try{
    const validUser = await Seller.findOne({email})
    if (!validUser) {
      return res.status(400).json({ error: "User not found" });
  }
  
  if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
  }
  const {password:hashedPassword,...rest} = validUser._doc;
  const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
  const age = new Date(Date.now()+3600000);
  res.cookie('access_token',token,{httpOnly:true,expires:age},
  
  ).status(200)
  .json(rest)
  }catch(e){
    next(e)
  }


});
route.post("/signout",(req,res,next)=>{
  try{
    res.clearCookie('access_token');
    res.status(201).json('User has been logged out')
  }catch(e){
    console.log(e);
  }
})

module.exports = route;