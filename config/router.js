var _ = require('underscore')
var multipart = require('connect-multiparty')
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

module.exports = function (app) {
  //pre handle user 
  app.use(function (req, res, next) {
    var _user = req.session.user 
    app.locals.user = _user
    console.log(_user)
    next()
  })

  /*首页*/
  //index page
  app.get('/', Index.index)
  app.get('/results', Index.search)

  /*电影*/
  // detail page
  app.get('/movie/:id', Movie.detail)
  //admin page
  app.get('/admin/movie/new', User.loginRequired, User.adminRequired, Movie.new)
  //admin update movie
  app.get('/admin/movie/update/:id', User.loginRequired, User.adminRequired, Movie.update)
  //list page 
  app.get('/admin/movie/list', User.loginRequired, User.adminRequired, Movie.list)
  // admin post movie
  app.post('/admin/movie', User.loginRequired, User.adminRequired, Movie.savePoster, Movie.save)
  //list delete movie
  app.delete('/admin/movie/list', User.loginRequired, User.adminRequired, Movie.delete)

  /*用户*/
  //post regist page
  app.post('/user/regist', User.regist)
  //post login page
  app.post('/user/login', User.login)
  //get regist page
  app.get('/regist', User.showRegist)
  //get login page
  app.get('/login', User.showLogin)
  //logout page 
  app.get('/logout', User.logout)
  //userlist page 
  app.get('/admin/user/list', User.loginRequired, User.adminRequired,User.list)

  /*评论*/
  app.post('/user/comment', User.loginRequired, Comment.save)

  /*分类*/
  app.get('/admin/category/new', User.loginRequired, User.adminRequired, Category.new)
  app.post('/admin/category', User.loginRequired, User.adminRequired, Category.save)
  app.get('/admin/category/list', User.loginRequired, User.adminRequired, Category.list)

}
