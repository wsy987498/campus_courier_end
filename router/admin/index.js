// 引入路由
const Router = require("koa-router")
const router = new Router()
const login = require("./login")


router.get("/", async (ctx) => {
  ctx.body = "hellow Koa2!"
})

router.get("/admin", async (ctx) => {
  ctx.body = "admin index page!"
})

router.use("/admin", login.routes(), login.allowedMethods())

//exports  
module.exports = router