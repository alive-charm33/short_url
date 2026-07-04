const express=require ('express');
const {connectToMongoDB}=require("./connect");
const urlRoute=require('./routes/url');
const URL = require("./models/url");
const app=express();
const PORT=8001;
connectToMongoDB('mongodb://localhost:27017/short_url').then(()=>
console.log('mongoDB connected'))
//templeting engine ejs for server side rendering
app.set('view engine','ejs');
app.use(express.json());
app.post("/test", (req, res) => {
    console.log("POST /test");
    res.json({ message: "Working" });
});
app.use("/url",urlRoute);
app.get("/:shortId", async (req, res) => {
    try {
        const { shortId } = req.params;

        console.log("Short ID:", shortId);

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

        console.log("Updated Entry:", entry);

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(PORT,()=>console.log('Server started at PORT'));