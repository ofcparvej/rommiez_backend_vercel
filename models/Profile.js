const mongoose = require ("mongoose");

const profileSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    contactNumber:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model("Profile",profileSchema);