const cloudinary = require("cloudinary").v2;
require("dotenv").config();


exports.cloudinaryConnect = () => {       
     
    try {
              //3 orguments........
              cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.API_KEY,
                api_secret:process.env.API_SECRET,
              });


    } catch(error) {

        console.log("cloudinary connect error");  
         console.log(error);
         

    }
}
