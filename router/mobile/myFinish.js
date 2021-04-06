const Router = require("koa-router")
const myFinish = new Router()
const db = require('../../config/db')

// 我的接单 已完成 num
myFinish.post("/getFinishedNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list where isfi_user_id!='${user_id}'`, (err, data) => {
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

//我的接单 已完成列表
myFinish.post("/isFinished_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list where isfi_user_id!='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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


// 我的发单 发单已完成 num
myFinish.post("/getfadanFinishedNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list where isfi_user_id='${user_id}'`, (err, data) => {
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

//我的发单 发单已完成列表
myFinish.post("/getfadanFinished_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isfinished_list where isfi_user_id='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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

module.exports = myFinish