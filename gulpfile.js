var gulp       = require('gulp'),
	notify     = require('gulp-notify'),
	cssmin     = require('gulp-cssmin'),
	sass       = require('gulp-sass'),
	useref     = require('gulp-useref'),
	jsonmin    = require('gulp-json-minify'),
	rename     = require('gulp-rename'),
	gulpif     = require('gulp-if'),
	uglify     = require('gulp-uglify'),
	cleancss   = require('gulp-clean-css'),
	minhtml    = require('gulp-minify-html'),
	ngtemplate = require('gulp-ng-template'),
	runseq     = require('run-sequence');


gulp.task('sass', function() {

	return gulp.src('./src/scss/*.scss')
	.pipe(sass({
		outputStyle: 'expanded',
		indentType:  'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'))
	.pipe(notify('** SASS OK! - <%= file.relative %>'));

});


gulp.task('json', function() {

	return gulp.src('./src/translations/*.json')
	.pipe(jsonmin())
	.pipe(gulp.dest('./dist/translations'))
	.pipe(notify('** JSON OK! - <%= file.relative %>'));

});


gulp.task('partials', function() {
	
	return gulp.src('src/partials/**/*.html')
	.pipe(minhtml({
		empty:  true,
		quotes: true
	}))
	.pipe(ngtemplate({
		moduleName: 'notesApp',
		filePath: 'js/templates.js',
		prefix: 'partials/'
	}))
	.pipe(gulp.dest('src'))
	.pipe(notify('** PARTIALS OK! - <%= file.relative %>'));

});


gulp.task('links', function () {

	return gulp.src('./src/*.html')
	.pipe(useref())
	.pipe(gulpif('*.js', uglify({ 
		mangle: false
	})))
	.pipe(gulpif('*.css', cleancss()))
	.pipe(gulp.dest('./dist'))
	.pipe(notify('** LINKS OK! - <%= file.relative %>'));

});


gulp.task('move', function () {

	return gulp.src([ 
		'src/fonts/**/*'
//		'src/partials/**/*'
	], { "base" : "src" })
	.pipe(gulp.dest('dist'))
	.pipe(notify('** MOVE OK! - <%= file.relative %>'));
	
});


gulp.task('css', function() {

	return gulp.src('./src/css/*.css')
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(notify('** CSS OK! - <%= file.relative %>'));

});


gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('build', function(cb) {
	runseq('partials', ['sass', 'json', 'links', 'move'], cb);
});
