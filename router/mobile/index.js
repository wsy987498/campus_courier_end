/**
 * mobile 数据接口
 */

// 引入路由
const Router = require("koa-router")
const router = new Router()

const login = require("./login")
const express = require("./express")
const myReceiving = require("./myReceiving")
const myFinish = require("./myFinish")

router.get("/", async (ctx) => {
  ctx.body = "campus_courier api!"
})

router.get("/mobile", async (ctx) => {
  ctx.body = "mobile index page!"
})


router.use("/mobile", login.routes(), login.allowedMethods())
router.use("/mobile", express.routes(), express.allowedMethods())
router.use("/mobile", myReceiving.routes(), myReceiving.allowedMethods())
router.use("/mobile", myFinish.routes(), myFinish.allowedMethods())

// 路由重定向
// router.redirect("/", ",/mobile")
module.exports = router