module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
          src: ['public/client/**/*.js'],
          dest: 'public/dist/script.js',
        },
    },

    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['concat'],
      },
      css: {
        files: ['css/**/*.css'],
        tasks: ['concat'],
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        files: [{
          src: 'public/dist/script.js',
          dest: 'public/dist/script.js'
        }],
      },
    },

    eslint: {
      target: [
        // Add list of files to lint here
       'Gruntfile.js', '!/node_modules/**/*.js'
      ]
    },

    cssmin: {
      target:{
        files: [{
          expand: true,
           src: ['public/style.css'],
          dest: 'public/dist/script.css',
        }]
      }
    },

     watch : {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },  
      css: {
        files: 'public/dist/script.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-build-control');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  //grunt.registerTask('default', ['concat', 'watch']);

  grunt.registerTask('build', [ 'concat', 'uglify' 
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here

  ]);


} ;
