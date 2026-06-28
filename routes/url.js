const express = require("express");
const router = express.Router();

const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
} = require("../controllers/url");

// POST /url
router.post("/", handleGenerateNewShortURL);

// GET /url/analytics/:shortId
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;