let path = require('path')
let glob = require('glob-all')
let { mix } = require('laravel-mix')
let resourcePath = 'resources/assets/'
let PurgecssPlugin = require('purgecss-webpack-plugin')

mix
  .js(resourcePath + 'js/front/vue/app.js', 'public/js/front_vue.js')
  .js(resourcePath + 'js/front/php/app.js', 'public/js/front_php.js')
  .js(resourcePath + 'js/admin/vue/app.js', 'public/js/admin_vue.js')
  .js(resourcePath + 'js/admin/php/app.js', 'public/js/admin_php.js')
  .js(resourcePath + 'js/admin/php/editor/theme.js', 'public/js/tinymce/themes/kcms/theme.js')
  .sass(resourcePath + 'css/auth/auth.sass', 'public/css/auth.css')
  .sass(resourcePath + 'css/admin/bs.scss', 'public/css/bs.css')
  .sass(resourcePath + 'sass/skin.sass', 'public/js/tinymce/skins/kcms/skin.css')
  .minify('public/js/tinymce/skins/kcms/skin.css', 'public/js/tinymce/skins/kcms/skin.min.css')
  .postCss(resourcePath + 'css/front/front.css', 'public/css/front.css')
  .postCss(resourcePath + 'css/admin/admin.css', 'public/css/admin1.css')
  .styles(['public/css/admin1.css', 'public/css/bs.css'], 'public/css/admin.css')

  .options({
    autoprefixer: false,
    postCss: require('./postcss.config').plugins,
    processCssUrls: false
  })
  .webpackConfig(() => {
    const config = {}
    config.devtool = 'source-map'
    config.node = {
      fs: 'empty'
    }

    config.output = {
      publicPath: '/',
      chunkFilename: 'js/[name].js'
    }

    if (mix.inProduction()) {
      config.plugins = [
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, 'app/**/*.php'),
            path.join(__dirname, 'resources/views/**/*.blade.php'),
            path.join(__dirname, 'resources/assets/js/**/*.vue'),
            path.join(__dirname, 'resources/assets/js/**/*.js')
          ]),
          whitelistPatterns: [
            /fa-/
          ],
          extractors: [
            {
              extractor: class {
                static extract (content) {
                  return content.match(/[A-z0-9-:/]+/g) || []
                }
              },
              extensions: ['html', 'js', 'php', 'scss', 'sass', 'vue']
            }
          ]
        })
      ]
    }

    return config
  })

if (mix.inProduction()) {
  mix.version()
}
