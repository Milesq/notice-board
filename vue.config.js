const stylelintPlugin = require('stylelint-webpack-plugin');
const {
  light: { primary: themeColor },
} = require('./src/colors.json');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new stylelintPlugin({
        files: ['src/**/*.{vue,scss}'],
        emitWarning: true,
      }),
    ],
  },
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'Announcements',
    themeColor,
  },
};
