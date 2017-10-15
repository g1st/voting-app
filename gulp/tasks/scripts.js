const gulp = require('gulp');

gulp.task('scripts', () => {
  gulp.src('./app/assets/scripts/**/*.js')
    .pipe(gulp.dest('./app/temp/scripts'));
});
