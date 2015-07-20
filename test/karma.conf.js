// Karma configuration

module.exports = function(config) {
	'use strict';

	var istanbul = require('browserify-istanbul');

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		plugins: [
			'karma-browserify',
			'karma-coverage',
			'karma-jasmine',
			'karma-html2js-preprocessor',
  			'karma-chrome-launcher',
  			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		],

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'browserify'],

		// list of files / patterns to load in the browser
		files: [
			{pattern: 'app/scripts/huge/**/*.js', watched: true, served: true, included: true},
			{pattern: 'test/unit/**/*.spec.js', watched: true, served: true, included: true},
			{pattern: 'test/unit/**/*.html', watched: true, served: true, included: true},
		],


		// list of files to exclude
		exclude: ['app/scripts/huge/main.js'],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
				'test/**/*.js': ['browserify'],
				// source files, that you wanna generate coverage for
				'app/scripts/huge/**/*.js': ['coverage', 'browserify'],
				// html fixtures
				'**/*.html': ['html2js']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec', 'coverage'],

		browserify: {
			debug: true,
			configure: function(bundle) {
				bundle.on('prebundle', function() {
					bundle.transform(istanbul({
						ignore: [
							'test/**/*.*'
						],
						defaultIgnore: true
					}));
				});
			}
		},


		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			'Chrome'
		//	'PhantomJS'
		],

		// optionally, configure the reporter
		coverageReporter: {
			reporters: [
			 	 {
			 	 	type : 'text-summary'
			 	 },
			 	 {
			 	 	type : 'text'
			 	 },
			 	 {
			 	 	type : 'html',
					dir : 'test/coverage/'
			 	 }
			]
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};