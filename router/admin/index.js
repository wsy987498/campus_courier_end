// 引入路由
const Router = require("koa-router")
const router = new Router()
const login = require("./login")
const users = require("./users")

router.get("/", async (ctx) => {
  ctx.body = "hellow Koa2!" // 返回数据给页面 ctx.response.body="xxx" === ctx.body="xxx"
})

router.get("/admin", async (ctx) => {
  ctx.body = "admin index page!"
})

router.use("/mobile", users.routes(), users.allowedMethods())
router.use("/admin", login.routes(), login.allowedMethods())

//exports  
module.exports = router