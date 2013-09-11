'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/plugins/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: true,
          debugInfo: true
        },
        files: {
          'assets/css/main.min.css' : 'assets/scss/main.scss'
        }
      },
      dist: {
        options: {
          banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
          style: 'compressed',
          debugInfo: false,
          trace: false
        },
        files: {
          'assets/css/main.min.css' : 'assets/scss/main.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
      },
      dev: {
        options: {
          beautify: true,
        },
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap/transition.js',
            'assets/js/plugins/bootstrap/alert.js',
            'assets/js/plugins/bootstrap/button.js',
            'assets/js/plugins/bootstrap/carousel.js',
            'assets/js/plugins/bootstrap/collapse.js',
            'assets/js/plugins/bootstrap/dropdown.js',
            'assets/js/plugins/bootstrap/modal.js',
            'assets/js/plugins/bootstrap/tooltip.js',
            'assets/js/plugins/bootstrap/popover.js',
            'assets/js/plugins/bootstrap/scrollspy.js',
            'assets/js/plugins/bootstrap/tab.js',
            'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      },
      dist: {
        options: {
          report: 'gzip',
        },
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap/transition.js',
            'assets/js/plugins/bootstrap/alert.js',
            'assets/js/plugins/bootstrap/button.js',
            'assets/js/plugins/bootstrap/carousel.js',
            'assets/js/plugins/bootstrap/collapse.js',
            'assets/js/plugins/bootstrap/dropdown.js',
            'assets/js/plugins/bootstrap/modal.js',
            'assets/js/plugins/bootstrap/tooltip.js',
            'assets/js/plugins/bootstrap/popover.js',
            'assets/js/plugins/bootstrap/scrollspy.js',
            'assets/js/plugins/bootstrap/tab.js',
            'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    removelogging: {
      dist: {
        src: 'js/scripts.min.js',
        dest: 'js/scripts.min.js'
      }
    },
    svgmin: {                                           // Task
      options: {                                      // Configuration that will be passed directly to SVGO
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {                                         // Target
        files: [{                                  // Dictionary of files
          expand: true,     // Enable dynamic expansion.
          cwd: 'assets/img/src',   // Src matches are relative to this path.
          src: ['**/*.svg'],// Actual pattern(s) to match.
          dest: 'assets/img/',     // Destination path prefix.
          ext: '.svg'       // Dest filepaths will have this extension.
        }]
      }
    },
    smushit: {
      dist: {
        files: [{                                  // Dictionary of files
          expand: true,     // Enable dynamic expansion.
          src: ['assets/img/src/**/*.png', 'assets/img/src/**/*.jpg'], // Actual pattern(s) to match.
          dest: 'assets/img'   // Destination path prefix.
        }]
      }
    },
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
    watch: {
      sass: {
        files: [
          'assets/scss/*.scss',
          'assets/scss/bootstrap/*.scss',
          'assets/scss/custom/*.scss'
        ],
        tasks: ['sass:dev', 'version'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: [
          '*.php',
          'templates/*.php',
          '*.html'
        ],
        options: {
          livereload: true,
        }
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify:dev', 'version']
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wp-version');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-smushit');

  // Register tasks
  grunt.registerTask('default', [
    'watch'
  ]);
  grunt.registerTask('dist', [
    'jshint',
    'sass:dist',
    'uglify:dist',
    'removelogging',
    'svgmin',
    'smushit'
  ]);
  grunt.registerTask('img', [
    'svgmin',
    'smushit'
  ]);
  grunt.registerTask('dev', [
    'watch',
  ]);
};
