const path = require('path')
function resolve (dir) { return path.join(__dirname, dir) }
module.exports = {
  // 多页面配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => {
    // 路径别名配置
    config.resolve.alias
      .set('@$', resolve('src'))
  },
  css: {
    loaderOptions: {
      // 给所有sass共享全局变量
      sass: {
        prependData: `@import "@/assets/css/color.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    port: 8080,
    allowedHosts: [
      'http://test.sdmanage.qibot-ai.com/'
      //   'http://192.168.0.154:9021/'
      //  'http://192.168.0.128:9021/'

    ],
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: false, // 热更新
    proxy: {
      "/": {
        target: "http://test.sdmanage.qibot-ai.com",
        // target: "http://192.168.0.154:9021",
        //  target: "192.168.0.128:9021",
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}