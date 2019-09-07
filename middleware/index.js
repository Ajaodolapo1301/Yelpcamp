const Campground = require("../models/campground")
const Comment = require("../models/comments")
var middlewareObj ={}

middlewareObj.checkCommentOwnership = function checkCommentOwnership( req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
             res.redirect("back")
            } else {
             if (foundComment.author.id.equals(req.user._id)) {
                 next()
             }else{
                 res.redirect("back")
             }
            }
        })
    }else{
        res.redirect("back")
    }
}


middlewareObj.checkCampgrounOwnership= function ( req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
             res.redirect("back")
            } else {
             if (foundCampground.author.id.equals(req.user._id)) {
                 next()
             }else{
                 
                 res.redirect("back")
             }
            }
        })
    }else{
        req.flash("error", "you need to be logged in")
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn=function  (req,res, next) {
    if (req.isAuthenticated()) {
        return next()
    }else{
        req.flash("error", "please log in first")
        res.redirect("/login")
    }
}



module.exports = middlewareObj