var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category.js')
var Category = mongoose.model('Category', CategorySchema)

module.exports = Category