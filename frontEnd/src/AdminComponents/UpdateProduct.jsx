import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, Button, CircularProgress } from '@mui/material';
import { useGetProductIdQuery, useUpdateProductMutation } from '../redux/slice/ProductSlice';
import {  NavLink, useParams ,useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'


function UpdateProduct() {
    const userId = useSelector((state)=>state?.user?.currentUser?._id)
    const navigate = useNavigate()
    const { productId } = useParams();
    const { data,isFetching,error } = useGetProductIdQuery(productId);
    console.log(data)

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

    
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("")

   
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
                photo: data.product.photo
            });
        }
    }, [data]);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
     if (e.target.id !== 'photo') {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    };
  
    // Handle file input change
    const handleFileChange = (e) => {
        setUploading(true);
        // create a new FormData object
        const data = new FormData();
        data.append("file",e.target.files[0]);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","pankajcloud420")
        
        // perform file upload logic
        fetch("https://api.cloudinary.com/v1_1/pankajcloud420/image/upload",{
            method:"post",
            body:data
        })
        .then(response=>response.json())
        .then(data=>{
            const imageUrl = data.url;
            console.log(imageUrl);
            setFormData({ ...formData, photo: imageUrl});
            setUploading(false)

        })
        .catch(error=>{
            console.log(error);
            setUploading(false)
        })
    };
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
            const response = await updateProduct({ productId, formData,userId });
            console.log(response);
            setUploading(false);
            navigate(`/products/${userId}`)
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
                    <img src={formData.photo} alt="" />
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
