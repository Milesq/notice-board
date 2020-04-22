const parser = new DOMParser();

export default {
  /**
   *
   * @param {*} Vue
   */
  install(Vue) {
    /**
     * @param {string} value
     */
    const limit = value => {
      const text = parser.parseFromString(value, 'text/html').body.innerText;

      return `${text.substr(0, 150)}...`;
    };
    Vue.filter('limit', limit);
  },
};
