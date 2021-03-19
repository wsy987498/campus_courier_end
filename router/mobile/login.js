// 引入路由
const Router = require("koa-router")
const login = new Router()
const db = require('../../config/db')
const token = require('../../utils/token')

// 注册 接口
login.post("/register", async (ctx) => {
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

// 登录 接口
login.post("/login", async (ctx) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  // 判断数据库里面有没有账号 有就验证密码
  const checkUserSql = `select * from users_list where username ='${username}'`
  const resArr = await new Promise((resolve, reject) => {
    return db.query(checkUserSql, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  // 数组长度是否大于0 判断是否存在该用户
  if (resArr.length > 0) {
    if (resArr[0].password == password) {
      const _token = token.create(resArr[0].username)
      ctx.body = {
        code: 200,
        msg: '登录成功',
        username: resArr[0].username,
        token: _token,
        id: resArr[0].id
      }
    } else {
      ctx.body = {
        code: 202,
        msg: '账号或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 202,
      msg: '账号或密码错误'
    }
  }
})

login.post("/updatePassword", async (ctx) => {
  const id = ctx.request.body.id
  const password = ctx.request.body.password

  const updateSql = `update users_list set password='${password}' where id='${id}'`

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





module.exports = login