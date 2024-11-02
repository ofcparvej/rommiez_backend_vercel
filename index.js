const express = require("express");
const app = express();
// const router = require("express").Router();


const userRoutes = require("./route/User");
const locationRoutes = require('./route/location-routes');


const cookieParser = require("cookie-parser");
// const cors =  require("cors");                                                    //fronend ki request enterten karenga bakend me using cors
const {cloudinaryConnect} = require("./config/cloudinary");
cloudinaryConnect();
//  require("./config/cloudinary").connect();   

const fileUpload = require("express-fileupload");

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));

      


// const dotenv = require("dotenv");

require('dotenv').config();
const PORT=process.env.PORT || 8000;
require("./config/dataBase").connect();


app.use(express.json());
app.use(cookieParser());


// app.use(
//     cors({
//         origin:"http://localhost:3000",          // vvimp line- origine from frontend..
//         credentials:true,

//     })
// )

// app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp",
//     })
// )


const Upload = require("./route/fileUpload")
const Reviews = require('./route/review-routes')


//routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1" , Upload);
app.use("/api/v1/loc" , locationRoutes);
app.use("/api/v1" , Reviews);







app.get("/",(req,res)=>{

    return res.json({
        success:true,
        message:"your server is up and running..."
    })
})

//activate......
app.listen(PORT , () => {
    console.log(`app listening on port  ${PORT}`) ;
})