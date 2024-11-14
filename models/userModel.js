const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'Please provide a name']
    },
    email:{
        type:String,
        required : [true,'Email is required and should be unique'],
        unique:[true,'User already registered']
    },
    password:{
        type:String,
        required : [true,'Password is required']
    }
},
{timestamps:true}
)

//export
const userModel = mongoose.model('user',userSchema);
module.exports = userModel;