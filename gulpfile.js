var gulp = require('gulp');
var sync = require('gulp-npm-script-sync');
const zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
    return gulp.src('app/style.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function(){
    return gulp.src(['app/js/plugins/*.js', 'app/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    gulp.watch('app/*.scss',  gulp.series('sass'));
    gulp.watch('app/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('sass', 'js', 'watch'));

gulp.task('zip', function(){
    return gulp.src('./dist/**')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'))
});

sync(gulp);