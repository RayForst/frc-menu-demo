const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const path = require('path')
const argv = require('yargs').argv
const browserSync = require('browser-sync').create()

plugins.multipipe = require('multipipe')
plugins.pngquant = require('imagemin-pngquant')
plugins.reporter = require('postcss-reporter')
plugins.stylelint = require('stylelint')
plugins.syntax_scss = require('postcss-scss')
plugins.autopref = require('autoprefixer');

const CONFIG = {
  src: path.join(__dirname, 'app'),
  dest: path.join(__dirname, 'static'),
  isProd: typeof argv.env !== 'undefined' && argv.env === 'prod',
}

gulp.task('css', () =>
  require('./gulp-tasks/css')(gulp, plugins, {
    src: [CONFIG.src + '/**/*.scss'],
    dest: CONFIG.dest + '/css',
    isProd: CONFIG.isProd,
  }),
)

gulp.task('js', () =>
  require('./gulp-tasks/js')(gulp, plugins, {
    src: [CONFIG.src + '/*.js'],
    dest: CONFIG.dest + '/js',
    isProd: CONFIG.isProd,
    watch: argv.watch,
  }),
)

gulp.task('html', () =>
  require('./gulp-tasks/html')(gulp, plugins, {
    src: [
      CONFIG.src + '/pages/**/*.twig',
      '!' + CONFIG.src + '/pages/**/_*.twig', // exclude partials
    ],
    dest: CONFIG.dest + '/',
    images: CONFIG.dest,
    templateFolder: CONFIG.src + '',
    isProd: CONFIG.isProd,
  }),
)

gulp.task('images', () =>
  require('./gulp-tasks/images')(gulp, plugins, {
    src: CONFIG.src + '/**/*.{jpg,jpeg,png,svg,gif}',
    dest: CONFIG.dest + '/img',
  }),
)

gulp.task('video', () =>
  require('./gulp-tasks/video')(gulp, plugins, {
    src: CONFIG.src + '/assets/video/**/*.{mov,mp4,ogv,webm}',
    dest: CONFIG.dest + '/video',
  }),
)

gulp.task('fonts', () =>
  require('./gulp-tasks/fonts')(gulp, plugins, {
    src: CONFIG.src + '/**/*.{ttf,otf,woff,woff2}',
    dest: CONFIG.dest + '/fonts',
  }),
)

gulp.task('clean', () =>
  require('./gulp-tasks/clean')(gulp, plugins, {
    src: CONFIG.dest + '/*',
  }),
)

gulp.task('watch', function() {
  if (argv.watch) {
    gulp.watch(CONFIG.src + '/**/*.scss', gulp.series('css'))
    gulp.watch(CONFIG.src + '/**/*.twig', gulp.series('html'))
  }
})

gulp.task('serve', function() {
  browserSync.init({
    server: 'static',
  })

  browserSync.watch(CONFIG.src + '/**/*.*').on('change', browserSync.reload)
})

gulp.task(
  'default',
  gulp.series(
    'clean',
    'images',
    'fonts',
    'video',
    'css',
    'html',
    gulp.parallel('js', 'watch', 'serve'),
  ),
)

gulp.task('build', gulp.series('clean', 'images', 'fonts', 'video', 'css', 'html', 'js'))
