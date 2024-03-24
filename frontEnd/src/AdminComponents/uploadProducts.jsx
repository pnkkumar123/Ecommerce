import React, { useState, useEffect } from "react";
import { TextField, InputLabel, Button, CircularProgress } from "@mui/material";
import {useNavigate} from 'react-router-dom'


function UploadProducts() {
    const navigate = useNavigate()
    const [url, setUrl] = useState("");
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: 0,
        category: '',
        photo: '', // Store the image URL here after uploading to Cloudinary
        brand: '',
        quantityAvailable: 0,
        color: '',
        size: ''
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false); // Add state for file uploading

    useEffect(() => {
        async function createProduct() {
            try {
                setLoading(true);
                setError(false);

                if (url) {
                    const res = await fetch('http://localhost:5000/createProduct/create', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...formData,
                            photo: url
                        })
                    });
                    const data = await res.json();
                    setLoading(false);
                    if (!data.success) {
                        setError(true);
                        return;
                    }
                }
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error(error);
            }
        }

        createProduct();
    }, [url]);

    const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUploading(true); 
        
        // Create a new FormData object
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "pankajcloud420");
    
        // Perform file upload logic
        fetch("https://api.cloudinary.com/v1_1/pankajcloud420/image/upload", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.url; // Get the uploaded image URL from the response
            console.log("Uploaded image URL:", imageUrl); // Log the URL to the console
            setUrl(imageUrl); // Set the uploaded image URL
            setFormData({ ...formData, photo: imageUrl }); // Update the formData object with the URL
            setUploading(false); // Set uploading state to false when file is uploaded
        })
        .catch(error => {
            console.error("Error uploading file: ", error);
            setUploading(false); // Set uploading state to false if there's an error
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!url){
                setError(true)
                return;
            }
            setLoading(true);
            setError(false);
            navigate('/products')

            console.log(formData);

            // Posting other form data to your backend
            const res = await fetch('http://localhost:5000/createProduct/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const response = await res.json();
            console.log(response);
            setLoading(false);
            if (!response.success) {
                setError(true);
                return;
            }
        } catch (error) {
            setLoading(false);
            setError(true);
            console.error(error);
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
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
                        placeholder=""
                        label="Size"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <InputLabel htmlFor="photo">Photo</InputLabel>
                    <input type="file" onChange={handleFileChange} />
                    {uploading && <CircularProgress size={24} />} {/* Show loading indicator if uploading */}
                </div>
                <Button type="submit" disabled={loading} variant="contained" color="primary">Add Product</Button>
            </form>
        </div>
    );
}

export default UploadProducts;

