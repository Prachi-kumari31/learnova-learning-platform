import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

fullName:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

mobile:{
type:String,
required:true
},

password:{
type:String,
required:true,
select:false
},

city:{
type:String
},

state:{
type:String
},

role:{
type:String,
default:"student"
}

},{
timestamps:true
});

export default mongoose.model("User",userSchema);