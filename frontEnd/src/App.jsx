import {Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar';

import DashBorad from './AdminComponents/DashBorad';
import './App.css';
import UploadProducts from './AdminComponents/uploadProducts';
import Products from './AdminComponents/Products';
import SignUp from './AdminComponents/SignUp';
import SignIn from './AdminComponents/SignIn';
import SingleProduct from './AdminComponents/SingleProduct';
import UpdateProduct from './AdminComponents/UpdateProduct';
import PrivateSellerRoute from './Components/PrivateSellerRoute';
import SideBar from './Components/SideBar';

import {useSelector} from 'react-redux';
import styled from 'styled-components';

import ConsumerProducts from './ConsumerComponents/ConsumerProducts';
import ConsumerSignIn from './ConsumerComponents/ConsumerSignIn';
import PrivateConsumerRoute from './Components/PrivateConsumerRoute';
import ConsumerSignUp from './ConsumerComponents/ConsumerSignUp';

import Cart from './ConsumerComponents/Cart';
import Orders from './ConsumerComponents/Orders';
import ConsumerProfile from './ConsumerComponents/ConsumerProfile';

import Success from './ConsumerComponents/Success'
import Cancel from './ConsumerComponents/Cancel'
import SinglePage from './ConsumerComponents/SinglePage'




function App() {
  const {currentUser} = useSelector((state)=>state.user)
  const isSeller = useSelector((state)=>state.user.isSeller)
 
  return (
    <Wrapper>
      
   
  <div className='navbar'>
   <Navbar/>

  </div>

   <div className='routes'>
  {currentUser && isSeller  ? <SideBar/> : ""}

   <Routes>
  
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/consumersignup' element={<ConsumerSignUp/>}/>
        <Route path='/consumersignin' element={<ConsumerSignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      <Route path='/' element={<ConsumerProducts/>}/>
    
        <Route element={<PrivateConsumerRoute/>}>
          <Route path='/singlepage/:productId' element={<SinglePage/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/cancel' element={<Cancel/>}/>
          <Route path='/consumerprofile' element={<ConsumerProfile/>}/>
          <Route path='/order' element={<Orders/>}/>
          <Route path='/cart/:userId' element={<Cart/>}/>
         
        </Route>
     <Route path='/consumerproducts/:productId' element={<SingleProduct/>}/>
      <Route element={<PrivateSellerRoute/>}>
  
      <Route path='/dashboard' element={<DashBorad/>}/>
    
     <Route path='/uploadproducts/:id' element={<UploadProducts/>}/>
     <Route path='/products/:productId/updateproduct' element={<UpdateProduct/>}/>
     <Route path='/products/:id' element={<Products/>}/>
      </Route>
    </Routes>
   </div>

    </Wrapper>
  )
}
const Wrapper = styled.section`
margin:60px;
.navbar{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:1000
  
}
.routes{
 
  display:flex;
justify-content:center

align-items:center;
}

`
export default App
