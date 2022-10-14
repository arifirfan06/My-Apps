//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 12;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { appendFile } = require("fs");
const { urlencoded } = require("body-parser");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(session({
    secret: "this is not secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB');
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);

// const secret = process.env.SECRET
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res) => {
res.render("home")});

app.get("/login", (req,res) => {
res.render("login")});

app.get("/register", (req,res) => {
res.render("register")});

app.get("/secrets",(req,res) => {
    User.find({"secret": {$ne: null}}, function(err,found){
        if (err) {
            console.log(err);
        } else {
            if (found) {
                res.render("secrets", {userDataAndSecret:found});
            }
        }
    })
});

app.get("/logout", function(req,res){
    req.logout(function(err){
        if (!err) {
            res.redirect("/");
        }
    });
});

app.get("/submit", (req,res) => {
    if (req.isAuthenticated()) {  
        res.render("submit");
    } else {
        res.redirect("/");
     }
});


app.post("/register", (req,res) => {

    User.register({username: req.body.username}, req.body.password, function(err,user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })
});

app.post("/login", (req,res) => {
    const user = new User ({
        username : req.body.username,
        password : req.body.password
    })
    req.login(user, function (err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/submit", function (req,res) {
    const submittedSecret = req.body.secret;
    User.findById(req.user.id, function(err,found){
        if (err) {
            console.log(err);
        } else {
            if (found) {
            found.secret = submittedSecret
            found.save(function() {
                res.redirect("/secrets");
            })
            }
        }
    })
})

app.listen(3000, function(){
    console.log("Started");
});