/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

// 2.字义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  phone: String,
  email: String,
  avatar:String,
  create_time: {type: Number, default: Date.now},
  role_id: String
})

// 3. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('users', userSchema)

// 初始化默认超级管理员用户: admin/admin
UserModel.findOne({username: 'admin'}).then(user => {
  if(!user) {
    UserModel.create({username: 'admin', password: md5('admin'),avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'})
            .then(user => {
              console.log('初始化用户: 用户名: admin 密码为: admin')
            })
  }
})

// 4. 向外暴露Model
module.exports = UserModel