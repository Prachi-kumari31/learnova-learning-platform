import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

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

subject:{
type:String
},

experience:{
type:Number
},

role:{
type:String,
default:"teacher"
}

},{
timestamps:true
});

export default mongoose.model("Teacher",teacherSchema);