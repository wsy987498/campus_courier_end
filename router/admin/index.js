// 引入路由
const Router = require("koa-router")
const router = new Router()
const login = require("./login")
const user = require("./user")
const finishexpress = require("./finishexpress")
const count = require("./count")

router.get("/", async (ctx) => {
  ctx.body = "hellow Koa2!"
})

router.get("/admin", async (ctx) => {
  ctx.body = "admin index page!"
})

router.use("/admin", login.routes(), login.allowedMethods())
router.use("/admin", user.routes(), user.allowedMethods())
router.use("/admin", finishexpress.routes(), finishexpress.allowedMethods())
router.use("/admin", count.routes(), count.allowedMethods())

//exports  
module.exports = router