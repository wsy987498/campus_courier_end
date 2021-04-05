// app.js 项目入口文件
const Koa = require("koa2")
const app = new Koa()

// 允许跨域访问
const cors = require("koa2-cors")

// 读取静态资源文件
const static = require("koa-static")
const staticCache = require('koa-static-cache');
const path = require("path")

// bodyparser 
const bodyparser = require("koa-bodyparser")

// 接口异常处理
const errorHandler = require('./utils/errorHandler')

// 引入路由 
const adminRouter = require("./router/admin/index")// admin router
const mobileRouter = require("./router/mobile/index")// moblie router

// 端口号
const port = 9000

// 调用中间件 app.use()
/**
 * router.routes() 启动路由
 * router.allowedMethods() 允许任何请求 ex：get，post，put
 */
app.use(cors())
app.use(static(path.join(__dirname + "/assets")))
app.use(bodyparser())//get post data
app.use(adminRouter.routes(), adminRouter.allowedMethods())
app.use(mobileRouter.routes(), adminRouter.allowedMethods())

app.use(
  staticCache(
    path.join(__dirname, './public'),
    { dynamic: true },
    {
      maxAge: 365 * 24 * 60 * 60,
    },
  ),
);
app.use(
  staticCache(
    path.join(__dirname, './public/avator'),
    { dynamic: true },
    {
      maxAge: 365 * 24 * 60 * 60,
    },
  ),
);
app.use(
  bodyparser({
    multipart: true,
    formidable: { uploadDir: path.join(__dirname, './public/images') },
  }),
);


// 接口异常处理返回信息 error 
errorHandler(app)

// app running at http://localhost:xxx
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})