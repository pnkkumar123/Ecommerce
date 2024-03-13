import React, { useEffect } from 'react';
import { useGetProductQuery } from '../redux/slice/ProductSlice';

function Products() {
    const { data, isFetching, error } = useGetProductQuery();

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    if (!data || !data.products) {
        return <div>No products available</div>;
    }

    return (
        <div>
            <h3>Products</h3>
            {data.products.map((product) => {
                const {productName,photo} = product
                return (
                    <div key={product._id}>
                    <h4>{productName}</h4>
                    <img src={photo?photo :"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" } alt="" />
                </div>
                )
               
            })}
        </div>
    );
}

export default Products;
