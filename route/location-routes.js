const express = require("express");
const router = express.Router();

const {addLocation} = require("../constrollers/location-controller");

//......................Authentication routes..............
router.post("/",addLocation);
router.post("/details",addLocation);

// router.post("/signup",signUp);

// router.post("/sendotp",sendOtp);

//....................


module.exports = router;  