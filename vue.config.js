const stylelintPlugin = require('stylelint-webpack-plugin');
const { primary: themeColor } = require('./src/colors.json');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new stylelintPlugin({ files: ['src/**/*.{vue,scss}'], emitWarning: true })],
  },
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'Announcements',
    themeColor,
  },
};
