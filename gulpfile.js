var gulp = require('gulp');
const zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync')

const server = browserSync.create();

gulp.task('sass', function(){
    return gulp.src('src/style.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function(){
    return gulp.src(['src/js/plugins/*.js', 'src/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('reload', function(done){
    server.reload();
    done();
});

gulp.task('serve', function(done){
    server.init({
        server: {
            baseDir: './'
        }
    });
    done();
});

gulp.task('watch', function(){
    gulp.watch('src/*.scss',  gulp.series('sass', 'reload'));
    gulp.watch('src/js/**/*.js', gulp.series('js', 'reload'));
});


gulp.task('default', gulp.series('sass', 'js', 'serve', 'watch'));

gulp.task('package', function(){
    return gulp.src('./dist/**')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./bundle'))
});
