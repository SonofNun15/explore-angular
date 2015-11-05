'use strict';

var angular = require('angular');

var behaviorsModule = require('./behaviors/behaviors.module');
var controllersModule = require('./controllers/controllers.module');
var servicesModule = require('./services/services.module');

exports.moduleName = 'exp-ang';

angular.module(exports.moduleName, [
	behaviorsModule.moduleName,
	controllersModule.moduleName,
	servicesModule.moduleName,
]);
