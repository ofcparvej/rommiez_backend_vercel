const mongoose = require ("mongoose");

const locationDetailsSchema = new mongoose.Schema({
    
    description:{
        type:String,
        required:true,
    },
    expectedRent:{
        type:String,
        required:true,
    },
    imageUrls:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ImageUrl",
        }
    ]
    
    
});

module.exports = mongoose.model("LocationDetail",locationDetailsSchema);