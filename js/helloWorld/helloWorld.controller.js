'use strict';

var angular = require('angular');

exports.moduleName = 'exp-ang.helloWorld';
exports.controllerName = 'HelloWorldController';

function HelloWorldController() {
	var self = this;
	self.message = 'Hello Angular explorers!';
}

angular.module(exports.moduleName, [])
	.controller(exports.controllerName, HelloWorldController);
