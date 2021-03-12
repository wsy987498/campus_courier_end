/**
 * mobile 数据接口
 */

// 引入路由
const Router = require("koa-router")
const router = new Router()

const login = require("./login")
const express = require("./express")

router.get("/", async (ctx) => {
  ctx.body = "hellow Koa2!" // 返回数据给页面 ctx.response.body="xxx" === ctx.body="xxx"
})

router.get("/mobile", async (ctx) => {
  ctx.body = "mobile index page!"
})


router.use("/mobile", login.routes(), login.allowedMethods())
router.use("/mobile", express.routes(), express.allowedMethods())

// 路由重定向
// router.redirect("/", ",/mobile")

module.exports = router