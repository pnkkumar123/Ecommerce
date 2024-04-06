const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createProduct = require('./routes/createProduct.js');
const route = require('./routes/Auth.js');
const cors = require('cors');
const consumerroute = require('./routes/Consumer.js');
const path = require('path');


dotenv.config()

mongoose.connect('mongodb+srv://pankajkanwar420:28xNaDFcmcazfe0w@cluster0.zh2vdd9.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongodb")})
.catch((error)=>{
    console.log(error);
})


const app = express();
app.use(cors())
app.use(express.json())
app.listen("5000",()=>{
  console.log("port listed");
})
app.use("/createProduct",createProduct)
app.use("/seller",route)
app.use("/consumer",consumerroute)
app.get("/consumer/getkey",(req,res)=>
res.status(200).json({key:process.env.RAZORPAY_API_KEY})
)
// deployment
const __dirname1 = path.resolve();

if (production === "production") {
  app.use(express.static(path.join(__dirname1, "/frontEnd/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontEnd", "dist", "index.html"))
  );


} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// deployment

app.get('/api/env', (req, res) => {
  const envVariables = {
      RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
      RAZORPAY_API_SECRET_KEY: process.env.RAZORPAY_API_SECRET_KEY,
      JWT_SECRET: process.env.JWT_SECRET,
      MONGODB_URI: process.env.MONGODB_URI
      // Add more variables as needed
    };
    
    // Return environment variables as JSON
    res.json(envVariables);
  });




