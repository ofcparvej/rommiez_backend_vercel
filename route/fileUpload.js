const express = require("express");
const router = express.Router();

const {localFileUpload , imageUpload , videoUpload ,imageSizeReduceUpload} = require("../constrollers/fileUplaod"); //rest videoUpload , imageReducerUpload , localFileUpload

router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/imageSizeReduceUpload" , imageSizeReduceUpload);

module.exports = router;
