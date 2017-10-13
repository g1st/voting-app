const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('compile', () => {
  gulp.src('./app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
