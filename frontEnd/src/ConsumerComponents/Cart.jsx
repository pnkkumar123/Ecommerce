import {useSelector} from 'react-redux'
import styled,{keyframes} from 'styled-components';
import { useGetCartQuery } from '../redux/slice/ProductSlice';

function Cart() {
 const id = useSelector((state)=>state?.user?.currentUser?.user?._id)
  const { data, isFetching, error } = useGetCartQuery(id);
console.log(data?.cart?.items);
  if (isFetching) return <LoadingSpinner/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CartContainer>
     {data?.cart?.items && data?.cart?.items.map((item)=>{
      const {productName,price,photo,_id} = item
      return(
        <CartItem key={_id}>
          <ProductImage src={photo} alt="" />
          <div>
          <p>{productName}</p>
          <p>Price:${price}</p>
          </div>

        </CartItem>
      )
     })}
    </CartContainer>
  );
}
const loadingAnimation = keyframes`
0%{
  transform:rotate(0deg);
}
100%{
  transform:rotate(360deg);
}
`;
const CartContainer = styled.div`
max-width:600px;
margin:auto;'

`
const CartItem = styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`
const ProductImage = styled.img`
width:100px;
height:100px;
object-fit:cover;
margin-right:20px;
`
const LoadingSpinner = styled.div`
border:4px solid #f3f3f3;
border-top:4px solid #3498db;
border-radius:50%;
width:30px;
height:30px;
animation:${loadingAnimation} 1s linear infinite;
margin:auto;
`
export default Cart;

