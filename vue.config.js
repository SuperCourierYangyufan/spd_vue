module.exports = {
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
    devServer:{
      port: 8080,
      proxy: {
        '/spd':{
            target: 'http://localhost:8081', // 代理目标的基础路径
            changeOrigin: true, // 支持跨域
            pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                '^/spd': ''
            }
        }
      },
    },
}