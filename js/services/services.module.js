'use strict';

var angular = require('angular');

var customStream = require('./customStream/customStream.service');

exports.moduleName = 'exp-ang.services';

angular.module(exports.moduleName, [
	customStream.moduleName,
]);
