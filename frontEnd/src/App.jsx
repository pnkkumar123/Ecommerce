import {Routes,Route} from 'react-router-dom'
import Navbar from './AdminComponents/Navbar'
import DashBorad from './AdminComponents/DashBorad'

import UploadProducts from './AdminComponents/uploadProducts'
import Products from './ConsumerComponents/Products'
import SignUp from './AdminComponents/SignUp'
import SignIn from './AdminComponents/SignIn'
import SingleProduct from './ConsumerComponents/SingleProduct'
import UpdateProduct from './AdminComponents/UpdateProduct'
import PrivateRoute from './Components/PrivateRoute'
import SideBar from './AdminComponents/SideBar'
import Profile from './AdminComponents/Profile'

import styled from 'styled-components'
import Home from './AdminComponents/Home'

function App() {
  

  return (
    <Wrapper>
  <div className='navabar'>
   <Navbar/>
  
  </div>

   <div className='routes'>
  <SideBar/>
   <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
  
      <Route path='/dashboard' element={<DashBorad/>}/>
      <Route path='/profile' element={<Profile/>}/>
     <Route path='/uploadproducts' element={<UploadProducts/>}/>
     <Route path='/products/:productId/updateproduct' element={<UpdateProduct/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/products/:productId' element={<SingleProduct/>}/>
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
