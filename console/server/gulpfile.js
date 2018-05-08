var gulp = require('gulp'),
exec = require('child_process').exec,
clean = require('gulp-clean');

gulp.task('build', ['clean', 'compile'], function () {    
    return gulp.src('./src/tests/*.json')
        .pipe(gulp.dest('./dist/tests'));
});

gulp.task('compile', function (done) {
    exec('tsc -p ./src', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err){
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('clean', function() {
    return gulp.src('./dist').pipe(clean());
});