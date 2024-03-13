import express from 'express';
import Seller from '../models/Seller.js';
import bcryptjs from 'bcryptjs'


const route = express.Router();

route.post("/signup",async (req,res)=>{
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
export default route