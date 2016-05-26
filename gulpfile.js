var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin');

gulp.task('jshint', function() {
  return gulp.src('app/javascript/**/*.js')
    		.pipe(jshint())
    		.pipe(jshint.reporter('jshint-stylish'))
    		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/javascript/**/*.js', ['jshint']);
  gulp.watch('app/*.html', ['copyHtml']);
  gulp.watch('app/scss/*.scss', ['sass']);
});

gulp.task('serve',function() {
    browserSync.init({
        server: "./public"
    });

    gulp.watch("public/**/*.*").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());


});

gulp.task('imagemin', function() {
	gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('app/*.html')
  	.pipe(gulp.dest('public'));

  
});

gulp.task('copyRequiredJs', function() {
  // copy any html files in source/ to public/
	gulp.src('node_modules/angular/angular.js')
  	.pipe(gulp.dest('public/js/node_modules/angular'));

	gulp.src('node_modules/angular-csv-import/dist/angular-csv-import.js')
  		.pipe(gulp.dest('public/js/node_modules/angular-csv-import'));

  	gulp.src('app/data.csv')
  		.pipe(gulp.dest('public/data/'));
});

gulp.task('build', ['copyHtml', 'jshint', 'copyRequiredJs', 'sass', 'imagemin']);

gulp.task('clean', function () {
  return gulp.src('public', {read: false})
    .pipe(clean());
});

gulp.task('default', ['serve', 'watch']);
