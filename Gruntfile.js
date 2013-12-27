/*
To set up run: 
npm install

Then to start compiling sass use:
grunt watch

*/


/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ["js/*.js"]
    }, 
    uglify: {
      my_target: {
        files: {
          "js/main.js": ["js/main.min.js"]
        }
      }
    },
    sass: {
        dist: { 
            options: {
                style: 'compressed'
            },
            files: {
                'css/main.css' : 'css/sass/**/*.scss'
            }
        }
    },
    watch: {
        all: {
          options: { livereload: true },
          files: ['index.html','css/sass/**/*.scss','js/*.js']
        },
        sass: {
            options: {
              livereload: true
            },
            files: ['css/sass/**/*.scss'],
            tasks: ['sass'],
        },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify']);

};
