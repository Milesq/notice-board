const stylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new stylelintPlugin({ files: ['src/**/*.{vue,scss}'], emitWarning: true })],
  },
  transpileDependencies: ['vuetify'],
};
