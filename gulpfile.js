var
	gulp = require("gulp"),
	noty = require("gulp-notify"),
	pref = require('gulp-autoprefixer'),
	styl = require("gulp-stylus"),
	jade = require("gulp-jade"),
	plum = require("gulp-plumber");

var
	style_folder 	= 'dev/style/',
	js_folder 		= 'dev/js/',
	stylus_folder 	= 'src/stylus/',
	jade_folder 	= 'src/jade/';

gulp.task('jade_run', function() {
	
	var YOUR_LOCALS = {};

	gulp.src(jade_folder + '*.jade')
		.pipe( plum() )
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe( gulp.dest('dev/') );
		
});

gulp.task('stylus', function () {
  gulp.src(stylus_folder + 'main.styl')
    .pipe(styl())
    .pipe(gulp.dest(style_folder));
});


gulp.task('watch', function() {

	gulp.watch( 'src/stylus/**/*.styl', ['stylus']   );
	gulp.watch(   'src/jade/**/*.jade', ['jade_run'] );

});

gulp.task('default', ['stylus','jade_run','watch']);