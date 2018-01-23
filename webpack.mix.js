let path = require('path');
let glob = require('glob-all');
let { mix } = require('laravel-mix');
let resourcePath = 'resources/assets/';
let PurgecssPlugin = require('purgecss-webpack-plugin');

mix
  .js(resourcePath + 'js/front/vue/app.js', 'public/js/front_vue.js')
  .js(resourcePath + 'js/front/php/app.js', 'public/js/front_php.js')
  .js(resourcePath + 'js/admin/vue/app.js', 'public/js/admin_vue.js')
  .js(resourcePath + 'js/admin/php/app.js', 'public/js/admin_php.js')
  .postCss(resourcePath + 'css/front/front.css', 'public/css/front.css')
  .postCss(resourcePath + 'css/admin/admin.css', 'public/css/admin1.css')
  .sass(resourcePath + 'css/admin/bs.scss', 'public/css/bs.css')
  .styles(['public/css/admin1.css', 'public/css/bs.css'],  'public/css/admin.css')

  .options({
    autoprefixer: false,
    postCss: require('./postcss.config').plugins,
    processCssUrls: false,
  })
  .webpackConfig(() => {
    const config = {};
    config.devtool = 'source-map';
    config.node = {
      fs: "empty"
    }

    config.output = {
      // The public path needs to be set to the root of the site so
      // Webpack can locate chunks at runtime.
      publicPath: '/',

      // We'll place all chunks in the `js` folder by default so we don't
      // need to worry about ignoring them in our version control system.
      chunkFilename: 'js/[name].js',
    };

    if (mix.inProduction()) {
      config.plugins = [
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, 'app/**/*.php'),
            path.join(__dirname, 'resources/views/**/*.blade.php'),
            path.join(__dirname, 'resources/assets/js/**/*.vue'),
            path.join(__dirname, 'resources/assets/js/**/*.js'),
          ]),
          whitelistPatterns: [
            /fa-/, // FontAwesome icon font selectors
            /re-/, // Redactor icon font selectors
          ],
          extractors: [
            {
              extractor: class {
                static extract(content) {
                  return content.match(/[A-z0-9-:\/]+/g) || [];
                }
              },
              extensions: ['html', 'js', 'php', 'scss', 'vue'],
            },
          ],
        }),
      ];
    }

    return config;
  });

if (mix.inProduction()) {
  mix.version();
}
