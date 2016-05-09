var path = require('path')

var freemarker = require('gulp-freemarker');

var gulp = require('gulp');
var del = require('del');
var watchify = require('watchify');
var browserify = require('browserify');
var sources = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var browerSync = require('browser-sync');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var md5 = require('gulp-md5');

var jsmini = require('gulp-uglify');
var cssmini = require('gulp-clean-css');
var less = require('gulp-less');




var BASE_PATH = __dirname + '/';
var PAGES_PATH = 'WEB-INF/pages';
var OUT_PATH = 'output';


var config = {
    paths: {
        base: BASE_PATH,
        output: OUT_PATH,
        pages: PAGES_PATH,
        viewRoot:path.join(BASE_PATH, PAGES_PATH).replace(/\\/g, '/'),
        ftl: './' + PAGES_PATH + '/**/*.ftl',
        mock: './mock/**/*.json'
    }
}
/*

var _browerifyConfig = {
    entries: [''],
    debug: true
}

var browerifyOption = assign({}, watchify.args, _browerifyConfig);
var browser = watchify(browserify(browerifyOption));

browser.on('update', bundle);
browser.on('log',gutil.log);

gulp.task('bundle',bundle);

function bundle() {
    return browser.bundle() // 如果有错误发生，记录这些错误 
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(sources('bundle.js')) // 可选项，如果你不需要缓存文件内容，就删除 
        .pipe(buffer()) // 可选项，如果你不需要 sourcemaps，就删除 
        .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map // 在这里将变换操作加入管道 
        .pipe(sourcemaps.write('./')) // 写入 .map 文件 
        .pipe(gulp.dest(config.paths.output));
}
*/

gulp.task('clean-output', function (cb) {
    del([
        config.paths.output+'/*.html'
    ], cb)
})

gulp.task('clean-ftl', function (cb) {
    del([
        config.paths.output + '/**/*.HTML'
    ], cb)
})

gulp.task('praseFTL', function () {
    gulp.src(config.paths.mock)
        .pipe(changed(config.paths.output))
        .pipe(freemarker({
            viewRoot: config.paths.viewRoot,
            options: {}
        }))
        .pipe(gulp.dest(config.paths.output));
})

gulp.task('js',function () {
   gulp.src()
       .pipe()
})

gulp.task('watch', function () {
    gulp.watch(config.paths.ftl, ['praseFTL'])
})
gulp.task('server',function () {
    browerSync({
        port:9000,
        server:{
            baseDir:'output'
        }
    })
    gulp.watch(['*/**/*.html'],{cwd:'output'},browerSync.reload);
})

gulp.task('default', ['clean-output', 'watch','praseFTL','server']);
