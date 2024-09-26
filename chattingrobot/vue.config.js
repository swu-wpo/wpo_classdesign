const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}
// webpack.config.js

module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/ChattingRobot' : '/ChattingRobot',
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.resolve.alias
    .set("@", resolve("src"))
    .set("assets", resolve("src/assets"))
    .set("components", resolve("src/components"))
    .set("layout", resolve("src/layout"))
    .set("static", resolve("src/static"));

		//配置svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end();
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include
			.add(resolve('./src/icons')) //处理svg目录
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
    },
  //设置代理
  // devServer: {
  //   port: 8080,
  //   host: "0.0.0.0",
  //   https: false,
  //   open: true,
  //   openPage: "about",
  //   hot: true,
  //   disableHostCheck: true,
  //   proxy: {
  //     "/api": {
  //       target: "https://cdn.awenliang.cn",
  //       ws: true,
  //       changeOrigin: true
  //     },
  //     "/foo": {
  //       target: "https://cdn.awenliang.cn",
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
};
