const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// app.use(cookieparser());

// we link the router files to make our route easy
app.use(require('./router/auth'));

// 2nd step heroku
const PORT = process.env.PORT || 4114;


// Middleware
const middleware = (re, res, next) => {
    console.log(`Middleware world`);
    next();
}


// app.get('/', (req, res) => {
//     res.send(`Hello world`);
// });
// app.get('/about', middleware, (req, res) => {
//     console.log(`About world`)
//     res.send(`About page`);
// });
// app.get('/contact', (req, res) => {
//     res.send(`Contact page`);
// });
app.get('/login', (req, res) => {
    res.send(`Login page`);
});
app.get('/signup', (req, res) => {
    res.send(`Registration page`);
});

// 3rd step heroku

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "./client/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        );
    });
}

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});