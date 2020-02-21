// require('scully-plugin-contentful');
require('dotenv').config();

exports.config = {
  projectRoot: "./src",
  projectName: "scully-example-contentful",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
    '/article/:id': {
      // Type is mandatory
      type: 'json',
      /**
       * Every parameter in the route must exist here
       */
      config: {
        space: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
        host: 'https://cdn.contentful.com',
        environment: 'master',
        proxy: null
      }
    },
  }
};