const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  watch('./app/**/*.js', () => {
    gulp.start('compile');
  });

  watch('./app/assets/styles/**/*.css', () => {
    gulp.start('styles');
  });
});

// gulp.task('compileJS', ['compile']);

// gulp.task('styles');
