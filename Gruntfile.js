var path = require('path');
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            apps: {
                cmd: [
                    'php build/apps.php **/app.json'
                ].join('&&')
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            css: {
                src: '<%= app_dir %>/css/default.cache.css',
                dest: '<%= app_dir %>/css/default.cache.css'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%= app_dir %>/js/default.cache.js': ['<%= app_dir %>/js/default.cache.js']
                }
            }
        },
        'json-replace': {
            options: {
                space: "\t",
                replace: {
                    'assets': {
                        'css': [
                            'apps/<%= app_dir %>/css/default.cache.css'
                        ]
                    },
                    'assets': {
                        'js': [
                            'apps/<%= app_dir %>/js/default.cache.js'
                        ]
                    }
                }
            },
            'main': {
                files: [{
                    src: '<%= app_dir %>/app.json',
                    dest: '<%= app_dir %>/app.json'
                }]
            }
        },
        zip: {
            main: {
                src: '<%= app_dir %>/**/*',
                dest: '<%= app_dir %>-v<%= app_version %>.zip'
            }
        },
        multi: {
            main: {
                options: {
                    vars: {
                        app_dir: function() {
                            var apps = grunt.file.readJSON('apps.json');
                            var app_dirs = [];
                            var concat = {};
                            for (var app in apps) {
                                if (grunt.config.get('app') == 'all' || grunt.config.get('app') == app) {
                                    app_dirs.push(app);
                                }
                            }
                            return app_dirs;
                        },
                        app_version: function() {
                            var apps = grunt.file.readJSON('apps.json');
                            var app_versions = [];
                            for (var app in apps) {
                                if (grunt.config.get('app') == 'all' || grunt.config.get('app') == app) {
                                    app_versions.push(apps[app].version);
                                }
                            }
                            return app_versions;
                        }
                    },
                    config: {
                        app_dir: '<%= app_dir %>',
                        app_version: '<%= app_version %>'
                    },
                    tasks: ['cssmin', 'uglify', 'json-replace', 'zip']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-json-replace');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-multi');
    grunt.registerTask('build', 'Build task', function(app) {
        grunt.task.run(['exec']);
        grunt.config.set('app', app);
        var concat = {};
        var apps = grunt.file.readJSON('apps.json');
        for (var app in apps) {
            if (grunt.config.get('app') == 'all' || grunt.config.get('app') == app) {
                var css_files = apps[app].assets.css;
                if (css_files.length) {
                    for (var i = 0; i < css_files.length; i++) {
                        css_files[i] = css_files[i].replace(/apps\//g, '');
                    }
                    concat[app + '_css'] = {
                        src: css_files,
                        dest: app + '/css/default.cache.css'
                    }
                }
                var js_files = apps[app].assets.js;
                if (js_files.length) {
                    for (var i = 0; i < js_files.length; i++) {
                        js_files[i] = js_files[i].replace(/apps\//g, '');
                    }
                    concat[app + '_js'] = {
                        src: js_files,
                        dest: app + '/js/default.cache.js'
                    }
                }
            }
        }
        grunt.config.set('concat', concat);
        grunt.task.run(['concat', 'multi']);
    });
};