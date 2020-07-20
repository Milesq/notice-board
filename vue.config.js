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
    name: 'Notice Board',
    themeColor,
    msTileColor: '#DC5252',
    manifestOptions: {
      background_color: '#609FDB',
      gcm_sender_id: process.env.VUE_APP_gcm_sender_id,
    },
    workboxOptions: {
      exclude: [/_redirects/],
      skipWaiting: true,
    },
  },
};
