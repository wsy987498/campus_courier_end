const Router = require("koa-router")
const myReceiving = new Router()
const db = require('../../config/db')

// 我的接单 已接单 num
myReceiving.post("/getReceivingNum", async (ctx) => {
  const user_id = ctx.request.body.user_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from isreceiving_list where isrec_user_id!='${user_id}'`, (err, data) => {
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
    return db.query(`select * from isreceiving_list where isrec_user_id!='${user_id}' limit ${(page - 1) * pageSize},${pageSize};`, (err, data) => {
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
    (isrec_express_name ,isrec_express_money,isrec_delivery_address,isrec_forward_delivery_time,isrec_express_type,isrec_pick_code,isrec_express_id,isrec_express_recipients,isrec_phone,isrec_remarks,isrec_user_id,isrec_istakeit)
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
  const express_name = ctx.request.body.isrec_express_name
  const express_money = ctx.request.body.isrec_express_money
  const delivery_address = ctx.request.body.isrec_delivery_address
  const forward_delivery_time = ctx.request.body.isrec_forward_delivery_time
  const express_type = ctx.request.body.isrec_express_type
  const pick_code = ctx.request.body.isrec_pick_code
  const express_id = ctx.request.body.isrec_express_id
  const express_recipients = ctx.request.body.isrec_express_recipients
  const phone = ctx.request.body.isrec_phone
  const remarks = ctx.request.body.isrec_remarks
  const user_id = ctx.request.body.isrec_user_id
  const istakeit = ctx.request.body.isrec_istakeit

  const insertFinishedSql =
    `insert into isfinished_list
    (isfi_express_name ,isfi_express_money,isfi_delivery_address,isfi_forward_delivery_time,isfi_express_type,isfi_pick_code,isfi_express_id,isfi_express_recipients,isfi_phone,isfi_remarks,isfi_user_id,isfi_istakeit)
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
  const delExpress_listSql = `delete from isreceiving_list where isrec_express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  const delhavetotake_listSql = `delete from havetotake_list where istake_express_id=${express_id};`
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
  const express_name = ctx.request.body.isrec_express_name
  const express_money = ctx.request.body.isrec_express_money
  const delivery_address = ctx.request.body.isrec_delivery_address
  const forward_delivery_time = ctx.request.body.isrec_forward_delivery_time
  const express_type = ctx.request.body.isrec_express_type
  const pick_code = ctx.request.body.isrec_pick_code
  const express_id = ctx.request.body.isrec_express_id
  const express_recipients = ctx.request.body.isrec_express_recipients
  const phone = ctx.request.body.isrec_phone
  const remarks = ctx.request.body.isrec_remarks
  const user_id = ctx.request.body.isrec_user_id
  const istakeit = ctx.request.body.isrec_istakeit
  const qujianren = ctx.request.body.qujianren

  const updateSql = `update isreceiving_list set isrec_istakeit = 'true' where isrec_express_id='${express_id}';`
  new Promise((resolve, reject) => {
    return db.query(updateSql, (err, data) => {
      if (err) throw err++
      resolve()
    })
  })

  const insertdeliverySql =
    `insert into out_of_delivery
    (outof_express_name ,outof_express_money,outof_delivery_address,outof_forward_delivery_time,outof_express_type,outof_pick_code,outof_express_id,outof_express_recipients,outof_phone,outof_remarks,outof_user_id,outof_istakeit,outof_qujianren)
    values('${express_name}','${express_money}','${delivery_address}','${forward_delivery_time}','${express_type}','${pick_code}','${express_id}','${express_recipients}','${phone}','${remarks}','${user_id}','${istakeit}','${qujianren}')`
  new Promise((resolve, reject) => {
    return db.query(insertdeliverySql, (err, data) => {
      if (err) throw err++
      resolve()
    })
  })

  const insertFinishedSql =
    `insert into havetotake_list
    (istake_express_name ,istake_express_money,istake_delivery_address,istake_forward_delivery_time,istake_express_type,istake_pick_code,istake_express_id,istake_express_recipients,istake_phone,istake_remarks,istake_user_id,istake_istakeit,istake_qujianren)
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
  const express_name = ctx.request.body.isrec_express_name
  const express_money = ctx.request.body.isrec_express_money
  const delivery_address = ctx.request.body.isrec_delivery_address
  const forward_delivery_time = ctx.request.body.isrec_forward_delivery_time
  const express_type = ctx.request.body.isrec_express_type
  const pick_code = ctx.request.body.isrec_pick_code
  const express_id = ctx.request.body.isrec_express_id
  const express_recipients = ctx.request.body.isrec_express_recipients
  const phone = ctx.request.body.isrec_phone
  const remarks = ctx.request.body.isrec_remarks
  const user_id = ctx.request.body.isrec_user_id
  const istakeit = ctx.request.body.isrec_istakeit

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
  const delExpress_listSql = `delete from isreceiving_list where isrec_express_id=${express_id};`
  new Promise((resolve, reject) => {
    return db.query(delExpress_listSql, (err, data) => {
      if (err) throw err
      resolve()
    })
  })
  ctx.body = res
})




//获取派送时间 
myReceiving.post("/getdeliverytime", async (ctx) => {
  const express_id = ctx.request.body.isfi_express_id

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from out_of_delivery where outof_express_id='${express_id}'`, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功',
        data,
      }
      resolve(obj)
    })
  })
  ctx.body = res
})


module.exports = myReceiving