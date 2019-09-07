const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const session = require('express-session');
const passport = require('passport');
var LocalStrategy = require("passport-local")
var methodOverride = require("method-override")
var User = require("./models/user")
var cors = require("cors")
const flash =require("connect-flash")


const app = express()
app.set('view engine', "ejs")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(methodOverride("_method"))
app.use(flash())



// PASSPORT CONFIG
app.use(require("express-session")({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



// Global variable
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})



// app.use(function(req, res, next) {
    
//     res.locals.message = req.flash("success")
//     next()
// })


// requiring ROUTES
const campgroundRoute = require("./routes/campground")
const authRoute = require("./routes/auth")
const commentRoute = require("./routes/comment")


// using it
app.use(campgroundRoute) 
app.use(authRoute)
app.use(commentRoute)










app.listen(8080, function() {
    console.log("server up")
})

