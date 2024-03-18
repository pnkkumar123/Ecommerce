import express from 'express'
import ConsumerSchema from '../models/Consumer.js'
import bcryptjs from 'bcryptjs'

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
export default consumerroute