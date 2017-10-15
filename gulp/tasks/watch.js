const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  watch('./app/**/*.js', () => {
    gulp.start('compile');
  });

  watch('./app/assets/styles/**/*.css', () => {
    gulp.start('styles');
  });

  watch('./app/assets/scripts/**/*.js', () => {
    gulp.start('scripts');
  });
});

// gulp.task('compileJS', ['compile']);

// gulp.task('styles');
