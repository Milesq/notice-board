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
    msTileColor: '#DC5252',
    manifestOptions: {
      background_color: '#609FDB',
    },
  },
};
