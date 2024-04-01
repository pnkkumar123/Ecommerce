import {Routes,Route} from 'react-router-dom'
import Navbar from './AdminComponents/Navbar'
import DashBorad from './AdminComponents/DashBorad'
import './App.css'
import UploadProducts from './AdminComponents/uploadProducts'
import Products from './ConsumerComponents/Products'
import SignUp from './AdminComponents/SignUp'
import SignIn from './AdminComponents/SignIn'
import SingleProduct from './ConsumerComponents/SingleProduct'
import UpdateProduct from './AdminComponents/UpdateProduct'
import PrivateSellerRoute from './Components/PrivateSellerRoute'
import SideBar from './AdminComponents/SideBar'
import Profile from './AdminComponents/Profile'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import Home from './AdminComponents/Home'
import ConsumerProducts from './ConsumerComponents/ConsumerProducts'
import ConsumerSignIn from './ConsumerComponents/ConsumerSignIn'
import PrivateConsumerRoute from './Components/PrivateConsumerRoute'
import ConsumerSignUp from './ConsumerComponents/ConsumerSignUp'

import Cart from './ConsumerComponents/Cart'
import Orders from './ConsumerComponents/Orders'
import ConsumerProfile from './ConsumerComponents/ConsumerProfile'
import ConsumerSingleProduct from './ConsumerComponents/ConsumerSingleProduct'
import Success from './ConsumerComponents/Success'
import Cancel from './ConsumerComponents/Cancel'
import SinglePage from './ConsumerComponents/SinglePage'
import { GlobalStyle } from './Components/GlobalStyle'
import { ThemeProvider } from 'styled-components'



function App() {
  const {currentUser} = useSelector((state)=>state.user)
  const isSeller = useSelector((state)=>state.user.isSeller)
  const theme = {
    colors: {
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98,84,243,0.5)",
      hr: "#fff",
      gradient: "linear-gradient(0deg,rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow: 
      "rgba(0,0,0,0.02) 0px 1px 3px 0px,rgba(27,31,35,0.16)0px 0px 0px 1px",
      shadowSupport: "rgba(0,0,0,0.16)0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  }
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
      <GlobalStyle/>
  <div className='navabar'>
   <Navbar/>
  
  </div>

   <div className='routes'>
  {currentUser && isSeller  ? <SideBar/> : ""}

   <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/consumersignup' element={<ConsumerSignUp/>}/>
        <Route path='/consumersignin' element={<ConsumerSignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      <Route path='/consumerproducts' element={<ConsumerProducts/>}/>
      <Route path='/consumerproducts/:productId' element={<ConsumerSingleProduct/>}/>
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
      <Route path='/profile' element={<Profile/>}/>
     <Route path='/uploadproducts/:id' element={<UploadProducts/>}/>
     <Route path='/products/:productId/updateproduct' element={<UpdateProduct/>}/>
     <Route path='/products/:id' element={<Products/>}/>
      </Route>
    </Routes>
   </div>
      </ThemeProvider>
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
