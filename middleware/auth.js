
// // auth , isStudent ,isAdmin..

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// //1) auth vala middleware.............authentication........................
// exports.auth =  ( req,res , next) => {
//           try {
//                  // extract token...fromheader,or body or cookie depend kaha inserrt kiya?? 
//                  const token = req.body.token || req.header.token || req.cookie.token ;
//                  // if no token .......
//                  if(!token) {
//                     return res.status(401).json({
//                         success:false,
//                         message:"Token missing",
//                     })
//                  }

//                  // verify the token 
//                  try {
//                          const payload =jwt.verify(token , process.env.JWT_SECRET);                      //token and secrete key passs karni padti .... 
//                           console.log(payload);
//                           req.user = payload;             // user me payload store liye taki protected route check kar sake depending on role...
//                                                          // so that user.role==student??? check kar payenge

//                  } catch (err) {

//                      return res.status(400).json({
//                         success:false,
//                         message:"token is encodded need to decode"
//                      });

//                  }

//                  next();




//           } catch(error) {
//                  return res.status(401).json({
//                     success:false,
//                     message:"error to  verify..",
//                  });
//           }
// }


// // isStudent vala middleware -> to check ky rol student hai..??? 
// //..................autherization.............................
// exports.isStudent = (req,res,next) =>  {
//      //..........
//      try {
            
//   if(req.user.role !== "Student"){
//     return res.status(401).json({
//         success:false,
//         message:"this is student section ur not allowed to enter",
//     });
//   }

//    next();

//      } catch(error) {

//           return res.status(500).json({
//             success:false,
//             message:"user role can not be verified",
//           });

//      }
// }
// // for admin.................
// exports.isAdmin = (req,res,next) => {
   
//     try {
            
//         if(req.user.role !== "Admin"){
//           return res.status(401).json({
//               success:false,
//               message:"this is Admin section ur not allowed to enter",
//           });
//         }
      
      
//            } catch(error) {
      
//                 return res.status(500).json({
//                   success:false,
//                   message:"user role can not be verified",
//                 });
      
//            }
// }