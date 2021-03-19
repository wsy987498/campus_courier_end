const Router = require("koa-router")
const waitOrder = new Router()
const db = require('../../config/db')

// 我的发单待接单 num
waitOrder.post("/getWaitOrderNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from express_list where user_id='${user_id}'`, (err, data) => {
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

//我的发单 待接单列表
waitOrder.post("/getWaitOrder_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from express_list where user_id='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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

//删除task 
waitOrder.post("/delmytask", async (ctx) => {
  const express_id = ctx.request.body.express_id

  const delExpress_listSql = `delete from express_list where express_id=${express_id};`

  const res = await new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '已删除',
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

module.exports = waitOrder