// productAPI.js

// Assuming you are using axios for making HTTP requests
import axios from 'axios';

// Function to fetch product data by ID from your backend API
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:5000/consumer/products/${productId}`);
    return response.data; // Assuming your API returns the product data
  } catch (error) {
    throw new Error(error.response.data.message); // Handle errors appropriately
  }
};
