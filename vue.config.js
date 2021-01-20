module.exports = {
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "0.0.0.0",
    port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: '' // 配置跨域处理,只有一个代理
    // 配置多个代理
  },
  publicPath: './'
};