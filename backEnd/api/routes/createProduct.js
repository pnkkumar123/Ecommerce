import express from 'express';
import Products from '../models/Product.js';

const route = express.Router();

route.post("/create", (req, res) => {
    const {
        productId,
        productName,
        description,
        price,
        category,
        brand,
        quantityAvailable,
        images,
        attributes
    } = req.body;

    if (!description || !productId || !productName || !price || !category || !brand || !quantityAvailable || !images || !attributes) {
        return res.status(400).json({ error: "Please provide all required fields." });
    }

    const product = new Products({
        productId,
        productName,
        description,
        price,
        category,
        brand,
        quantityAvailable,
        images,
        attributes
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

export default route;
