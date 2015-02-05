var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie.js')
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie