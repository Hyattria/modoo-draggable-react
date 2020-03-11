const webpack = require('webpack');

const ora = require('ora');
const chalk = require('chalk');

const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

const spinner = ora('building for production...').start();

compiler.run((err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  );

  console.log(chalk.cyan('  Build complete..\n'));
  console.log(
    chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n",
    ),
  );
});
