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
    description:{
        type:String,
        required:true,
    },
    expectedRent:{
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
    ],
    collegeCode:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
    },
    lat:{
        type:String,
    },
    lng:{
        type:String,
    },
    isAvailable:{
        type: Boolean,
        default:false
    },
    contributorEmailId:{
        type:String,


    }
    
    
    
});

module.exports = mongoose.model("Location",locationSchema);