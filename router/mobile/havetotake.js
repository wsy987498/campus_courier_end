const Router = require("koa-router")
const havetoTake = new Router()
const db = require('../../config/db')

// 我的发单 派送中 num
havetoTake.post("/gethavetoTakeNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from havetotake_list where user_id='${user_id}'`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功',
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})


//我的发单 派送中列表
havetoTake.post("/getHavetoTake_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from havetotake_list where user_id='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功',
        data,
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

module.exports = havetoTake