const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const archiver = require('archiver');

const send = require('koa-send');
const compiler = require('../build/scripts/build');

const UPLOAD_DIR = path.resolve(__dirname, '..', 'public'); // 大文件存储目录

// 压缩文件夹
async function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);
  archive.directory(source, false).pipe(stream);
  await archive.finalize();
}

async function mergeFileChunk(filePath, filename, size) {}

module.exports = {
  download: async ctx => {
    const { data } = ctx.request.body;
    await compiler(data);
    const _path = path.resolve(__dirname, '../', 'build/dist');
    await zipDirectory(_path, 'dist.zip');

    await send(ctx, 'dist.zip');
  },
  upload: async ctx => {
    const { filename, hash } = ctx.request.body;

    const chunkDir = path.resolve(UPLOAD_DIR, filename);
    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      fse.mkdirSync(chunkDir);
    }

    // 切换切片文件
    if (fse.pathExists(`${chunkDir}/${hash}`)) {
      fse.writeFile(`${chunkDir}/${hash}`);
    } else {
      await fse.move(`${chunkDir}/${hash}`, `${chunkDir}/${hash}`);
    }
    ctx.body = '';
  },
  merge: async (ctx, next) => {
    const { filename, size } = ctx.request.body;
    const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
    await mergeFileChunk(filePath, filename);
  },
};
