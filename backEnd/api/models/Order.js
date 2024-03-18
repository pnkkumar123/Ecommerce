import mongoose, { Schema } from 'mongoose'


const Order = new mongoose.Schema({
  consumer:{type:Schema.Types.ObjectId,ref:'Consumer'},
  products:[{type:Schema.Types.ObjectId,ref:'Product'}],
  totalAmount:{
    type:Number,
    required:true,
  },
  shippingAddress:{
    type:String,
    required:true,
  },
  paymentStatus:{
    type:String,
    enum:['Pending','Paid','Cancelled'],
    default:'Pending',
  },


},{timestamps:true})
const OrderSchema = mongoose.model("Order",Order)
export default OrderSchema;