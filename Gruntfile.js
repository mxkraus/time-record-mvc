module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
          spawn: false,
          debounceDelay: 250,
      },
       sass: {
         files: [
           'view/assets/sass/**/*.scss'
         ],
         tasks: ['sass']
       },
    },

    sass: {                              // Task

        dist: {                            // Target
            files: {                         // Dictionary of files
                'view/assets/css/styles.css' : 'view/assets/sass/styles.scss',       // 'destination': 'source'
            }
        }
    },


  });

  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', [ 'sass', 'watch'] );

};