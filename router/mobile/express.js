// 引入路由
const Router = require("koa-router")
const express = new Router()
const db = require('../../config/db')

// 快递列表 
express.post("/express_list", async (ctx) => {
  // console.log(ctx.request.body)
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const expressName = ctx.request.body.expressName
  const sort = ctx.request.body.sort
  const user_id = ctx.request.body.user_id
  // console.log(expressName, sort)
  if (expressName == "all" && sort == "default") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where user_id!='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  } else if (expressName == "all" && sort == "asc") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where user_id!='${user_id}' order by create_time asc limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  } else if (expressName == "all" && sort == "desc") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where user_id!='${user_id}' order by create_time desc limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  } else if (expressName != "all" && sort == "default") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where express_name ='${expressName}' and user_id!='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  } else if (expressName != "all" && sort == "desc") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where express_name ='${expressName}' and user_id!='${user_id}' order by create_time desc limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  } else if (expressName != "all" && sort == "asc") {
    let res = await new Promise((resolve, reject) => {
      return db.query(`select * from express_list where express_name ='${expressName}'and user_id!='${user_id}' order by create_time asc limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
  }
})

// 新建task
express.post("/add_express", async (ctx) => {
  // console.log(ctx.request.body)
  const express_name = ctx.request.body.express_name
  const express_money = ctx.request.body.express_money
  const delivery_address = ctx.request.body.delivery_address
  const forward_delivery_time = ctx.request.body.forward_delivery_time
  const express_type = ctx.request.body.express_type
  const pick_code = ctx.request.body.pick_code
  const express_id = ctx.request.body.express_id
  const express_recipients = ctx.request.body.express_recipients
  const phone = ctx.request.body.phone
  const remarks = ctx.request.body.remarks
  const user_id = ctx.request.body.user_id

  const insertExpressSql =
    `insert into express_list
    (express_name ,express_money,delivery_address,forward_delivery_time,express_type,pick_code,express_recipients,phone,remarks,user_id)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_recipients}','${phone}','${remarks}','${user_id}')`
  const res = await new Promise((resolve, reject) => {
    return db.query(insertExpressSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '新建成功',
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

module.exports = express