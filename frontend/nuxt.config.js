// nuxt.config.js
module.exports = {
  mode: 'universal',
  head: {
    title: 'Vue Nuxt Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
  },
  build: {
    vendor: ['axios'],
    publicPath: '/_nuxt/'// <= add the path to the cached files
  },
  srcDir: './src',
  performance: {
    gzip: false,
  },
  router: {
    base: '/',
  },
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: [
      'styles/core.scss',
    ],
  },
  dev: false,
};
