const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin" , "Student" ],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Profile",                          // need to update only in profile ka controller...
    },
    locations:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Location",
        }
    ],
    token:{
        type:String,
        expiresIn: '24h'
    },
    contactNumber:{
        type:String,
        required:true,
    }
    
})

module.exports = mongoose.model("User",userSchema);