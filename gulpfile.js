var gulp = require('gulp');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var path = require('path');
var rename = require('gulp-rename');

var config = {
    build: 'dist',
    src: 'src',
};

config.jsSrc = [ 
    path.join( config.src, '/**/_module.js' ),
    path.join( config.src, '/**/*.js' )
];

// tasks
gulp.task( 'default', js );


// processes all js files
function js ()
{
    return gulp.src( config.jsSrc )
        .pipe(plumber())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe( babel({
            presets: ['es2015']
        }))
        .pipe( concat('ngsmartsubmit.js') )
        .pipe( gulp.dest( config.build ) )
        .pipe( uglify() )
        .pipe(rename({ suffix: '.min' }))
        .pipe( gulp.dest( config.build ) );
}
