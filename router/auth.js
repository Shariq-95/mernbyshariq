const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User = require("../model/userSchema");


const cookieParser = require("cookie-parser");
router.use(cookieParser());

// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({error: "cant leave field empty"});
//     }

//     User.findOne({email:email})
//     .then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({error: "Email already exists"});
//         }

//         const user = new User({ name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message:"user registered successfully"});
//         }).catch((err) => res.status(500).json({error: "failed to register"}));
//     }).catch(err => { console.log(err); });

// });

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "cant leave field empty" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {

            const user = new User({ name, email, phone, work, password, cpassword });
            // password secure

            await user.save();

            res.status(201).json({ message: "user registered successfully" });

        }

    }
    catch {
        console.log(err);
    }

});

// login route
router.post('/signin', async (req, res) => {
    let token;
    // console.log(req.body);
    // res.json({message:"awesome"});
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please , fill the data" })
        }
        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {     
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials " });
            } else {
                res.json({ message: "user signed in successfully"});
            }
        } 
        else {
            res.status(400).json({ error: "invalid credentials " });
        }


    } catch (err) {
        console.log(err);
    }

});

// Abous us page
router.get('/about', authenticate, (req, res) => {
    console.log(`About world`)
    res.send(req.rootUser);
});

// get user data for contact and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Get data world`)
    res.send(req.rootUser);
});

// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const {name, email, phone, message} = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form")
            return res.json({error:"please fill the data"});
        }

        const userContact = await User.findOne({ _id:req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);

            res.status(201).json({message:"user contacted successfully"})

        }
    } catch(error) {
        console.log(error);
    }
});

// Logout page
router.get('/logout', authenticate, (req, res) => {
    console.log(`Logout world`);
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('user logout');
});

module.exports = router;