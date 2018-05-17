var gulp = require('gulp'),
exec = require('child_process').exec,
clean = require('gulp-clean');

gulp.task('build', ['clean', 'move'], function (done) {
    // exec('npm i ./dist', function (err, stdOut, stdErr) {
    //     console.log(stdOut);
    //     if (err){
    //         done(err);
    //     } else {
    //         done();
    //     }
    // });
    done();
});

gulp.task('move', ['compile'], function() {
    gulp.src('./node_modules/socket.io-client/dist/socket.io.js')
        .pipe(gulp.dest('./dist/tests'));
    // gulp.src('./src/package.json')
    //     .pipe(gulp.dest('./dist'));
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
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