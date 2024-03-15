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

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/dashboard' element={<DashBorad/>}/>
     <Route path='/uploadproducts' element={<UploadProducts/>}/>
     <Route path='/products/:productId/updateproduct' element={<UpdateProduct/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/products/:productId' element={<SingleProduct/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
