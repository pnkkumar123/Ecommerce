import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createProduct from './routes/createProduct.js'
import route from './routes/Auth.js'
import cors from 'cors';
import consumerroute from './routes/Consumer.js'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
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

if (process.env.NODE_ENV === "production") {
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




