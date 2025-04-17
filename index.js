const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');
const userRoutes = require("./route/User");
const locationRoutes = require('./route/location-routes');


const cookieParser = require("cookie-parser");                                               //fronend ki request enterten karenga bakend me using cors
const {cloudinaryConnect} = require("./config/cloudinary");
cloudinaryConnect();


const fileUpload = require("express-fileupload");

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));  

      
// const dotenv = require("dotenv");

require('dotenv').config();
const PORT=process.env.PORT || 8000;   
require("./config/dataBase").connect();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


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
const College = require('./route/college-routes')


//routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1" , Upload);
app.use("/api/v1/loc" , locationRoutes);
app.use("/api/v1" , College);



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