const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ora = require('ora');
const chalk = require('chalk');

const webpackConfig = require('../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectScriptPlugin = require('../plugins/webpack-inject-script');

const doCompiler = async function(jsonData) {
  return new Promise(resolve => {
    const compiler = webpack(
      merge(webpackConfig, {
        plugins: [
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            chunks: ['vendor', 'main'],
            inject: 'body',
          }),
          new InjectScriptPlugin({
            jsonData,
          }),
        ],
      }),
    );
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
      resolve();
    });
  });
};

module.exports = doCompiler;
