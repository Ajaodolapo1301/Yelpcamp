const router = require("express").Router()
const db = require("../models")
const Campground = require("../models/campground")
const Comment = require("../models/comments")
const middleware =require("../middleware")


router.get("/campground/:id/comments/new", middleware.isLoggedIn,  function(req, res ) {
    Campground.findById(req.params.id)
    .then(function(campground) {
        res.render("comments/new",{campground:campground})
    }).catch(function (err) {
        return err
    })    
})

router.post("/campground/:id/comments", middleware.isLoggedIn,  function(req,res, next) {
  db.Campground.findById(req.params.id, function (err,campground) {
      if (err) {
          res.redirect("/campground")
      } else {
        db.Comment.create(req.body.comment , function (err ,newComment) {
              if (err) {
                  console.log(err)
              }else{
            //   add username and id to comments
              newComment.author.id= req.user._id
              newComment.author.username= req.user.username
                // save comments
                newComment.save()
              campground.comments.push(newComment)
              campground.save()
              res.redirect(`/campground/${campground._id}`)
              }
          })
      }
  })
})

// edit
router.get("/campground/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res, next) {
  db.Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
          console.log(err)
      }else{
          db.Comment.findById(req.params.comment_id, function(err, foundComment) {
              if (err) {
                  console.log(err)
              }
              res.render("comments/edit", {comment: foundComment, campground: foundCampground})
          })
      }
  })
})
router.put("/campground/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res, next) {
    db.Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then(function(updatedComment) {
        res.redirect(`/campground/${req.params.id}`)
    }).catch(function(err) {
        console.log(err)
        res.redirect("back")
    })
})



router.delete('/campground/:id/comments/:comment_id',middleware.checkCommentOwnership, function (req,res,) {
    db.Comment.findByIdAndRemove(req.params.comment_id)
    .then(function() {
        res.redirect(`/campground/${req.params.id}`)
    }).catch(function (err) {
        res.redirect("back")
    })
})









module.exports = router