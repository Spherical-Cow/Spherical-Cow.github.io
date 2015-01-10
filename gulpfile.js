var gulp = require('gulp');

var plug = require('gulp-load-plugins')();

var bsync = require('browser-sync');
var plato = require('plato');

var env  = plug.util.env;
var log  = plug.util.log;
var port = process.env.PORT || 7203;

var path = require('./gulp.conf.json');


gulp.task('watch', function() {
  gulp.watch(path.html, ['html']).on('change', logChange);
  gulp.watch(path.js,   ['js']  ).on('change', logChange);
  gulp.watch(path.sass, ['sass']).on('change', logChange);

  function logChange(event) {
    log('*** File ' + event.path + ' was ' + event.type + ' running tasks...');
  }
});


gulp.task('html', function() {
  gulp.src(path.html)
    .pipe(bsync.reload({stream:true}));
});


gulp.task('js', function() {
  gulp.src(path.js)
    .pipe(bsync.reload({stream:true}));
});


gulp.task('sass', function() {
  gulp.src(path.sass)
    .pipe(plug.sass().on('error', log))
    .pipe(gulp.dest('root/'))
    .pipe(bsync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  bsync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('serve', ['html', 'js', 'sass', 'browser-sync', 'watch']);
