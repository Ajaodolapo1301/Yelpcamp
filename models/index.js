var mongoose = require("mongoose")
mongoose.set("debug",true)
 mongoose.connect("mongodb://localhost/yelpcamp")


mongoose.Promise = Promise 
module.exports.Campground= require("./campground")
module.exports.Comment= require("./comments")
module.exports.User= require("./user")


















