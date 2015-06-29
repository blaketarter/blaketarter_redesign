'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: 'src',
        dist: 'dist',
        sass: {
            'dist': {
                'options': {
                    'style': 'compressed',
                    'quiet': false,
                    'compass': false
                },
                'files': { '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss' }
            }
        },
        autoprefixer: {
            'options': {
                'browsers': [
                    '> 1%',
                    'last 2 versions',
                    'ie 8',
                    'ie 9',
                    'Firefox ESR',
                    'Opera 12.1'
                ],
                'remove': false
            },
            'dist': { 'src': '<%= dist %>/css/styles.css' }
        },
        criticalcss: {
          custom: {
            options: {
              url: 'http://blaketarter_redesign.dev/dist/',
              width: 3000,
              height: 2000,
              outputfile: '<%= dist %>/css/critical.styles.css',
              filename: '<%= dist %>/css/styles.css',
              buffer: 800 * 1024,
              ignoreConsole: false
            }
          }
        },
        jade: {
            'compile': {
                'options': {
                    'pretty': true,
                    'data': { 'debug': false }
                },
                'files': [{
                        'expand': true,
                        'cwd': '<%= src %>/',
                        'src': [
                            '*.jade',
                            '!_*.jade'
                        ],
                        'ext': '.html',
                        'dest': '<%= dist %>/'
                    }]
            }
        },
        jshint: {
            'options': { 'jshintrc': '.jshintrc' },
            'all': [
                'Gruntfile.js',
                '<%= src %>/js/**/*.js'
            ]
        },
        copy: {
            'dist': {
                'files': [{
                        'expand': true,
                        'flatten': true,
                        'cwd': './',
                        'src': [
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/modernizer/modernizr.js',
                            'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.js',
                            'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.css',
                            'bower_components/foundation/js/foundation.min.js',
                            'bower_components/html5shiv/dist/html5shiv.min.js',
                            'bower_components/picturefill/dist/picturefill.min.js'
                        ],
                        'dest': '<%= dist %>/vendor/'
                    }]
            }
        },
        imagemin: {
            'target': {
                'files': [{
                        'expand': true,
                        'cwd': '<%= src %>/images/',
                        'src': ['**/*.{jpg,gif,svg,jpeg,png}'],
                        'dest': '<%= dist %>/images/'
                    }]
            }
        },
        uglify: {
            'options': {
                'preserveComments': 'some',
                'mangle': false
            },
            'dist': { 'files': { '<%= dist %>/js/scripts.js': ['<%= src %>/js/scripts.js'] } }
        },
        watch: {
            'grunt': {
                'files': ['Gruntfile.js'],
                'tasks': [
                    'sass',
                    'jshint'
                ]
            },
            'sass': {
                'files': '<%= src %>/scss/**/*.scss',
                'tasks': [
                    'sass',
                    'autoprefixer',
                    'criticalcss'
                ]
            },
            'jade': {
                'files': '<%= src %>/**/*.jade',
                'tasks': ['jade']
            },
            'js': {
                'files': '<%= src %>/js/**/*.js',
                'tasks': [
                    'jshint',
                    'uglify'
                ]
            }
        }
    });
    grunt.registerTask('default', [
        'jade',
        'sass',
        'autoprefixer',
        'criticalcss',
        'imagemin',
        'jshint',
        'uglify',
        'copy',
        'watch'
    ]);
};
