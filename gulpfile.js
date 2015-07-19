var gulp = require('gulp');
var gutil = require('gulp-util');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var watch = require('gulp-notify');
var uglify= require('gulp-uglify');
var imagemin= require('gulp-imagemin');

gulp.task('vendormodules',function(){
  var vendorjs =[
    './bower_components/angular/angular.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/angular-aria/angular-aria.js',
    './bower_components/angular-animate/angular-animate.js',
    './bower_components/angular-material/angular-material.js',
    './bower_components/moment/moment.js'
  ];

  gulp.src(vendorjs,{base:'./bower_components/'}).pipe(uglify()).pipe(concat('vendorscripts.min.js')).pipe(gulp.dest('build/vendor/')).pipe(notify({
    message:"vendor scripts have been processed"
  }));
});

gulp.task('appmodules',function () {
  var appjs = [
    './app/app.js',
    './app/config.route.js',
    './app/shared/directives/*.js',
    './app/shared/services/*.js',
     './app/**/*.js'
  ];

  gulp.src(appjs,{base:'./bower_components/'}).pipe(concat('app.min.js')).pipe(gulp.dest('build/app/')).pipe(notify({
    message:"app scripts have been processed"
  }));
});

gulp.task('sitecss', function () {
    var vendorcss = [
    './bower_components/angular/angular-csp.css',
    './bower_components/font-awsome/css/font-awesome.css',
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './content/styles/*.css'
    ];
     gulp.src(vendorcss).pipe(minifyCSS()).pipe(concat('site.min.css'))
     .pipe(gulp.dest('build/vendor')).pipe(notify({
    message:"vendorcss has been processed"
  }));
});



gulp.task('watch',function(){

  gulp.watch('./app/**/*.js',function(){
    gulp.run('appmodules');
  });

gulp.watch('./content/styles/*.css',function(){
    gulp.run('sitecss');
  });
});


gulp.task('default', ['vendormodules', 'sitecss', 'appmodules' , 'watch']);
