// 引入路由
const Router = require("koa-router")
const user = new Router()
const db = require('../../config/db')

// 用户列表
user.post("/userlist", async (ctx) => {

  const pagenum = ctx.request.body.pagenum
  const pagesize = ctx.request.body.pagesize

  const res1 = await new Promise((resolve, reject) => {
    return db.query(`select * from users_list `, (err, data) => {
      if (err) throw err
      let obj = {
        total: data.length
      }
      resolve(obj)
    })
  })

  const res = await new Promise((resolve, reject) => {
    return db.query(`select * from users_list limit ${(pagenum - 1) * pagesize},${pagesize};`, (err, data) => {
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

// 添加用户
user.post("/adduser", async (ctx) => {
  // console.log(ctx.request.body)
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  // 判断数据库里面有没有账号 有就验证密码 没有新增提一条记录
  const registerSql = `select * from users_list where username ='${username}'`
  const resArr = await new Promise((resolve, reject) => {
    return db.query(registerSql, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  // 数组长度是否大于0 判断是否存在
  if (resArr.length > 0) {
    ctx.body = {
      code: 203,
      msg: '该账号已存在'
    }
  } else {
    // 不存在该账号 insert data 
    const insertUserSql = `insert into users_list(username ,password) values('${username}','${password}')`
    const res = await new Promise((resolve, reject) => {
      return db.query(insertUserSql, (err, data) => {
        if (err) throw err
        // console.log(data)
        let obj = {
          code: 200,
          msg: '注册成功',
        }
        resolve(obj)
      })
    })
    ctx.body = res
  }
})

// update userinfo
user.post("/updateuserinfo", async (ctx) => {
  const id = ctx.request.body.id
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  const updateSql = `update users_list set password='${password}',username='${username}' where id='${id}'`
  const res = await new Promise((resolve, reject) => {
    return db.query(updateSql, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '修改成功！'
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

// del userinfo
user.post("/deluserinfo", async (ctx) => {
  const id = ctx.request.body.id
  const updateSql = `delete from users_list where id=${id};`
  const res = await new Promise((resolve, reject) => {
    return db.query(updateSql, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '删除成功！'
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

// search userlist
user.post("/searchuserlist", async (ctx) => {
  const username = ctx.request.body.username
  const userlist = `select * from users_list where username like'%${username}%'`
  const res = await new Promise((resolve, reject) => {
    return db.query(userlist, (err, data) => {
      if (err) throw err
      let obj = {
        code: 200,
        msg: '获取成功！',
        data: data,
        total: data.length
      }
      resolve(obj)
    })
  })
  ctx.body = res
})

module.exports = user