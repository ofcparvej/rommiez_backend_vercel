const express = require("express");
const router = express.Router();

const { imageUpload ,  addInDb} = require("../constrollers/fileUplaod"); //rest videoUpload , imageReducerUpload , localFileUpload

// router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
// router.post("/videoUpload" , videoUpload);
// router.post("/imageSizeReduceUpload" , imageSizeReduceUpload);
router.post("/imagetodb" , addInDb);

module.exports = router;
