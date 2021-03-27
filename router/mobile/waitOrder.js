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

// update编辑发布订单
waitOrder.post("/updateorder", async (ctx) => {
  const express_name = ctx.request.body.express_name
  const express_type = ctx.request.body.express_type
  const forward_delivery_time = ctx.request.body.forward_delivery_time
  const express_recipients = ctx.request.body.express_recipients
  const express_money = ctx.request.body.express_money
  const delivery_address = ctx.request.body.delivery_address
  const phone = ctx.request.body.phone
  const pick_code = ctx.request.body.pick_code
  const remarks = ctx.request.body.remarks
  const express_id = ctx.request.body.express_id

  const updateSql = `update express_list set 
  
  express_name='${express_name}',express_type='${express_type}', forward_delivery_time='${forward_delivery_time}',express_recipients='${express_recipients}',express_money='${express_money}',delivery_address='${delivery_address}',phone='${phone}',pick_code='${pick_code}',remarks='${remarks}' where express_id='${express_id}'`

  const res = await new Promise((resolve, reject) => {
    return db.query(updateSql, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '修改成功'
      }
      resolve(obj)
    })
  })
  ctx.body = res
})


module.exports = waitOrder