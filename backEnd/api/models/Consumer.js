import mongoose, { Schema, Types } from 'mongoose';

const Consumer = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userName:{type:String,required:true},
    cart:[{type:Schema.Types.ObjectId,ref:'Product'}],
    orders:[{type:Schema.Types.ObjectId,ref:'Order'}]
})

const ConsumerSchema = mongoose.model("Consumer",Consumer);
export default ConsumerSchema