
const database = require('./db-config');
const mongoose = require('mongoose').set('debug', true);
const chalk = require('chalk')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// username 数据库用户名
// password 数据库密码
// localhost 数据库ip
// dbname 数据库名称
const url = `mongodb://${database.user}:${database.password}@${database.servername}:${database.port}/${database.DATABASE}`;

module.exports = {
  connect: () => {
    mongoose.connect(url, options);
    let db = mongoose.connection;
    db.on('error', console.log(chalk.red('连接错误:')));
    db.once('open', () => {
      console.log(chalk.cyan('mongodb connect suucess'));
    });
  },
};
