import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetProductIdQuery, useDeleteProductMutation } from '../redux/slice/ProductSlice';

function SingleProduct() {
    const [deleteProduct] = useDeleteProductMutation();
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading, refetch } = useGetProductIdQuery(productId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No product found</div>;

    const { brand, category, color, description, photo, price, productName, quantityAvailable, size, _id } = data.product;

    const handleDeleteProduct = (productId) => {
        deleteProduct(productId)
            .unwrap()
            .then(() => {
                console.log('Product deleted successfully');
                navigate("/products");
                refetch();
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

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
            <img src={photo} alt={productName} />
            <Link to={`/products/${_id}/updateproduct`}>
                <button>Update</button>
            </Link>
            <button onClick={() => handleDeleteProduct(_id)}>Delete</button>
        </div>
    );
}

export default SingleProduct;
