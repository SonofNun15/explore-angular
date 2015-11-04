'use strict';

var angular = require('angular');

var behaviorsModule = require('./behaviors/behaviors.module');
var controllersModule = require('./controllers/controllers.module');

exports.moduleName = 'exp-ang';

angular.module(exports.moduleName, [
	behaviorsModule.moduleName,
	controllersModule.moduleName,
]);
