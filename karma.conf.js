module.exports = function(karma) {
	var options = {
		files: [
			'./node_modules/angular/angular.min.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			'**/*.tests.js',
		],

		preprocessors: {
            // add webpack as preprocessor
            '**/*.tests.js': ['webpack'],
        },

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],

        // enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

        // Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// level of logging
		// possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
		logLevel: karma.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		port: 2000,

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-webpack',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-ie-launcher',
		],

		webpack: {
			bail: true,
			externals: {
				'angular': 'angular',
			}
		},
	};

	karma.set(options);
	return options;
}