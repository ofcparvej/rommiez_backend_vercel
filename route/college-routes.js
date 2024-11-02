const express = require("express");
const router = express.Router();

const { addCollege } = require("../constrollers/college-controller");

//......................Authentication routes..............
// router.post("/",addLocation);
router.post("/college",addCollege);

// router.post("/signup",signUp);

// router.post("/sendotp",sendOtp);

//....................


module.exports = router;  