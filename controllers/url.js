const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        console.log("Controller called");
        console.log(req.body);

        const body = req.body;

        if (!body.url) {
            console.log("URL missing");
            return res.status(400).json({ error: "url is required" });
        }

        const shortID = nanoid(8);

        console.log("Before DB");

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        console.log("After DB");

        return res.json({
            id: shortID,
        });
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}
module.exports = { handleGenerateNewShortURL, handleGetAnalytics };