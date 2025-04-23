const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const ImageUrl = require("../models/image-url-model")
const LocationDetails = require('../models/location-details-model')
const jwt = require('jsonwebtoken')
require('dotenv').config();


//........IMAGE UPLOAD.............
exports.imageUpload = async (req,res) => {

      const {image} = req.body;

      try {

            const uploadedImage = await cloudinary.uploader.upload(image,
                  {
                        allowed_formats:['png' , 'jpg' , 'jpeg' , 'svg' , 'ico' , 'jfif' , 'webp']
                  },
            )
                  res.status(200).json(uploadedImage)
            } 

            catch(err){

                  console.log(err);
            }

}



exports.addInDb = async (req,res) => {

      console.log("INSIDE ADD IMG URL IN DB------------------------------------------------------------------------------------------>");


      const  found_url = req.body.url;
      const t2 = req.body.t2;


      try {
        
            const fileData = await File.create ({
                  imageUrl:found_url,
            });

            const secret_key = process.env.JWT_SECRET;
            const token2 = t2;

            const decoded = jwt.verify(token2, secret_key  ); // Replace with your actual secret key

            let currLocationId = decoded.currentLocationId;
            const url = found_url;

            const ImageUrlModel1 = await ImageUrl.create({
                  url
            })

            const locaD = await LocationDetails.findOneAndUpdate({locationId:currLocationId} , {
                  "$push":{
                        imageUrls:ImageUrlModel1._id,
                  }
            });

            res.json({
                  success:true,
                  message:"Image successfully added in database",
            })

      }catch(error) {

             console.log(error);
       
      }
}



