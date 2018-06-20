module.exports = function(gulp, plugins, options) {
  // Stylelint config rules
  const path = require('path')

  var processors = [
    plugins.stylelint(),
    plugins.reporter({
      clearMessages: true,
      throwError: true,
    }),
  ]

  return plugins
    .multipipe(
      gulp.src(options.src, {}),
      plugins.rename({ dirname: '' }),
      plugins.if(!options.isProd, plugins.sourcemaps.init()),
      plugins.sass({
        includePaths: [
          'node_modules/reset-css/',
          'node_modules/normalize-scss/sass/',
          'node_modules/',
        ],
      }),
      plugins.if(!options.isProd, plugins.sourcemaps.write()),
      plugins.if(options.isProd, plugins.autoprefixer(['> 1%'], { cascade: false })),
      // plugins.postcss(processors, { syntax: plugins.syntax_scss }),
      plugins.if(
        options.isProd,
        plugins.cssnano({ zindex: false, minifyFontValues: false, discardUnused: false }),
      ),
      gulp.dest(options.dest),
    )
    .on(
      'error',
      plugins.notify.onError(function(err) {
        return {
          title: 'CSS',
          message: err.message,
        }
      }),
    )
}
