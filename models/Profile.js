const mongoose = require ("mongoose");

const profileSchema = new mongoose.Schema({
    studentName:{
      type:String,
      required:true,
    },
    about:{
        type:String,
        trim:true,
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