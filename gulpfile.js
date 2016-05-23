var gulp = require('gulp'),
	//webserver = require('gulp-webserver');
	browserSync = require('browser-sync').create(),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	clean = require('gulp-clean');



gulp.task('jshint', function() {
  return gulp.src('app/javascript/**/*.js')
    		.pipe(jshint())
    		.pipe(jshint.reporter('jshint-stylish'))
    		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/javascript/**/*.js', ['jshint']);
  gulp.watch('app/*.html', ['copyHtml']);
  //gulp.watch('app/*.html', ['copyHtml']).on('change', browserSync.reload);
  
  //browserSync.reload();
});

// Static Server + watching scss/html files
gulp.task('serve',function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("public/**/*.*").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());


});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('app/*.html')
  	.pipe(gulp.dest('public'));

  
});

gulp.task('copyRequiredJs', function() {
  // copy any html files in source/ to public/
  return gulp.src('node_modules/angular/angular.js')
  	.pipe(gulp.dest('public/js/node_modules/angular'));
});

gulp.task('build', ['copyHtml', 'jshint', 'copyRequiredJs']);

gulp.task('clean', function () {
  return gulp.src('public', {read: false})
    .pipe(clean());
});

gulp.task('default', ['serve', 'watch']);
