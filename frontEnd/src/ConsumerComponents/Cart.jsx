import {useSelector} from 'react-redux'
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useGetCartQuery } from '../redux/slice/ProductSlice';

function Cart() {
 const id = useSelector((state)=>state?.user?.currentUser?.user?._id)
  const { data, isFetching, error } = useGetCartQuery(id);
console.log(data?.cart?.items);
  if (isFetching) return <div>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
     {data?.cart?.items && data?.cart?.items.map((item)=>{
      const {productName,price,photo,_id} = item
      return(
        <div key={_id}>
          <p>{productName}</p>
          <img src={photo} alt="" />

        </div>
      )
     })}
    </div>
  );
}

export default Cart;

