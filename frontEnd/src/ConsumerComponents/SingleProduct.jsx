// import React from 'react';
// import { useParams,useNavigate,Link } from 'react-router-dom';
// import { useGetProductIdQuery } from '../redux/slice/ProductSlice';
// import styled from 'styled-components'
// import {Button} from '@mui/material'

// function SingleProduct() {
//     const { productId } = useParams();
//     const navigate = useNavigate()
//     const { data, error, isLoading } = useGetProductIdQuery(productId);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//     if (!data) return <div>No product found</div>;

//     const { brand, category, color, description, photo, price, productName, quantityAvailable, size,_id } = data.product;
// console.log(data);
//     return (
//         <Wrapper>
//             <div className="image">
//             <img src={photo} alt={productName} />
//             </div>
//             <div className="product-data">
//             <h2>{productName}</h2>
//             <p>Brand: {brand}</p>
//             <p>Category: {category}</p>
//             <p>Color: {color}</p>
//             <p>Price: ${price}</p>
//             <p>Quantity Available: {quantityAvailable}</p>
//             <p>Size: {size}</p>
//             <p>Description: {description}</p>
            
//             </div>
//               <Button variant='contained' color='primary'>
//               <Link to={`/products/${_id}/updateproduct`}>      Update
//               </Link> </Button>
//              {/* Assuming photo is an array */}
//         </Wrapper>
//     );
// }
// const Wrapper = styled.section`
// align-items:center;
// justify-items:center;
// display:flex;
// margin-right:30vh;

// .image{
//     border:1px solid black
    
// }
// .image img{
//     height:400px;
//     width:250px;
    
// }
// .product-data{
//     margin-left:10vh;
// }

// `
// export default SingleProduct;
