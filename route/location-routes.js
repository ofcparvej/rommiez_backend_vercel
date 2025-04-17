const express = require("express");
const router = express.Router();

const {addLocation , addLocationDetails , getLocationIds ,  getLocationDetailsById , getLocationImages , updateStatus  , getAllDetails , getStatus , removeLocation} = require("../constrollers/location-controller");

//......................Authentication routes..............
router.post("/",addLocation);
router.post("/details",addLocationDetails);
router.get("/ids",getLocationIds);
router.get("/details/:locationId",getLocationDetailsById);
router.get("/locimgs" , getLocationImages);
router.post("/updatestatus" , updateStatus);
router.get("/alldetails" , getAllDetails);
router.get("/getstatus" , getStatus);
router.post("/remove" , removeLocation)

module.exports = router;    