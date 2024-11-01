const Location = require('../models/location-model')
require("dotenv").config();
const jwt=require("jsonwebtoken");
const User = require('../models/User')
const LocationDetails = require("../models/location-details-model")

exports.addLocation  = async (req,res) => {

     const {locationAddress , houseOwnerName , contactNumber} = req.body;

     const owner = {locationAddress , houseOwnerName , contactNumber};

     console.log(owner);



     const Coki = req.headers.cookie;

    //  console.log("Coki => " ,Coki.split(";"));

     const t1 = Coki.split(";")[0];
    //  const t2 = Coki.split(";")[1];

     const token1 = t1.split("=")[1];
    //  const token2 = t2.split("=")[1];


     console.log("t1 => " , token1 )

     
    //  console.log("t2 => " , token2 )




    //  const headerToken =  Coki.split("=" , ";")[1];  // string ...



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

    const owner ={description , expectedRent };

    console.log(owner);



    const Coki = req.headers.cookie;
    const headerToken =  Coki.split("=")[1];  // string ...
    const secret_key = process.env.JWT_SECRET;

    let currLocationId;
    // let userId;

   


    try {
       const decoded = jwt.verify(token2, secret_key  ); // Replace with your actual secret key
       console.log("decoded - > ", decoded);

       currLocationId = decoded.currentLocationId;
       

       // req.user = decoded; // Attach the decoded payload to the request object
       // next();

       const locationDetails = await Location.create({
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






       


   res.status(200).json({message:true});



     } catch (err) {
       console.log(err);
       return res.status(403).json({ message: 'Invalid token' , error:err });
     }

     



   

 
   

}