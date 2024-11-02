const Review = require('../models/review-model')
const jwt=require("jsonwebtoken");
const Location = require('../models/location-model')


exports.addReview  = async (req,res) => {

    console.log("Inside Review controller ----");

    const {studentName , review , contactNumber} = req.body;

    const owner = {studentName , review , contactNumber};

    console.log(owner);




    // const secret_key = process.env.JWT_SECRET;

    let userEmail;
    let userId;
    let locId;

    const secret_key = process.env.JWT_SECRET;
    const Coki = req.headers.cookie;

    // token for user

     const t1 = Coki.split(";")[0];
     const token1 = t1.split("=")[1];



    // token for location
     const t2 = Coki.split(";")[1];
     const token2 = t2.split("=")[1];


   




    try {
       const decoded = jwt.verify(token1, secret_key  ); // Replace with your actual secret key
       console.log("decoded - > ", decoded);

       userEmail = decoded.email;
       userId = decoded.id;


       //........................

       const decoded_loc = jwt.verify(token2, secret_key  ); // Replace with your actual secret key
       console.log("decoded_loc - > ", decoded_loc);

       
       locId = decoded.id;

       // req.user = decoded; // Attach the decoded payload to the request object
       // next();

       const user_review = await Review.create({
          studentName ,
          contactNumber,
          review
       })



       const new_review = await Location.findByIdAndUpdate({ _id:locId } , {
        "$push":{
            Reviews:user_review._id,
        } 
    },
        {new:true}
    )


    res.status(200).json({
        success:true,
        user_review,
        message:"added Reviews Api successfully"

    })






        



      


     } catch (err) {
       console.log(err);
       return res.status(403).json({ message: 'Invalid token 2' , error:err });
     }


}


