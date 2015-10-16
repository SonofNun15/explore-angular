'use strict';

var angular = require('angular');

var helloWorldModule = require('./helloWorld/helloWorld.controller');

exports.moduleName = 'exp-ang';

angular.module(exports.moduleName, [
	helloWorldModule.moduleName,
]);
