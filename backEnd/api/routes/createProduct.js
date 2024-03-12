import express from 'express';
import Products from '../models/Product.js';

const route = express.Router();

route.post("/create", (req, res) => {
    const {
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
    if (typeof photo !== 'string') {
        return res.status(400).json({ error: "Photo must be a string." });
    }


    if (!description  || !productName || !price || !photo|| !category || !brand || !quantityAvailable ||  !color || !size) {
        return res.status(400).json({ error: "Please provide all required fields." });
    }

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

    product.save()
        .then(result => {
            return res.status(201).json({ product: result });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: "An error occurred while saving the product." });
        });
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
export default route;
