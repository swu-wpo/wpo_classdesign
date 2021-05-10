const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}
// webpack.config.js

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
		rules: [
      // SASS has different line endings than SCSS
      // and cannot use semicolons in the markup
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
           
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
};
