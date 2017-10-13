const gulp = require('gulp');
const del = require('del');

gulp.task('deleteDistFolder', () => {
  del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
  const pathsToCopy = [
    './app/**',
    './app/**/*',
    '!./app/**/*.js'];

  gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'compile', 'copyGeneralFiles']);
