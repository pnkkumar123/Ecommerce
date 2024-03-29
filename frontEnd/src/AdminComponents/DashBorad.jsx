import React from 'react'
import SideBar from './SideBar'
import { useGetSellerProductQuery } from '../redux/slice/ProductSlice';
import {useSelector} from 'react-redux';
const DashBorad = () => {
  const {currentUser} = useSelector((state)=>state?.user)
  const id = useSelector((state)=>state?.user?.currentUser?._id)
  const {data,isFetching,error,refetch} = useGetSellerProductQuery(id)

  return (
    <div>
   <div>
   <p>Name : {currentUser.name}</p> 
   <p> Email : {currentUser.email}</p>
   </div>
   <div>
    <p>Products : {data?.products.length}</p>
   </div>



    </div>
  )
}

export default DashBorad