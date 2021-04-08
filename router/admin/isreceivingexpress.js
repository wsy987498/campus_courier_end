const Router = require("koa-router")
const isreceivingexpress = new Router()
const db = require('../../config/db')

//已接单
isreceivingexpress.post("/getisreceiving_list", async (ctx) => {
  const pagenum = ctx.request.body.pagenum
  const pagesize = ctx.request.body.pagesize

  const res1 = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list`, (err, data) => {
      if (err) throw err
      let obj = {
        total: data.length
      }
      resolve(obj)
    })
  })

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list limit ${(pagenum - 1) * pagesize},${pagesize};`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功',
        data,
        total: res1.total
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

// 删除 
isreceivingexpress.post("/delisreceiving_list", async (ctx) => {
  const id = ctx.request.body.id
  const res = await new Promise((resolve, reject) => {
    return db.query(`delete from isreceiving_list where isrec_express_id = ${id};`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '删除成功',
        data,
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

//查询接口
isreceivingexpress.post("/searchisreceiving_list", async (ctx) => {
  // const pagenum = ctx.request.body.pagenum
  // const pagesize = ctx.request.body.pagesize
  const express_recipients = ctx.request.body.express_recipients

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list where isrec_express_recipients like '%${express_recipients}%' `, (err, data) => {
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

module.exports = isreceivingexpress