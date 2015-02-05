var express = require('express')
var port = process.env.PORT || 3000
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var morgan = require('morgan')
var multipart = require('connect-multiparty')
var app = express()
var dbUrl = 'mongodb://localhost/imovie'

//connect to mongoDB
mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(cookieParser())
app.use(multipart())

app.use(session({
 	secret: 'imovie',
 	resave: false,
 	saveUninitialized: false,
 	store: new MongoStore({
	 	url: dbUrl,
	 	collection: 'sessions'
 	})
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

//设置入口文件，输出日志和错误信息
if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	//格式化源代码
	app.locals.pretty =true 
	mongoose.set('debug', true)
}

//导出路由模块
require('./config/router')(app)

console.log('Imovie started on port' +　port)

