var db = require("../models")
var router = require("express").Router()
var User = require("../models/user")
var passport = require("passport")


// register Route
router.route("/register")

.get(function(req,res) {
    res.render("auth/register")
})
.post(function (req,res, next) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
         return res.render("auth/register")
        }
            passport.authenticate("local")(req,res,function() {
                req.flash("success",`welcome to yelpCamp, home of campgrounds ${user.username}`)
                res.redirect("/campground")
            })
        
    })
    
})

// login route
router.route("/login")
.get(function(req,res ) {
    res.render("auth/login")
})
.post(passport.authenticate("local",
    {successRedirect:"/campground",
    failureRedirect:"/login"}), 
    function(req,res) {
    
})

// logout Route
router.get("/logout",function(req,res) {
    req.logout()
    req.flash("success", "you have been successfully logged out")
    res.redirect("/campground")
})






module.exports = router