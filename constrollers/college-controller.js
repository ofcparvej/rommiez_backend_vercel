const College = require('../models/college-model')
const jwt=require("jsonwebtoken");
const Location = require('../models/location-model')


exports.addCollege  = async (req,res) => {

    console.log("Inside College controller ----");

    const {
        collegeName,
        collegeCode,
        collegeEmail,
        address
        } = req.body;

    const owner = {
        collegeName,
        collegeCode,
        collegeEmail,
        address};

    console.log("College = >>>",owner);




    // const secret_key = process.env.JWT_SECRET;

    // let userEmail;
    // let userId;
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
    //    const decoded = jwt.verify(token1, secret_key  ); // Replace with your actual secret key
    //    console.log("decoded - > ", decoded);

    //    userEmail = decoded.email;
    //    userId = decoded.id;


       //........................

       const decoded_loc = jwt.verify(token2, secret_key  ); // Replace with your actual secret key
       console.log("decoded_loc - > ", decoded_loc);

       
       locId = decoded_loc.id;

       // req.user = decoded; // Attach the decoded payload to the request object
       // next();

       const new_college = await College.create({
        collegeName,
        collegeCode,
        collegeEmail,
        address
       })



    //    const new_created_college = await Location.findByIdAndUpdate({ _id:locId } , {
    //     "$push":{
    //         Reviews:user_review._id,
    //     } 
    // },
    //     {new:true}
    // )


    res.status(200).json({
        success:true,
        new_college,
        message:"college created successfully"

    })






        



      


     } catch (err) {
       console.log(err);
       return res.status(403).json({ message: 'Invalid token 2' , error:err });
     }


}



// exports.addLocationToCollege  = async (req,res) => {

//     console.log("Inside Review controller ----");

//     const {
//         collegeName,
//         collegeCode,
//         collegeEmail,
//         address
//         } = req.body;

//     // const owner = {
//     //     collegeName,
//     //     collegeCode,
//     //     collegeEmail,
//     //     address};

//     // console.log(owner);

//     const found_college = await College




//     // const secret_key = process.env.JWT_SECRET;

//     // let userEmail;
//     // let userId;
//     let locId;

//     const secret_key = process.env.JWT_SECRET;
//     const Coki = req.headers.cookie;

//     // token for user

//      const t1 = Coki.split(";")[0];
//      const token1 = t1.split("=")[1];



//     // token for location
//      const t2 = Coki.split(";")[1];
//      const token2 = t2.split("=")[1];


   




//     try {

//         // const found_college = await College.findOne
//         const found_college = await College.find




   



//     //    const new_created_college_location = await College.findByIdAndUpdate({ _id:locId } , {
//     //     "$push":{
//     //         Reviews:user_review._id,
//     //     } 
//     // },
//     //     {new:true}
//     // )


//     res.status(200).json({
//         success:true,
//         new_college,
//         message:"location added to college  successfully"

//     })






        



      


//      } catch (err) {
//        console.log(err);
//        return res.status(403).json({ message: 'Invalid token 2' , error:err });
//      }


// }