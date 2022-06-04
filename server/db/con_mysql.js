var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'db001'
})

connection.connect()

// 查
var sql = 'SELECT * FROM user'
// 增
var addSql = 'INSERT INTO user(Id,name,address) VALUES(?,?,?)'
var addSqlParams = [Math.floor(Math.random() * 1000), '王五', '上海']
// 删
var delSql = `DELETE FROM user where id REGEXP '^1'`
// 改
var modSql = 'UPDATE user SET name = ?,address=? WHERE Id = ?'
var modSqlParams = ['666', '666address', 78]

connection.query(modSql, modSqlParams, (err, result) => {
  if (err) {
    console.log('[UPDATE ERROR] - ', err.message)
    return
  }
  console.log('--------------------------UPDATE----------------------------')
  console.log('UPDATE affectedRows', result.affectedRows)
  console.log('-----------------------------------------------------------------\n\n')
})
// for (let i = 0; i < 10; i++) {
connection.query(addSql, addSqlParams, (err, result) => {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message)
    return
  }

  console.log('--------------------------INSERT----------------------------')
  console.log(result)
  console.log('------------------------------------------------------------\n\n')
})
// }

connection.query(delSql)

connection.query(sql, (err, result) => {
  if (err) {
    console.log('[DELETE ERROR] - ', err.message)
    return
  }

  console.log('--------------------------DELETE----------------------------')
  console.log(result)
  console.log('------------------------------------------------------------\n\n')
})
connection.end()
