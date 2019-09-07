var mongoose = require("mongoose")
var passportlocalMongoose = require("passport-local-mongoose")
var userSchema = new mongoose.Schema({
    // email: String,
    password:String,
    username: String
})

userSchema.plugin(passportlocalMongoose)


var User = mongoose.model('User', userSchema);
module.exports= User
