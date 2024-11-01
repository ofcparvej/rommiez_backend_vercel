const mongoose = require ("mongoose");

const locationSchema = new mongoose.Schema({
    
    locationAddress:{
        type:String,
        required:true,
    },
    houseOwnerName:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    locationDetails:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"LocationDetail",
        }
    ],
    Reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ]
    
    
});

module.exports = mongoose.model("Location",locationSchema);