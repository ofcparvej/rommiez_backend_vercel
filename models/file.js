//name emal tag 

const mongoose = require("mongoose");
const nodemailer = require ("nodemailer") ;
require("dotenv").config();

const fileSchema = new mongoose.Schema ({
   // name:{
   //  type:String,
   //  required:true,
   // },

   imageUrl:{
    type:String,
    
   },

   // tags:{
   //  type:String,
   // },

   // email:{
   //  type:String,

   // },
   // videoUrl:{
   //    type:String,
   // }


});

// post miidleware
// fileSchema.post ("save" , async function (doc){
 
//      try {
           
//       console.log("doc::" , doc);    // doc in info of cereated entry..
//       //transporter.......
//       let transporter = nodemailer.createTransport ({
//          host:process.env.MAIL_HOST,
//          auth:{
//               user:process.env.MAIL_USER,
//               pass:process.env.MAIL_PASS,
//          },
//       })

//       // mail send..
//       let info = await transporter.sendMail({
//          from:`From Mparop`,
//          to:doc.email,
//          subject:"New file Uploaded in db bhai mail aya hai",
//          html:`<h1/> Mubara ho </h1>  <p/> LINK:: <a href="${doc.imageUrl}" /> ${doc.imageUrl} </a> </p>`,
//       })

//       console.log("info::" , info);


//      } catch (error) {
           
//          console.log(error);
//          res.status(400).json({
//               success:false,
//               message:"unable to send mail",
//          });
        

//      }


// })


//till now mail send karna agy hai mubarak ho bhai... agya.....MUBARAK HO............

const File = mongoose.model("File" , fileSchema);
module.exports = File;