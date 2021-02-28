let mysql = require('mysql')

// create 连接池
var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: 'campus_courier_sql',
  user: 'root',
  password: 'root'
})

// 对数据库进行 curd 操作的基础
function query(sql, callback) {
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      callback(err, rows)
      connection.release() //中断连接
    })
  })
}

exports.query = query 