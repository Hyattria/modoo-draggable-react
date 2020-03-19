const router = require('koa-router')();
const PageController = require('./controller/page');

module.exports = app => {
  // 下载生成的页面
  router.post('/download', PageController.download);
  router.post('/page/upload', PageController.upload);
  router.post('/page/merge', PageController.merge);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
