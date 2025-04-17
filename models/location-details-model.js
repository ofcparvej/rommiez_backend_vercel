const mongoose = require ("mongoose");

const locationDetailsSchema = new mongoose.Schema({
    
    imageUrls:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ImageUrl",
        }
    ],
    locationId:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]

    
    
});

module.exports = mongoose.model("LocationDetail",locationDetailsSchema);