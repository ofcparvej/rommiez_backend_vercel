const Location = require('../models/location-model')
const mongoose = require('mongoose')
require("dotenv").config();
const jwt=require("jsonwebtoken");
const User = require('../models/User')
const LocationDetails = require("../models/location-details-model")
const { ObjectId } = require('mongodb');
const {Types} = require('mongoose')
const ImageUrl = require('../models/image-url-model');
const College = require('../models/college-model')

exports.addLocation  = async (req,res) => {

     const {locationAddress , houseOwnerName , contactNumber , collegeCode} = req.body;

     const owner = {locationAddress , houseOwnerName , contactNumber , collegeCode};

     console.log(owner);



     const Coki = req.headers.cookie;

    //  console.log("Coki => " ,Coki.split(";"));

     const t1 = Coki.split(";")[0];
    //  const t2 = Coki.split(";")[1];

     const token1 = t1.split("=")[1];
    //  const token2 = t2.split("=")[1];


     console.log("t1 => " , token1 )


     const secret_key = process.env.JWT_SECRET;

     let userEmail;
     let userId;



     try {
        const decoded = jwt.verify(token1, secret_key  ); // Replace with your actual secret key
        console.log("decoded - > ", decoded);

        userEmail = decoded.email;
        userId = decoded.id;

        // req.user = decoded; // Attach the decoded payload to the request object
        // next();

        const location = await Location.create({
            locationAddress,
            houseOwnerName,
            contactNumber
        })

        // console.log("mail" , userEmail , userId)


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
        console.log("locId->" , locId);

        
        const payload2 = {
            currentLocationId:locId
        }

        const token2 = jwt.sign(payload2 , process.env.JWT_SECRET , {
            expiresIn:"2h",
        });

        console.log("token2 -> ",token2 )

    //     // user2.token = token;
    //     // user2.password=undefined;

    //     //create cookie and send res

      const options = {
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }



      res.cookie("token2" , token2 , options).status(200).json({
        success:true,
        message:"Location  Created  succesfully",
        token2,
      })




        //........................................



    // res.status(200).json({message:true});



      } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid token 2' , error:err });
      }


}




exports.addLocationDetails  = async (req,res) => {

    const {description , expectedRent } = req.body;

    const owner ={description , expectedRent }

    console.log("owner=>" , owner);
    const secret_key = process.env.JWT_SECRET;
    const Coki = req.headers.cookie;
    const t2 = Coki.split(";")[1];
    const token2 = t2.split("=")[1];




   
    try {
       const decoded = jwt.verify(token2, secret_key  ); // Replace with your actual secret key
       console.log("decoded - > ", decoded);

       currLocationId = decoded.currentLocationId;

       let locationId = currLocationId;



       const locationDetails = await LocationDetails.create({
           description,
           expectedRent,
           locationId,
           
       })


       const  location_details = await Location.findByIdAndUpdate({ _id:currLocationId } , {
           "$push":{
            locationDetails:locationDetails._id,
           } 
       },
           {new:true}
       );


    //    console.log("loc_des=>" , location_details);




    //    const  location_details2 = await Location.findByIdAndUpdate({ _id:currLocationId } , {
    //    " $push":{
         
    //       " locationDetails.$[].imageUrls": {url:"parvejurl"},
    //     } 
    // },
    //     {new:true}
    // );

    //*******************************INSERTING IMAGES TO LOCATIONDETAILS */

    const url = "parvejUrl"

    // create imageurl model .......

    const ImageUrlModel1 = await ImageUrl.create({
        url
    })










    const locaD = await LocationDetails.findOneAndUpdate({locationId:currLocationId} , {
        "$push":{
            imageUrls:ImageUrlModel1._id,
        }
    });
    console.log("lacD -> ",locaD);

    //................................................................................................



   res.status(200).json({message:true});



     } catch (err) {
       console.log(err);
       return res.status(403).json({ message: 'Invalid token' , error:err });
     }

     



   

 
   

}

