const Router = require("koa-router")
const count = new Router()
const db = require('../../config/db')

// 我的发单待接单 num
count.post("/getWaitOrderNum", async (ctx) => {
  const user_id = ctx.request.body.user_id
  const res = await new Promise((resolve, reject) => {
    // return db.query(`select * from express_list where user_id='${user_id}'`, (err, data) => {
    return db.query(`select * from express_list`, (err, data) => {
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

// 我的发单 派送中 num
count.post("/gethavetoTakeNum", async (ctx) => {
  const user_id = ctx.request.body.user_id
  const res = await new Promise((resolve, reject) => {
    // return db.query(`select * from havetotake_list where istake_user_id='${user_id}'`, (err, data) => {
    return db.query(`select * from havetotake_list`, (err, data) => {
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

// 我的接单 已接单 num
count.post("/getReceivingNum", async (ctx) => {
  const user_id = ctx.request.body.user_id
  const res = await new Promise((resolve, reject) => {
    // return db.query(`select * from isreceiving_list where isrec_user_id!='${user_id}'`, (err, data) => {
    return db.query(`select * from isreceiving_list`, (err, data) => {
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

// 我的发单 发单已完成 num
count.post("/getfadanFinishedNum", async (ctx) => {
  const user_id = ctx.request.body.user_id
  const res = await new Promise((resolve, reject) => {
    // return db.query(`select * from isfinished_list where isfi_user_id='${user_id}'`, (err, data) => {
    return db.query(`select * from isfinished_list`, (err, data) => {
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

// 我的接单 已完成 num
count.post("/getFinishedNum", async (ctx) => {
  const user_id = ctx.request.body.user_id
  const res = await new Promise((resolve, reject) => {
    // return db.query(`select * from isfinished_list where isfi_user_id!='${user_id}'`, (err, data) => {
    return db.query(`select * from isfinished_list`, (err, data) => {
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

module.exports = count