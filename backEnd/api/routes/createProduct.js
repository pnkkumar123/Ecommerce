import express from 'express';
import Products from '../models/Product.js';
import Seller from '../models/Seller.js';


const route = express.Router();



route.post("/create", async (req, res) => {
    const {
        userId,
        productName,
        description,
        price,
        category,
        brand,
        quantityAvailable,
        photo,
        color,
        size
    } = req.body;
    
    try {
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        
        // Check if the seller exists
        const seller = await Seller.findById(userId);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        
        // Create the product
        const product = new Products({
            productName,
            description,
            price,
            category,
            brand,
            quantityAvailable,
            photo,
            color,
            size
        });
        
        // Save the product
        const savedProduct = await product.save();
        
        // Add the product to the seller's list of products
        seller.products.push(savedProduct._id);
        await seller.save();
        
        return res.status(201).json({ product: savedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while saving the product." });
    }
});
// Get request to retrieve all products

route.get("/products",(req,res)=>{
    Products.find()
    .then(products=>{
        return res.status(200).json({products})
    })
    .catch(error=>{
        console.error(error);
        return res.status(500).json({error: "An error occured while retrieved"})
    })
})

route.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while retrieving the product" });
    }
});
route.delete("/products/:productId",(req,res)=>{
    const productId = req.params.productId;
    Products.findByIdAndDelete(productId)
    .then(()=>{
        res.status(204).send();
    })
    .catch(error=>{
        console.error(error);
    })
})
route.put("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    const updatedData = req.body; 

    Products.findByIdAndUpdate(productId, updatedData, { new: true }) // Pass updated data to update the product
    .then((updatedProduct) => {
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" }); // Handle case where product with given ID is not found
        }
        res.status(200).json(updatedProduct); // Send back the updated product
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});


export default route;
