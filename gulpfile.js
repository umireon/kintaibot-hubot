var gulp = require("gulp");
var mocha = require("gulp-mocha");
require("coffee-script/register");

var paths = {
  sources: ["src/*.coffee", "scripts/*.coffee"],
  tests: ["test/*.js"]
};

gulp.task("test", function() {
  return gulp.src(paths.tests)
    .pipe(mocha());
});

gulp.task("watch", function() {
  gulp.watch([paths.sources, paths.tests], ["test"]);
});
