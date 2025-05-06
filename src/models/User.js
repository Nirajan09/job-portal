const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true})

const User=mongoose.model("User",UserSchema)

export default User;