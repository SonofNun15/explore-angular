var path = require('path');

module.exports = {
	entry: './js/app',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	externals: {
		'angular': 'angular',
	},
};
