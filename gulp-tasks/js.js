const webpackStream = require('webpack-stream'),
  webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function(gulp, plugins, options) {
  let webpackPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ]

  if (options.isProd) {
    webpackPlugins.push(
      new UglifyJsPlugin({
        sourceMap: false,
      }),
    )
  }

  return plugins
    .multipipe(
      gulp.src(options.src, {}),
      plugins.eslint(),
      plugins.webpack(
        {
          entry: {
            // Index
            main: __dirname + '/../app/main',
          },
          output: {
            publicPath: options.dest,
            filename: '[name].js',
          },
          watch: options.watch,
          devtool: !options.isProd ? 'cheap-module-inline-source-map' : '',
          module: {
            loaders: [
              {
                test: /\.js$/,
                exclude: [/vendors/, /(node_modules|bower_components)/],
                loaders: ['babel-loader?presets[]=es2015', 'eslint-loader'],
              },
            ],
          },
          plugins: webpackPlugins,
          watchOptions: {
            aggregateTimeout: 200,
            poll: true,
          },
        },
        webpack,
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
