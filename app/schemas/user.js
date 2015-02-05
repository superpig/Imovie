/*
	用户模型
*/
var mongoose = require('mongoose')
//var bcrypt = require('bcrypt')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10

// 用户模型的基本属性
var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	/*
		0 normal user
		1 verified user
		...
		10 admin user
		>30 super user 
	*/
	role: {
		type: Number,
		default: 0
	},
	password: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}   	
})

//保存用户之前的操作：设置meta属性，利用哈希算法和加盐算法重置密码
UserSchema.pre('save', function(next) {
	var user = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	/*bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) {
			return next(err)
		}
		bcrypt.crypto.Hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err)
			}
			user.password = hash 
			next()
		})
	})*/
	bcrypt.hash(user.password, null, null, function (err, hash){
		if (err) {
			return next(err)
		} 
		user.password = hash
		next() 	
	})
})

UserSchema.methods = {
	comparePassword: function (_password, cb) {
		bcrypt.compare(_password, this.password, function (err, res) {
			if (err) {
				cb(err)
			}
			cb(null, res)
		})
	}
}

//静态方法：fetch查找所有的用户，findById通过id查找用户,通过模型就可以调用
UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this.findOne({
			_id: id
		}).exec(cb)
	},
	findByName: function (_name, cb) {
		return this.findOne({
			name: _name
		}).exec(cb)
	}
}

module.exports = UserSchema