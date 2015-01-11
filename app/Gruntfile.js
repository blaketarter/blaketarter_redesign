module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'nested',
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1'],
        remove: false
      },
      dist: {
        src: 'css/style.css',
      }
    },
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass', 'autoprefixer']);
  grunt.registerTask('default', ['build', 'watch']);
};
