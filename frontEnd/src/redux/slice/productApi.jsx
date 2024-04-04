


import axios from 'axios';


export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:5000/consumer/products/${productId}`);
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data.message); // Handle errors appropriately
  }
};
