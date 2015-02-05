var Movie = require('../models/movie')
var Category = require('../models/category')

//index page
exports.index = function (req, res) {
  Category
    .find({})
    .populate({path: 'movies', options: {limit: 6}})
    .exec(function (err, categories) {
      if (err) {
        console.log(err)
      }
      res.render('index', {
        title : 'Imovie 首页',
        categories: categories
      })  
  })
}

//search page 
exports.search = function (req, res) {
  var catId = req.query.cat 
  var search = req.query.search
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count

  // console.log(catId)
  if (catId) {
    Category
      .find({_id: catId})
      .populate({
        path: 'movies', 
        select: 'title poster',
      })
      .exec(function (err, categories) {
        if (err) {
          console.log(err)
        }
        

        var movies = categories[0].movies || []
        // console.log(movies)
        var results = movies.slice(index, index + count)
        // console.log(results)
        res.render('results', {
          title : 'Imovie 首页',
          keyword: categories[0].name,
          movies: results,
          query: 'cat='+catId,
          currentPage: (page + 1),
          totalPage: Math.ceil(movies.length / 2)
        })  
    })
  } else {
    Movie
      .find({title: new RegExp(search + '*', 'i')})
      .exec(function (err, movies) {
        if (err) {
          console.log(err)
        }
        var results = movies.slice(index, index + count)
        res.render('results', {
          keyword: search,
          movies: results,
          query: 'search='+ search,
          currentPage: (page + 1),
          totalPage: Math.ceil(movies.length / 2)
        })
      })

  }
}