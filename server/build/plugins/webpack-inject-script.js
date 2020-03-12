class InjectScriptPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const uglifyjs = require('uglify-js');
    const { jsonData } = this.options;

    const { code } = uglifyjs.minify(`window.pageData=${JSON.stringify(jsonData)}`, {});

    compiler.hooks.compilation.tap('webpack-inject-script', compilation => {
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
        'webpack-inject-script',
        async (data, cb) => {
          let content = data.html.source();
          let title = content.match(/<(title)[^>]*>([\s\S]*?)<\/\1>/g)[0];
          title += `<script>${code}</script>\n`;
          content = content.replace(/<(title)[^>]*>([\s\S]*?)<\/\1>/g, title);
          data.html.source = () => content;
          cb();
        },
      );
    });
  }
}

module.exports = InjectScriptPlugin;
