var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var htmlreplace = require('gulp-html-replace');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var streamify = require('streamify');
 
var path = {
  HTML: 'src/index.html',
  ALL: ['src/*.js', 'src/index.html', 'src/css/**/*.css'],
  DEMO: 'list.json',
  JS: ['src/*.js'],
  CSS: ['src/css/**/*.css'],
  ENTRY_POINT: 'src/index.js',
  BUNDLE: 'bundle.js',
  MINIFIED_OUT: 'build.min.js',
  DEST: 'dist',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
};

/** DEV TASKS **/
gulp.task('copy', function(){
    gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
    gulp.src('src/jquery.1.12.1.min.js')
    .pipe(gulp.dest(path.DEST));

});


gulp.task('css', function () {
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST_SRC+'/css/'));
});


gulp.task('watch', function(){
    gulp.watch(path.HTML, ['copy']);
    gulp.watch(path.CSS, ['css']);
    gulp.watch(path.DEMO, ['demo']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    return watcher.on('update', function() {
        watcher.bundle()
        .pipe(source(path.BUNDLE))
        .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
    })
    .bundle()
    .pipe(source(path.BUNDLE))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('bundle', function(){
    var bundler = browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    bundler.bundle()
    .pipe(source(path.BUNDLE))
    .pipe(gulp.dest(path.DEST_SRC));
});
/** -- END DEV TASKS **/


/** PROD TASKS **/
gulp.task('build', function(){
    gulp.src('src/jquery-1.12.1.min.js')
    .pipe(gulp.dest(path.DEST));

    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_BUILD));

    gulp.src(path.CSS)
    .pipe(concat('main.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest(path.DEST_BUILD+'/css'))
});

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
    .pipe(htmlreplace({
        'js': 'build/' + path.MINIFIED_OUT,
        'css': 'build/css/main.css'
    }))
    .pipe(gulp.dest(path.DEST));
});
/** - END PROD TASKS **/


gulp.task('demo', function(){
    gulp.src('list.json')
    .pipe(gulp.dest(path.DEST));
});

// Just running the two tasks
gulp.task('default', ['copy', 'watch']);

gulp.task('prod', ['replaceHTML', 'build']);