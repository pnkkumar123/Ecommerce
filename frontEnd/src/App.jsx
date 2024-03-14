import {Routes,Route} from 'react-router-dom'
import Navbar from './AdminComponents/Navbar'
import DashBorad from './AdminComponents/DashBorad'

import UploadProducts from './AdminComponents/uploadProducts'
import Products from './ConsumerComponents/Products'
import SignUp from './AdminComponents/SignUp'
import SignIn from './AdminComponents/SignIn'
import SingleProduct from './ConsumerComponents/SingleProduct'

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      <Route path='/dashboard' element={<DashBorad/>}/>
     <Route path='/uploadproducts' element={<UploadProducts/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/products/:productId' element={<SingleProduct/>}/>
    </Routes>
    </>
  )
}

export default App
