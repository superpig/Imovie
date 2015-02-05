var User = require('../models/user')

//get regist page
exports.showRegist = function (req, res) {
  res.render('regist',{})
}

//get login page 
exports.showLogin = function (req, res) {
  res.render('login',{})
}

//post regist page
exports.regist = function (req, res) {
  var _user = req.body.user
  User.findByName(_user.name, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      console.log('用户已存在')
      res.redirect('/regist')
    } else {
      var user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err)
        }
        res.redirect('/')
      })
    }
  })
}

//post login page
exports.login = function (req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password 
  User.findByName(name, function (err, user){
    if (err) {
      console.log(err)
    }
    if (user) {
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          console.log(err)
        }
        if (isMatch) {
          req.session.user = user
          console.log('密码正确')
          return res.redirect('/')
        } else {
          console.log('密码错误')
          res.redirect('/login')
        }
      })
    } else {
      res.redirect('/login')
    }
  })
}

  //logout page 
exports.logout = function (req, res) {
  delete req.session.user 
  // delete app.locals.user
  res.redirect('/')
}


  //list page 
exports.list = function(req, res) {
  User.fetch(function (err, users){
    if (err) {
      console.log(err)
    }
    // console.log("mark")
    res.render('userlist', {
      users: users
    })  
  })
}

exports.loginRequired = function (req, res, next) {
  var user = req.session.user 
  if (!user) {
    return res.redirect('/login')
  }
  next()
}

exports.adminRequired = function (req, res, next) {
  var user = req.session.user 
  if (user.role < 10 || !user.role) {
    return res.redirect('/login')
  }
  next()
}