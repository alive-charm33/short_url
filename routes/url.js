const express = require("express");
const {handleGenerateNewShortURL}=require("../controllers/url");
const router = express.Router();
// POST /url
router.post("/", handleGenerateNewShortURL);
module.exports = router;