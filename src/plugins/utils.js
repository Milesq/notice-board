const parser = new DOMParser();

export default {
  /**
   *
   * @param {*} Vue
   */
  install(Vue) {
    const trimTo = 150;
    /**
     * @param {string} value
     */
    const limit = value => {
      const text = parser.parseFromString(value, 'text/html').body.innerText;

      return text.substr(0, trimTo) + (text.length > trimTo ? '...' : '');
    };
    Vue.filter('limit', limit);
  },
};
