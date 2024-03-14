import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, Button, CircularProgress } from '@mui/material';
import { useGetProductIdQuery, useUpdateProductMutation } from '../redux/slice/ProductSlice';
import { Link, NavLink, useParams } from 'react-router-dom';

function UpdateProduct() {
    const { productId } = useParams();
    const { data } = useGetProductIdQuery(productId);

    // State to hold form data
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        quantityAvailable: '',
        color: '',
        size: '',
        photo: ''
    });

    // State to manage loading state
    const [uploading, setUploading] = useState(false);

    // Mutation hook to update product
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    // Populate form data with fetched product data
    useEffect(() => {
        if (data) {
            setFormData({
                productName: data.product.productName || '',
                description: data.product.description || '',
                price: data.product.price || '',
                category: data.product.category || '',
                brand: data.product.brand || '',
                quantityAvailable: data.product.quantityAvailable || '',
                color: data.product.color || '',
                size: data.product.size || '',
                photo: '' // Assuming photo is not editable in this form
            });
        }
    }, [data]);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
            const response = await updateProduct({ productId, formData });
            console.log(response);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="productName">Product Name</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="productName"
                        id="productName"
                        value={formData.productName}
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="description"
                        id="description"
                        value={formData.description}
                        label="Description"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="price"
                        id="price"
                        value={formData.price}
                        label="Price"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="category"
                        id="category"
                        value={formData.category}
                        label="Category"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="brand">Brand</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="brand"
                        id="brand"
                        value={formData.brand}
                        label="Brand"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="quantityAvailable">Quantity Available</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="quantityAvailable"
                        id="quantityAvailable"
                        value={formData.quantityAvailable}
                        label="Quantity Available"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="color">Color</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="color"
                        id="color"
                        value={formData.color}
                        label="Color"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="size">Size</InputLabel>
                    <TextField
                        onChange={handleChange}
                        name="size"
                        id="size"
                        value={formData.size}
                        label="Size"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="photo">Photo</InputLabel>
                    <input type="file" onChange={handleFileChange} />
                    {uploading && <CircularProgress size={24} />}
                </div>
                <Button type="submit" disabled={isLoading} variant="contained" color="primary">
                    {isLoading ? 'Updating...' : 'Update Product'}
                </Button>
             <NavLink to='/products'> <Button >Cancel</Button></NavLink>
            </form>
        </div>
    );
}

export default UpdateProduct;
