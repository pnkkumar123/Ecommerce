import React from 'react'
import SideBar from '../Components/SideBar'
import { useGetSellerProductQuery } from '../redux/slice/ProductSlice';
import {useSelector} from 'react-redux';
import styled from 'styled-components'
const DashBorad = () => {
  const {currentUser} = useSelector((state)=>state?.user)
  const id = useSelector((state)=>state?.user?.currentUser?._id)
  const {data,isFetching,error,refetch} = useGetSellerProductQuery(id)

  return (
    <dashboard>
   <div className='data'>
   <p style={{paddingRight:10,paddingLeft:10,paddingBottom:6,paddingTop:6,borderRadius:5,border:"1px solid black"}}>Name : {currentUser.name}</p> 
   <p style={{paddingRight:10,paddingLeft:10,paddingBottom:6,paddingTop:6,borderRadius:5,border:"1px solid black"}}> Email : {currentUser.email}</p>
   </div>
   <div>
    <p style={{paddingRight:10,paddingLeft:10,paddingBottom:6,paddingTop:6,borderRadius:5,border:"1px solid black"}}>Products : {data?.products.length}</p>
   </div>



    </dashboard>
  )
}
const dashboard = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-items:center;
margin:auto;
`

export default DashBorad