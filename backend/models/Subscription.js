import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

className:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

validTill:{
type:Date,
default: () => new Date(Date.now() + 30*24*60*60*1000) // 30 days
},

paymentId:{
type:String,
default:"manual"
}

},{timestamps:true});

export default mongoose.model("Subscription",subscriptionSchema);