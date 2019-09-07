const router = require("express").Router()
const db = require("../models")
const Campground = require("../models/campground")
const Comment = require("../models/comments")
const middleware =require("../middleware")


// landing page
router.get("/",function(req,res, next) {
  res.render("campground/landing")
})


// getting all campgrounds
router.route("/campground")
.get(function (req, res, next){
    db.Campground.find()
    .then(function(campgrounds) {
        res.render("campground/index",{campgrounds:campgrounds,})
    }) .catch(function(err) {
        console.log(err)
     })
}).post(middleware.isLoggedIn, function(req,res, next) {
     var {description, image, name, price} = req.body
     var author = {
         id: req.user._id,
         username: req.user.username
     }
var newCreatedCampground = {
    name,
    image,
    price,
    description,
    author
}    

    db.Campground.create(newCreatedCampground)
    .then(function(campground) {
        res.redirect("/campground" ,{campgrounds:campground})
    }).catch(function(err) {
        res.send(err)
    })


    // db.Campground.create(req.body, author)
    // .then(function(newCreatedCampground) {
    //     console.log(newCreatedCampground)
    //     res.render("campground/index",{campgrounds:newCreatedCampground})
    // }).catch(function(err) {
    //     res.send(err)
    // })
    
})  



// creating campground
router.get("/campground/new",middleware.isLoggedIn, function(req, res,) {
    res.render("campground/new")
})
  


// show route
router.get("/campground/:id",  function(req, res, next) {
    db.Campground.findById(req.params.id).populate("comments").exec()
    .then(function(foundcampground) {
        res.render("campground/show",{campgrounds:foundcampground})
    }).catch(function(err) {
        return err
    })
})


// authorization

// edit page
router.get("/campground/:id/edit", middleware.checkCampgrounOwnership, function(req, res) {     
    Campground.findById(req.params.id)
        .then(function(foundcampground) {
                res.render("campground/edit", {campground:foundcampground})
        }).catch(function(err){
            console.log(err)
        })
    }
)

// update campground
router.post("/campground/:id", middleware.checkCampgrounOwnership,function(req,res, nxt) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    .then(function(updatedCampground) {
        res.redirect(`/campground/${req.params.id}`)
    }).catch(function (err) {
        res.redirect("/campground")
    })

})


// delete  ROUTE
router.delete("/campground/:id",middleware.checkCampgrounOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id)
    .then(function() {
        res.redirect("/campground")
    }).catch(function (err) {
        res.send(err)
    })
})



    


module.exports = router