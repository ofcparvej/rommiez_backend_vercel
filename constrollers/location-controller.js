const Location = require('../models/location-model')
require("dotenv").config();
const jwt=require("jsonwebtoken");
const User = require('../models/User')
const LocationDetails = require("../models/location-details-model")
const ImageUrl = require('../models/image-url-model');
const College = require('../models/college-model')

exports.addLocation  = async (req,res) => {



    const {locationAddress , houseOwnerName , contactNumber , collegeCode , token11 , expectedRent , description , foundDistance , lat , lng , contributorEmailId} = req.body;
    const token1 = token11;
    const secret_key = process.env.JWT_SECRET;

    let userEmail;
    let userId;


    try {

        const decoded = jwt.verify(token1, secret_key  ); // Replace with your actual secret key
        userEmail = decoded.email;
        userId = decoded.id;
        const distance = foundDistance;

        const location = await Location.create({
            locationAddress,
            houseOwnerName,
            contactNumber,
            collegeCode,
            expectedRent,
            description,
            distance,
            lat,
            lng,
            contributorEmailId
        })

        // console.log("INTSIDE ADD LOCATION ----------------->")
        // locations[locationId] -> done
        const found_user = await User.findByIdAndUpdate({ _id:userId } , {
            "$push":{
                locations:location._id,
            } 
        },
            {new:true}
        )

        const found_user2 = await College.findOneAndUpdate({ collegeCode:collegeCode } , {
            "$push":{
                locations:location._id,
            } 
        },
            {new:true}
        )

        //..................................... stringId = objectId.toString();

        let locId = location._id.toString();

        const payload2 = {
            currentLocationId:locId
        }

        const token2 = jwt.sign(payload2 , process.env.JWT_SECRET , {
            expiresIn:"2h",
        });

      const options = {
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }

      res.cookie("token2" , token2 , options).status(200).json({
        success:true,
        message:"Location  Created  succesfully",
        token2:token2,
      })

      } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid token 2' , error:err  });
      }


}


exports.addLocationDetails  = async (req,res) => {

    const { token22 } = req.body;
    const secret_key = process.env.JWT_SECRET;
    const token2 = token22;

    try {

        const decoded = jwt.verify(token2, secret_key  ); // Replace with your actual secret key
        // console.log("decoded - > ", decoded);
        currLocationId = decoded.currentLocationId;
        let locationId = currLocationId;

        // console.log("DEcoded Id------------------------------------------------------------->"  ,locationId );

        const locationDetails = await LocationDetails.create({
            locationId,
        })

        const  location_details = await Location.findByIdAndUpdate({ _id:currLocationId } , {
            "$push":{
                locationDetails:locationDetails._id,
            } 
        },
            {new:true}
        );

        res.status(200).json({message:true});

     } catch (err) {

       console.log(err);
       return res.status(403).json({ message: 'Invalid token' , error:err });

     }
}

//.......................................................................................

exports.getLocationIds  = async (req,res) => {

        const collegeId = req.query.collegeCode;

        try {

            const collegeLocation = await College.findOne({collegeCode:collegeId});
            const locationsId  = collegeLocation.locations;
            res.status(200).json({ locationsId});

        } catch(error){

            res.status(400).json({error:error});

        }
  


}



exports.getLocationDetailsById  = async (req,res) => {

    const lctnId = req.params.locationId;

    try {

        const Location_details = await Location.findOne({_id:lctnId});
        res.status(200).json({Location_details });

    } catch(error){  
        res.status(400).json({error:error});

    }

}


exports.getLocationImages  = async (req,res) => {


    const currLocId =  req.query.currLocationid;
    let imgUrls ;
    let URLS = [];
    let urlsArr = [];

    // console.log("INSIDE img controller ------>")


    try {

        const foundLoc = await Location.find({_id:currLocId})
        const foundData = await LocationDetails.find({locationId:currLocId})

        imgUrls = foundData[0].imageUrls;

        imgUrls.forEach(it =>{
            console.log((it.toString()));
            URLS.push(it.toString());

        } )

        const img_url =  await ImageUrl.find({_id:URLS[0]});
        urlsArr.push(img_url[0].url);

        const img_urll =  await ImageUrl.find({_id:URLS[1]});
        urlsArr.push(img_urll[0].url);
        

        res.status(200).json({message:"this is LOCimgs", currLocId , urlsArr  , foundLoc });

    } catch(error){

        res.status(400).json({error:error});

    }
}


exports.updateStatus  = async (req,res) => {

    // console.log("Update status Controller => " , req.body);
    const currLocationId = req.body.locId
    const isAvail = req.body.isChecked

    try {

        const  foundLoc = await Location.findByIdAndUpdate({ _id:currLocationId } , {
            isAvailable: isAvail == false?true:false
        },
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:"successfull",
            foundLoc

        })

    } catch(error){
        res.status(400).json({error:error});

    }

}

exports.getAllDetails  = async (req,res) => {

    // console.log("Get All Controller =>" , req.query.collegeCode);
    let clgCode= req.query.collegeCode

    try {

        const Locations = await Location.find({collegeCode:clgCode})
        res.status(200).json({
            success:true,
            Locations,
            message:"successfull"
        })


    } catch(error){
        res.status(400).json({error:error});

    }



}



exports.getStatus  = async (req,res) => {

    // console.log("Update status Controller => " , req.body);
    const currLocationId = req.body.locId
    let foundStatus = false;

    try {

        const  foundLoc = await Location.findByIdAndUpdate({ _id:currLocationId });
        // console.log("FoundLoc => -> " , foundLoc)
 
        res.status(200).json({
            success:true,
            message:"successfull",
            foundLoc
        })

    } catch(error){
        res.status(400).json({error:error});

    }
}




exports.removeLocation  = async (req,res) => {

        // console.log("REMOVE LOCATION CONTROLLER --------------" , req.body.locId)
        let locId = req.body.locId;
        let clgCode = '1002'


       try {
        const result = await College.updateOne(
            { collegeCode: clgCode },  // Find the College by its ObjectId
            { $pull: { locations: locId } }  // Pull the locationId from the locations array
        );

        const result2 = await Location.findByIdAndDelete(
            {_id: locId}
        );
        
        res.status(200).json({
            success:true,
            result,
            message:"college updated ..."
        })
   
        } catch (err) {
          console.log(err);
          return res.status(403).json({ message: 'Error in College' , error:err });
        }
}

