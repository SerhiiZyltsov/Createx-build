const { src, dest, series, watch, parallel } = require('gulp');

const sass = require('sass');
const gulpSass = require('gulp-sass');
const del = require('del');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const mainSass = gulpSass(sass);
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-imagemin');
const webp = require('gulp-webp');
// const typograf = require('gulp-typograf');
const zip = require('gulp-zip');


const clean = () => {
  return del(['app'])
}

const svgSprites = () => {
  return src('./src/img/svg/*.svg')
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('./app/img'))
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());

}

const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))

}


const scripts = () => {
  return src('./src/js/main.js')
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());

}


const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(uglify())
    .pipe(dest('./app/js'))

}

const htmlInclude = () => {
  return src('./src/**/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    // .pipe(typograf({
    //   locale: ['ru', 'en-US']
    // }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const images = () => {
  return src(['./src/img/**/**.{jpg,jpeg,png}', './src/img/**.svg'])
    .pipe(image([
      image.mozjpeg({
        quality: 80,
        progressive: true
      }),
      image.optipng({
        optimizationLevel: 2
      }),
    ]))
    .pipe(dest('./app/img'))
};

const webpImages = () => {
  return src(['./src/**/**.{jpg,jpeg,png}'])
    .pipe(webp())
    .pipe(dest('./app/'))
};

const htmlMinify = () => {
  return src('./app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./app'));
}

const zipFile = () => {
  return src('./app/**/*.*', {})
    .pipe(plumber(
      notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zip('archive-project.zip'))
    .pipe(dest('./app'));
}


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/partials/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/img/**/**.{jpg,jpeg,png,svg}', images);
  watch('./src/img/**/**.{jpg,jpeg,png}', webpImages);
  watch('./src/img/svg/**.svg', svgSprites);
}


exports.default = series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, watchFiles);

exports.build = series(clean, htmlInclude, scriptsBuild, stylesBuild, resources, images, webpImages, svgSprites, htmlMinify);

exports.zip = zipFile;





