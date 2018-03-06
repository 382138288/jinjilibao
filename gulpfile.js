var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var assetRev = require('gulp-asset-rev');
var compass = require('gulp-compass');
var path = {
    appPath: 'src/',
    devPath: 'dev/',
    prodPath: 'dist/'
};

gulp.task('lib', function () {
    gulp.src(path.appPath + 'bower_components/**/*')
        // .pipe(gulp.dest(path.devPath + 'bower_components'))
        .pipe(gulp.dest(path.prodPath + 'bower_components'))
})
gulp.task('libs', function () {
    gulp.src(path.appPath + 'libs/**/*')
        // .pipe(gulp.dest(path.devPath + 'libs'))
        .pipe(gulp.dest(path.prodPath + 'libs'))
})
gulp.task('datas', function () {
    gulp.src(path.appPath + 'data/**/*')
        // .pipe(gulp.dest(path.devPath + 'libs'))
        .pipe(gulp.dest(path.prodPath + 'data'))
})
var htmlOptions = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: false, //压缩HTML
    collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: false, //压缩页面JS
    minifyCSS: false //压缩页面CSS
};

// js文件改动时
gulp.task('html-js', ['js'], function () {
    gulp.src([path.appPath + 'index.html'])
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(htmlmin(htmlOptions))
        // .pipe(gulp.dest(path.devPath))
        .pipe(gulp.dest(path.prodPath))
})
// scss文件改动时
gulp.task('html-sass', ['sass'], function () {
    gulp.src([path.appPath + 'index.html'])
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(htmlmin(htmlOptions))
        // .pipe(gulp.dest(path.devPath))
        .pipe(gulp.dest(path.prodPath))
})
// 图片改动时需先处理image，再处理sass，最后html
gulp.task('html-image', ['sass-image'], function () {
    gulp.src([path.appPath + '**/*.html', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(htmlmin(htmlOptions))
        // .pipe(gulp.dest(path.devPath))
        .pipe(gulp.dest(path.prodPath))
})
// 首次启动时需先处理image，再处理sass，最后html
gulp.task('html-init', ['js', 'sass-image'], function () {
    gulp.src([path.appPath + '**/*.html', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(htmlmin(htmlOptions))
        // .pipe(gulp.dest(path.devPath))
        .pipe(gulp.dest(path.prodPath))
})

gulp.task('html', function () {
    gulp.src([path.appPath + '**/*.html', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(htmlmin(htmlOptions))
        // .pipe(gulp.dest(path.devPath))
        .pipe(gulp.dest(path.prodPath))
})
gulp.task('js', function () {
    gulp.src([path.appPath + '**/*.js', '!' + path.appPath + 'main.js', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.appPath))
        .pipe(uglify({
            mangle: false //类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(gulp.dest(path.prodPath))
})
gulp.task('sass', function () {
    gulp.src([path.appPath + '**/*.scss', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        // .pipe(sass().on('error', sass.logError))
        .pipe(compass({
            config_file: './config.rb',
            css: './css',
            sass: './src'
        }))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(gulp.dest(path.appPath + 'css'))
        .pipe(cleanCss({
            keepSpecialComments: '*'
        }))
        // .pipe(gulp.dest(path.devPath + 'css'))
        .pipe(gulp.dest(path.prodPath + 'css'))
})
gulp.task('sass-image', ['image'], function () {
    gulp.src([path.appPath + '**/*.scss', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        // .pipe(sass().on('error', sass.logError))
        .pipe(compass({
            config_file: './config.rb',
            css: './css',
            sass: './src'
        }))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(gulp.dest(path.appPath + 'css'))
        .pipe(cleanCss({
            keepSpecialComments: '*'
        }))
        // .pipe(gulp.dest(path.devPath + 'css'))
        .pipe(gulp.dest(path.prodPath + 'css'))
})
gulp.task('image', function () {
    gulp.src([path.appPath + 'images/**/*', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        // .pipe(gulp.dest(path.devPath + 'images'))
        .pipe(gulp.dest(path.prodPath + 'images'))
})
// compass
gulp.task('compass', function () {
    gulp.src([path.appPath + '/views/**/*.scss', '!' + path.appPath + 'bower_components/**/*', '!' + path.appPath + 'libs/**/*'])
        .pipe(compass({
            config_file: './config.rb',
            css: './css',
            sass: './src/views'
        }))
        // .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(assetRev({
            verConnecter: '?v=',
            rootPath: 'src'
        }))
        .pipe(gulp.dest(path.appPath + 'css'))
        .pipe(cleanCss({
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest(path.prodPath + 'css'))

    // gulp.src('./src/views/**/*.scss')
    // .pipe(compass({
    //   config_file: './config.rb',
    //   css: './src/css',
    //   sass: './src/views'
    // }))
    // .pipe(concat('main.css'))
    // .pipe(gulp.dest(path.appPath + 'css'))

});

gulp.task('default', ['lib', 'libs', 'html-init','datas'], function () {
    gulp.watch(path.appPath + '/**/*.html', ['html']);
    gulp.watch(path.appPath + '/**/*.js', ['html-js']);
    gulp.watch(path.appPath + '/**/*.scss', ['html-sass']);
    gulp.watch(path.appPath + 'images/**/*', ['html-image']);
    gulp.watch(path.appPath + 'bower_components/**/*', ['lib']);
    gulp.watch(path.appPath + 'libs/**/*', ['libs']);
})