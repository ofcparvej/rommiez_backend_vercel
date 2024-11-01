const mongoose = require ("mongoose");

const  imageUrlSchema = new mongoose.Schema({
    
    url:{
        type:String,
        required:true,
    }
    
    
});

module.exports = mongoose.model("ImageUrl",imageUrlSchema);