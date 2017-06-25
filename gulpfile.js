// создание переменных
var gulp         = require( 'gulp' ),
    sass         = require( 'gulp-sass' ),
    browserSync  = require( 'browser-sync' ),
    concat       = require( 'gulp-concat' ),
    uglify       = require( 'gulp-uglifyjs' ),
    cssnano      = require( 'gulp-cssnano' ),
    rename       = require( 'gulp-rename' ),
    imagemin     = require( 'gulp-imagemin' ),
    pngquant     = require( 'imagemin-pngquant' ),
    cache        = require( 'gulp-cache' ),
    autoprefixer = require( 'gulp-autoprefixer' );


// преобразование sass в css
gulp.task( 'sass', function() {

    return gulp.src( 'app/sass/**/*.sass' )
        .pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
        .pipe( autoprefixer( ['last 4 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true} ) )
        .pipe( gulp.dest( 'app/css' ) )
        .pipe( browserSync.reload( {stream: true} ) )

} );


// перезагрузка страницы браузера
gulp.task( 'browser-sync', function() {

    browserSync( {

        server: {baseDir: 'app'},
        notify: false

    } );
} );


// наблюдение за изменениями
gulp.task( 'watch', ['browser-sync'], function() {

    gulp.watch( 'app/sass/**/*.sass', ['sass'] )
    gulp.watch( 'app/*.html', browserSync.reload )
    gulp.watch( 'app/js/**/*.js', browserSync.reload )

} );


// почистить кеш
gulp.task( 'clear', function () {

    return cache.clearAll();

} );


// таск по умолчанию
gulp.task( 'default', ['watch'] );


// оптимизация изображений
gulp.task( 'img', function() {

    return gulp.src( 'app/img/**/*' )
        .pipe( cache( imagemin( {
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()] } ) ) )
        .pipe( gulp.dest(' dist/img' ) );

} );


// сбор файлов в продакшен
gulp.task( 'build', ['img', 'sass'], function() {

    var buildCss =

    gulp.src( ['app/css/main.css', 'app/css/libs.min.css'] )
        .pipe( gulp.dest( 'dist/css' ) )

    var buildFonts = gulp.src( 'app/fonts/**/*' )
        .pipe( gulp.dest( 'dist/fonts' ) )

    var buildJs = gulp.src( 'app/js/**/*' )
        .pipe( gulp.dest( 'dist/js' ) )

    var buildHtml = gulp.src( 'app/*.html' )
        .pipe( gulp.dest( 'dist' ) );

} );
