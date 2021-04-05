// 引入路由
const Router = require("koa-router")
const bodyparser = require("koa-bodyparser")
let fs = require('fs');
const user = new Router()
const db = require('../../config/db')

// 获取用户头像
// user.post("/getAvator", async (ctx) => {
//   const id = ctx.request.body.id
//   const password = ctx.request.body.password
//   const updateSql = `update users_list set password='${password}' where id='${id}'`
//   const res = await new Promise((resolve, reject) => {
//     return db.query(updateSql, (err, data) => {
//       if (err) throw err
//       let obj = {
//         code: 200,
//         msg: '修改成功！'
//       }
//       resolve(obj)
//     })
//   })
//   ctx.body = res
// })

// 获取用户头像
user.post('/getAvator', async ctx => {
  const username = ctx.request.body.username
  const findSql = `select * from users_list where username ='${username}'`
  const resArr = await new Promise((resolve, reject) => {
    return db.query(findSql, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  if (resArr.length >= 1) {
    ctx.body = {
      code: 200,
      avator: Object.assign({}, resArr[0]).avator,
      message: '获取头像成功',
    };
  } else {
    // 没有上传头像
    ctx.body = {
      code: 200,
      avator: '',
      message: '还没有上传头像',
    };
  }
});

// 上传头像
user.post('/uploadAvator', bodyparser({ formLimit: '5mb', jsonLimit: '5mb', textLimit: '5mb', }), async ctx => {
  var { username, avator } = ctx.request.body;
  // console.log(username, avator)
  var base64Data = avator.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer.from(base64Data, 'base64');
  var getName = Number(Math.random().toString().substr(3),).toString(36) + Date.now();

  await new Promise((reslove, reject) => {
    fs.writeFile(
      './public/images/avator/' + getName + '.png',
      // './public/images/avator/' + username + '.png',
      dataBuffer,
      err => {
        if (err) {
          reject(false);
        }
        reslove(true);
      },
    );
  });
  const insertUseAvarSql = `update users_list set avator='${getName}' where username='${username}'`
  const res = await new Promise((resolve, reject) => {
    return db.query(insertUseAvarSql, (err, data) => {
      if (err) throw err
      // console.log(data)
      let obj = {
        code: 200,
        msg: '上传成功',
      }
      resolve(obj)
    })
  })

  ctx.body = res
});

module.exports = user