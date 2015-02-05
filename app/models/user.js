var mongoose = require('mongoose')
var UserSchema = require('../schemas/user.js')
var User = mongoose.model('User', UserSchema)

module.exports = User