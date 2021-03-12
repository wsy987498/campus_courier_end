// 引入路由
const Router = require("koa-router")
const users = new Router()
const db = require('../../config/db')

// 用户列表 接口
users.get("/users", async (ctx) => {
  let res = await new Promise((resolve, reject) => {
    return db.query(`select * from users`, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  ctx.body = res
})

module.exports = users