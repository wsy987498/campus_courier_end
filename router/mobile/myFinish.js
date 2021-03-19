const Router = require("koa-router")
const myFinish = new Router()
const db = require('../../config/db')

// 我的接单 已接单 num
myFinish.get("/getFinishedNum", async (ctx) => {

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功！',
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

//我的接单 已接单列表
myFinish.post("/isFinished_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功！',
        data,
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

module.exports = myFinish