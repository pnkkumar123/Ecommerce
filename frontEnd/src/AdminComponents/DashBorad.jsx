import React from 'react'
import SideBar from './SideBar'
import {useSelector} from 'react-redux';
const DashBorad = () => {
  const {currentUser} = useSelector((state)=>state?.user)

  return (
    <div>
   <div>
   <p>Name : {currentUser.name}</p> 
   <p> Email : {currentUser.email}</p>
   </div>
   <div>
    <p>Products : {currentUser.products.length}</p>
   </div>



    </div>
  )
}

export default DashBorad