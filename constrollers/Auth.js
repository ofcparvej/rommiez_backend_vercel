const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenarator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


//Sendotp

exports.sendOtp = async (req,res) => {


      try{

      const { email } = req.body;
      const checkUserPresent = await User.findOne({email});

      if( checkUserPresent ){
        return res.status(402).json({
            success:false,
            message:"already exist",
        })
      }

      var otp = otpGenarator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
      })

      const result = await OTP.findOne({otp:otp});

      while (result) {
        otp = otpGenarator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
          });
          const result = await OTP.findOne({otp:otp});
      }

      const otpPayload = {email,otp};
      const otpBody = await OTP.create(otpPayload);

       res.status(200).json({
        success:true,
        message:"otp send success",
        otp
      });


       }catch(error) {
           console.log("error on otp send");
           console.log(error);
             res.status(400).json({
            success:false,
            message:"error in sending otp"
           })
       }



}


//signUp

exports.signUp = async (req,res) => {

  console.log("nO ErroR");

    try {
    
        //data fetch..
        const {
            firstName,
            lastName,
            email,
            password,
            confirmedPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;


        
        if(!firstName && ! email && !password && !confirmedPassword && !otp){
          return res.status(404).json({
            success:false,
            message:"missing data",
          })
        }


        if(password != confirmedPassword ) {
            return res.status(400).json({
                success:false,
                message:"password invalid not matched",
            })
        }


        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"already exists user",
            })
        }


        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        if(!recentOtp) {  
            console.log("otp len 0");
               res.status(400).json({
                success:false,
                message:"not founnd otp",
            })
        }else if( otp !== recentOtp.otp){
          console.log("otp::",otp);
          console.log("recentOtp", recentOtp.otp);
             res.status(400).json({
                success:false,
                message:"invalid otp",
            })
        }
    

        const hashedPassword = await bcrypt.hash(password , 10);

         const ProfileDetails =  await Profile.create({
            about:null,
            contactNumber:null
         })

        const user1 = await User.create({   
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:"Admin",
            additionalDetails:ProfileDetails._id,
           
        });


        console.log("user->" , user1);


      res
      .status(200)
      .json({
        message:"User created successfully...",
        user1,
      });



    }catch (error) {

         console.log(error);
          res.status(400).json({
            success:false,
            message:"error in signing up msg",
         })

    }
}

//Login

exports.signIn = async (req,res) => {

  console.log("inside login ");

    try {    

     
      const {email , password} =req.body;

      //validate
      if(!email || !password ){
        return res.status(403).json({
            success:false,
            message:"all fiealds required",
        })
    }
      
    
      const user2 = await User.findOne({email:email});

      if(await bcrypt.compare(password , user2.password)){

        const payload = {
            email : user2.email,
            id:user2._id,
            accountType:user2.accountType,
            currentLocationId:""
        }

        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn:"2h",
        });

        user2.token = token;
        user2.password=undefined;

        //create cookie and send res

      const options = {
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }



      res.cookie("token" , token , options).status(200).json({
        success:true,
        message:"loggedIn succesfully",
        token,
      })



      } else {
        return res.status(400).json({
            success:false,
            message:"not matched in bcrypt",
        })
      }

     
    } catch (error) {

   console.log("error in login");
   console.log(error);
   res.status(401).json({
   success:false,
   message:"error in login",
   });

    }
    

}

//Change Passwaord hw.....
// exports.changePassword = async (req,res,next) => {
//     //fetch data
   
//     //get old pass , new pass ,consrirmPassword


//     //validation pass==0 or not matched


//     // update pass in db


//     //send mail - pass update


//     //return response...
// }