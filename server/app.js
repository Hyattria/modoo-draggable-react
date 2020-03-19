// const mongo = require('./config/mongo');
// mongo.connect();

const cors = require('koa2-cors');
const koaBody = require('koa-body');
const router = require('./routes.js');

const Koa = require('koa');
const app = new Koa();

// 跨域处理
app.use(cors());
/**
 * post接口数据处理
 */
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 3000 * 1024 * 1024, // 设置上传文件大小最大限制，默认30M
    },
  }),
);

router(app); /*启动路由*/

app.listen(4000, () => {
  console.log('server is running at http://localhost:4000');
});
