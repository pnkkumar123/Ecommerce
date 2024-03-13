import express from 'express';
import Seller from '../models/Seller';
import bcryptjs from 'bcryptjs'


const route = express.Router();

route.post("/signup",(req,res)=>{
    const {userName,email,name,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)

    const seller = new Seller({
        name,
        userName,
        password:hashedPassword,
        email
    })
    seller.save()
    .then(result=>{
        return res.status(201).json({seller:result,message:"user created sucessfully"})
    }).then(error=>{
        console.log(error);
        res.status(500).json({error:"error occured while saving data"})
    })

})