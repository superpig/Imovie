var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment.js')
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment