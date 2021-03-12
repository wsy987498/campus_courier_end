// 引入路由
const Router = require("koa-router")
const express = new Router()
const db = require('../../config/db')

// 快递列表 
express.get("/express_list", async (ctx) => {
  let res = await new Promise((resolve, reject) => {
    return db.query(`select * from express_list`, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  ctx.body = res
})

module.exports = express