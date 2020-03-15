const path = require('path');
const router = require('koa-router')();
const archiver = require('archiver');
const send = require('koa-send');

const compiler = require('../build/scripts/build');
const fs = require('fs');

async function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  archive.directory(source, false).pipe(stream);

  await archive.finalize();
}

// 下载生成的页面
router.post('/download', async ctx => {
  const { data } = ctx.request.body;

  await compiler(data);

  const _path = path.resolve(__dirname, '../', 'build/dist');
  await zipDirectory(_path, 'dist.zip');

  await send(ctx, 'dist.zip');
});

module.exports = router;
