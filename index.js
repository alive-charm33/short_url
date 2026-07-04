const express = require("express");
const path = require("path");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short_url")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Templating Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home Route (Render all shortened URLs)
app.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});

        return res.render("home", {
            urls: allUrls,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});

// URL Routes
app.use("/url", urlRoute);

// Redirect Route
app.get("/:shortId", async (req, res) => {
    try {
        const { shortId } = req.params;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});