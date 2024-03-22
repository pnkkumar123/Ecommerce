import React from 'react'
import { useGetProductQuery } from '../redux/slice/ProductSlice'
import {Grid,Card,CardMedia,CardContent,Typography,Button,Chip} from '@mui/material'
import { Link } from 'react-router-dom';
import Filters from './Filters';
import { selectedCategoryFilter, setCategoryFilter } from '../redux/slice/FilterSlice';
import {useSelector,useDispatch} from 'react-redux'
import { addToCart } from '../redux/slice/CartSlice';

function ConsumerProducts() {
  const currentUser = useSelector((state)=>state.user);
  const selectedCategory = useSelector(selectedCategoryFilter);
  const dispatch = useDispatch()
  const {data,isFetching,error} = useGetProductQuery();
  
const handleAddToCart = async(productId)=>{
  try{
    dispatch(addToCart(productId));
    const response = await fetch("http://localhost:5000/consumer/add-to-cart",{
      method:"POST",
      headers:{
        "Content-Type" : 'application/json',
      },
      body:JSON.stringify({userId:currentUser.id,productId}),
    });
    if(response.ok){
      console.log("product added to cart");
    }else{
      console.log('failed to add products to cart');
    }

  }catch(e){
    console.log(e);
  }
  
};


  if(isFetching)return <p>Loading...</p>;
  if(error) return <p>error..</p>
  if(!data || !data.products || data.products.length === 0  )return <p>""</p>
  // extract unique categories from products
  const categories = Array.from(new Set(data.products.map(product=>product.category)));
  // filter products based on selected category
  const filteredProducts = selectedCategory ? data.products.filter(product=>product.category === selectedCategory) : data.products;
 const handleClearFilter = ()=>{
  dispatch(setCategoryFilter(null))
 }
  return (
    <div className='products'>
      <div className='filters'>
        <Filters categories={categories}/>
        {selectedCategory &&
        <button onClick={handleClearFilter}>Clear filters</button>
        }
      </div>
    <div className='products'>
    <h1>Products</h1>
    <Grid container spacing={2} alignItems="stretch">
      {filteredProducts.map((product) => {
        const {_id, photo, description, productName, price, category, brand, quantityAvailable, color, size} = product;
      console.log(_id);
        return (
          <Grid item xs={12} sm={6} md={3} key={_id}>
            <Link to={`/add-to-cart`} style={{textDecoration:'none'}}>
              <Card>
              <CardMedia
              component="img"
              height="200"
              image={photo ? photo : "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?w=740&t=st=1710335455~exp=1710336055~hmac=856ef2a2e754625212837ec6499c88f1a50e2bad53016ba349817b5fa34f1af5"}
             alt={productName}
             />
                <CardContent>
                  <Typography variant='h6' component="div" >
                    {productName}
                  </Typography>
                  <Typography variant='subtitle1' color="text.secondary">
                    Price:${price}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Description : {description ? (description.length > 90 ? `${description.slice(0,50)}...` : description):'No description available'}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Category:{category}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Brand:{brand}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Quantity Available: {quantityAvailable}
                  </Typography>
                   

                   <Button variant='contained' color='primary' onClick={()=>handleAddToCart(_id)}>Add to Cart</Button>


                </CardContent>
                  
              
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
    </div>
  </div>
  
  )
}



export default ConsumerProducts