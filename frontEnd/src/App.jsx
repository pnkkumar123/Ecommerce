import {Routes,Route} from 'react-router-dom'
import Navbar from './AdminComponents/Navbar'
import DashBorad from './AdminComponents/DashBorad'

import UploadProducts from './AdminComponents/uploadProducts'
import Products from './ConsumerComponents/Products'

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/dashboard' element={<DashBorad/>}/>
     <Route path='/uploadproducts' element={<UploadProducts/>}/>
     <Route path='/products' element={<Products/>}/>
    </Routes>
    </>
  )
}

export default App
