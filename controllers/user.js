// const User=require('../models/user')

// async function handleUserSignup(req,res){
//     const {name,email,password}=req.body;
//     await User.create({
//         name,email,password,
//     });
//     return res.render("home");
// }

// module.exports={
//     handleUserSignup,
// }
const User = require("../models/user");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send("User already exists. Please login.");
    }

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
};