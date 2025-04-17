const express = require("express");
const router = express.Router();

const { addCollege , getCollegeDetails , getColleges  , addCollegeLogo , getCollegeAddress } = require("../constrollers/college-controller");

//......................Authentication routes..............
// router.post("/",addLocation);
router.post("/college",addCollege);
router.get("/college",getCollegeDetails);
router.get("/colleges",getColleges);
router.post("/addlogo" , addCollegeLogo);
router.get("/getcollegeaddress" , getCollegeAddress);


// router.post("/signup",signUp);

// router.post("/sendotp",sendOtp);

//....................


module.exports = router;  