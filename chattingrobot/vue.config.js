const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/ChattingRobot' : '/ChattingRobot',
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
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
};
