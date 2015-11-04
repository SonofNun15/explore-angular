'use strict';

var angular = require('angular');

var mouseOverModule = require('./mouseOver/mouseOver');

exports.moduleName = 'exp-ang.behaviors';

angular.module(exports.moduleName, [
	mouseOverModule.moduleName,
]);
