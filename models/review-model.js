const mongoose = require ("mongoose");

const reviewSchema = new mongoose.Schema({
    
    studentName:{
        type:String,
        trim:true,
    },
    review:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model("Review",reviewSchema);