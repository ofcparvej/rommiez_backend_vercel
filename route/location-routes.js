const express = require("express");
const router = express.Router();

const {addLocation , addLocationDetails} = require("../constrollers/location-controller");

//......................Authentication routes..............
router.post("/",addLocation);
router.post("/details",addLocationDetails);

// router.post("/signup",signUp);

// router.post("/sendotp",sendOtp);

//....................


module.exports = router;  