const Router = require("koa-router")
const myReceiving = new Router()
const db = require('../../config/db')

// 我的接单 已接单 num
myReceiving.post("/getReceivingNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list where user_id!='${user_id}'`, (err, data) => {
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

//我的接单 已接单列表
myReceiving.post("/isReceiving_list", async (ctx) => {
  const page = ctx.request.body.page
  const pageSize = ctx.request.body.pageSize
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list where user_id!='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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

// 立即接单
myReceiving.post("/addtoReceiving", async (ctx) => {
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
  const istakeit = ctx.request.body.istakeit

  const insertReceivingSql =
    `insert into isreceiving_list
    (express_name ,express_money,delivery_address,forward_delivery_time,express_type,pick_code,express_id,express_recipients,phone,remarks,user_id,istakeit)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_id}','${express_recipients}','${phone}','${remarks}','${user_id}','${istakeit}')`

  const res = await new Promise((resolve, reject) => {
    return db.query(insertReceivingSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '接单成功',
      }
      resolve(obj)
    })
  })
  const delExpress_listSql = `delete from express_list where express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  ctx.body = res
})

// 我的接单 完成
myReceiving.post("/addtoFinished", async (ctx) => {
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
  const istakeit = ctx.request.body.istakeit

  const insertFinishedSql =
    `insert into isfinished_list
    (express_name ,express_money,delivery_address,forward_delivery_time,express_type,pick_code,express_id,express_recipients,phone,remarks,user_id,istakeit)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_id}','${express_recipients}','${phone}','${remarks}','${user_id}','${istakeit}')`

  const res = await new Promise((resolve, reject) => {
    return db.query(insertFinishedSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '已完成派送',
      }
      resolve(obj)
    })
  })
  const delExpress_listSql = `delete from isreceiving_list where express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  const delhavetotake_listSql = `delete from havetotake_list where express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delhavetotake_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  ctx.body = res
})



// 我的接单 已取件 派送中
myReceiving.post("/havetoTake_list", async (ctx) => {
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
  const istakeit = ctx.request.body.istakeit
  const qujianren = ctx.request.body.qujianren


  const updateSql = `update isreceiving_list set istakeit = 'true' where express_id='${express_id}';`
  new Promise((resolve, reject) => {
    return db.query(updateSql, (err, data) => {
      if (err) throw err++
      resolve()
    })
  })

  const insertFinishedSql =
    `insert into havetotake_list
    (express_name ,express_money,delivery_address,forward_delivery_time,express_type,pick_code,express_id,express_recipients,phone,remarks,user_id,istakeit,qujianren)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_id}','${express_recipients}','${phone}','${remarks}','${user_id}','${istakeit}','${qujianren}')`

  const res = await new Promise((resolve, reject) => {
    return db.query(insertFinishedSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '请尽快派送',
      }
      resolve(obj)
    })
  })

  ctx.body = res
})


// 我的接单 取消订单
myReceiving.post("/deltoJiedan", async (ctx) => {
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
  const istakeit = ctx.request.body.istakeit

  const insertTojiedanSql =
    `insert into express_list
    (express_name ,express_money,delivery_address,forward_delivery_time,express_type,pick_code,express_id,express_recipients,phone,remarks,user_id,istakeit)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_id}','${express_recipients}','${phone}','${remarks}','${user_id}','${istakeit}')`

  const res = await new Promise((resolve, reject) => {
    return db.query(insertTojiedanSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '已取消',
      }
      resolve(obj)
    })
  })
  const delExpress_listSql = `delete from isreceiving_list where express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  ctx.body = res
})

module.exports = myReceiving