/**
 * Created by Александр Поляков on 14.11.2016.
 */
'use strict';

var gulp = require('gulp'), //основной плагин gulp
    watch = require('gulp-watch'),   //расширение возможностей watch
    prefixer = require('gulp-autoprefixer'), //расставление автопрефиксов
    uglify = require('gulp-uglify'), //минификация js
    jshint = require("gulp-jshint"),  //отслеживание ошибкок в js
    sass = require('gulp-sass'), //препроцессор
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'), //sourcemaps
    rigger = require('gulp-rigger'),  //работа с инклюдами
    imagemin = require('gulp-imagemin'),  //минимизация изображений
    pngquant = require('imagemin-pngquant'),  //минимизация изображений
    rimraf = require('rimraf'),  //очистка
    plumber = require("gulp-plumber"),  //предохранитель для остановки гальпа
    rename = require("gulp-rename"),  //переименвоание файлов
    browserSync = require("browser-sync"),  //livereload
    reload = browserSync.reload;


// Пути


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/**.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};


// Сервер

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9088,
    logPrefix: "Frontend_Dog"
};

//  Собираем html  ( run: gulp html:build )

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})) //И перезагрузим наш сервер для обновлений
        .pipe(plumber());
});


//   Собираем скрипты ( run: gulp js:build )

    // проверка js на ошибки и вывод их в консоль
gulp.task('jshint:build', function() {
    return gulp.src(path.src.jshint) //выберем файлы по нужному пути
        .pipe(jshint())  //прогоним через jshint
        .pipe(plumber())
        .pipe(jshint.reporter('jshint-stylish')); //стилизуем вывод ошибок в консоль
});

    // билдинг яваскрипта
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к выходному файлу
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}))
        .pipe(plumber());
});


//    Собираем стили ( run: gulp style:build )

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .pipe(plumber());
});


//   Собираем картинки  ( run: gulp image:build )

gulp.task('image:build', function () {
    gulp.src(path.src.img)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true,
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}))
    .pipe(plumber());
});


//   Шрифты

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});


//   таск с именем «build», который будет запускать все

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


//   Следим за изменением файлов

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], ['jshint']);
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


//  Веб сервер (локальный веб-сервер)

gulp.task('webserver', function () {
    browserSync(config);
});


//   Очистка  ( run: gulp clean )

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


//   Запуск  ( run: gulp )

gulp.task('default', ['build', 'webserver', 'watch']);
