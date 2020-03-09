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

app.post('/doggo-atlas-login-api', (req, res) => {
    //Mock user
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        console.log("Logged in");
                        jwt.sign({ foundUser }, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
                            res.json({
                                token
                            });
                        });
                    }
                });
            }
        }
    });
});


module.exports = app