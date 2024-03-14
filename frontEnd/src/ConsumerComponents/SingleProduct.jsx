import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductIdQuery } from '../redux/slice/ProductSlice';

function SingleProduct() {
    const { productId } = useParams();
    const { data, error, isLoading } = useGetProductIdQuery(productId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No product found</div>;

    const { brand, category, color, description, photo, price, productName, quantityAvailable, size } = data.product;
console.log(data);
    return (
        <div>
            <h2>{productName}</h2>
            <p>Brand: {brand}</p>
            <p>Category: {category}</p>
            <p>Color: {color}</p>
            <p>Price: ${price}</p>
            <p>Description: {description}</p>
            <p>Quantity Available: {quantityAvailable}</p>
            <p>Size: {size}</p>
            <img src={photo} alt={productName} /> {/* Assuming photo is an array */}
        </div>
    );
}

export default SingleProduct;
