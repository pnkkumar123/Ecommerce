import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    quantityAvailable: { type: Number, required: true },
    images: [{ type: String }],
    attributes: {
        color: { type: String },
        size: { type: String }
    }
}, { timestamps: true });

const Products = mongoose.model("Products", ProductSchema);
export default Products;
