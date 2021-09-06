console.log(process.env)
module.exports = {
  server_port: process.env.PORT || 8084,
  // dataBase: 'mongodb://database/vue-admin',
  dataBase: process.env.MONGODB_URI || 'mongodb://database/vue-admin',
  socketAddress: ''
  // dataBase: "mongodb://username:password@localhost:27017/blog",
}
