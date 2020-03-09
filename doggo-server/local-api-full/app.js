const jwt = require('jsonwebtoken');
var cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to the DB
const connectionUrl = "mongodb+srv://admin-terance:password@cluster0-u5arr.mongodb.net/doggoDB?retryWrites=true&w=majority/"
mongoose.connect(connectionUrl, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true)

const Schema = mongoose.Schema;
//Mongoose Schemas
const userSchema = new Schema({ name: String, email: { type: String, unique: true, dropDups: true }, password: String });

const User = mongoose.model("user", userSchema);

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
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

//Format of token 
//Authorization: Bearer <access_token>
app.post('/api/signup', (req, res) => {
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name
        });
        newUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Success!");
            }
        });
    });
});


app.post('/api/login', (req, res) => {
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
                        jwt.sign({ foundUser }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
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

//Verify token 
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

app.listen(5000, () => console.log('App listening on port 5000!'));