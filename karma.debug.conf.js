var defaultConfig = require('./karma.conf.js');

module.exports = function(karma) {
	var options = defaultConfig(karma);
	options.singleRun = false;
	options.webpack.devtool = 'inline-source-map';
	karma.set(options);

	return options;
}
