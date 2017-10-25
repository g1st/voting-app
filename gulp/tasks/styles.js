const gulp = require('gulp');
const postcss = require('gulp-postcss');
const nested = require('postcss-nested');
const cssimport = require('postcss-import');
const autoprefixer = require('autoprefixer');

gulp.task('styles', () => {
  gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssimport, nested, autoprefixer]))
    .on('error', (errorInfo) => {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});
