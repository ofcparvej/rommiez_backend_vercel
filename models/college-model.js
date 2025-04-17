const mongoose = require ("mongoose");

const collegeSchema = new mongoose.Schema({

    collegeName:{
        type:String,
        required:true,
    },
    collegeCode:{        // college can found based on this
        type:String,
        required:true,
    },
    collegeEmail: {
        type: String,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    locations:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Location",
        }
    ],
    collegeImgUrl:{
        type:String,
    }

})

module.exports = mongoose.model("College",collegeSchema);