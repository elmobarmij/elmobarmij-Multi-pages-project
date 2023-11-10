var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  compress = require("gulp-compress"),
  sass = require("gulp-sass")(require("sass"));
pug = require("gulp-pug");
sourcemaps = require("gulp-sourcemaps");
uglify = require("gulp-uglify");
zip = require("gulp-zip");
// ftp = require("vinyl-ftp");

// HTML Task
gulp.task("index", async function () {
  return gulp
    .src("project/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("html", async function () {
  return gulp
    .src(["project/*.pug", "!project/index.pug"])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist/pages"));
});

// Css Task
gulp.task("css", async function () {
  return gulp
    .src("project/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"));
});

// JS Task
gulp.task("js", async function () {
  return gulp
    .src("project/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// Compress files
gulp.task("compress", async function () {
  return gulp.src("dist/**/*.*").pipe(zip("website.zip")).pipe(gulp.dest("."));
});

// Deploy design with ftp
// gulp.task("deploy", function () {
//   var conn = ftp.create({
//     host: "elmobarmij.net",
//     user: "",
//     password: "",
//     parallel: 10,
//   });

//   return gulp
//     .src(["dist/**/*.*"], { base: ".", buffer: false })
//     .pipe(conn.newer("/public_html")) // only upload newer files
//     .pipe(conn.dest("/public_html"))
//     .pipe(livereload());
// });

// Watch Tasks
gulp.task("watch", async function () {
  gulp.watch("project/index.pug", gulp.series("index"));
  gulp.watch("project/*.pug", gulp.series("html"));
  gulp.watch("project/css/**/*.scss", gulp.series("css"));
  gulp.watch("project/js/*.js", gulp.series("js"));
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // gulp.watch("dist/**/*.*", gulp.series("deploy"));
});

// Default TASK
gulp.task("default", gulp.series("watch"));
