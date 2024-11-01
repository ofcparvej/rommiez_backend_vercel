const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
      email:{
        type:String,
        required:true,
      },
      otp:{
        type:String,
         required:true,
      },
      createdAt:{
        type:Date,
        default:Date.now(),
        expires:30*60*1000,
      }
});

// function to send mail..
async function sendVerifivationEmail (email,otp) {
   try {

       const mailResponse = await mailSender(email, "verification email", otp);
       console.log("mailreSponse::",mailResponse);

   } catch(error) {
      console.log("error in sendVerification fn");
      console.log(error);
   }
 }

 //pre middleware...........
 otpSchema.pre("save" , async function (next) {
    await sendVerifivationEmail(this.email , this.otp);
    next();
 });




module.exports = mongoose.model("Otp" , otpSchema);