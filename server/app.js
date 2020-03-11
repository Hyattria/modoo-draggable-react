// const mongo = require('./config/mongo');
// mongo.connect();

const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')();
const koaBody = require('koa-body');

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

fs.readdirSync(path.join(__dirname, './routes')).forEach(route => {
  let api = require(`./routes/${route}`);
  router.use(`/${route.replace('.js', '')}`, api.routes());
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(4000);
