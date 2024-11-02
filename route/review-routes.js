const express = require("express");
const router = express.Router();

const { addReview } = require("../constrollers/review-controller");

//......................Authentication routes..............
// router.post("/",addLocation);
router.post("/review",addReview);

// router.post("/signup",signUp);

// router.post("/sendotp",sendOtp);

//....................


module.exports = router;  