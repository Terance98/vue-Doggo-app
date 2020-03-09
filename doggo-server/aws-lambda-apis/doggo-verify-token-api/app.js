const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to the DB
const connectionUrl = "mongodb+srv://admin-terance:password@cluster0-u5arr.mongodb.net/doggoDB?retryWrites=true&w=majority/"
mongoose.connect(connectionUrl, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true)
// Set up a whitelist and check against it:

// Then pass them to cors:

const Schema = mongoose.Schema;
//Mongoose Schemas
const userSchema = new Schema({ name: String, email: { type: String, unique: true, dropDups: true }, password: String });

const User = mongoose.model("user", userSchema);


app.post("/doggo-verify-token-api", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created..!",
                authData
            });
        }
    })
});

// //Verify token 
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer  is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        res.sendStatus(403);
    }
}
// app.listen(6000);
module.exports = app