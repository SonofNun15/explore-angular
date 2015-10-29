'use strict';

var angular = require('angular');

var calculatorModule = require('../services/calculator/calculator.service');

exports.moduleName = 'exp-ang.helloWorld';
exports.controllerName = 'HelloWorldController';

HelloWorldController.$inject = [calculatorModule.factoryName];
function HelloWorldController(calculator) {
	// public interface
	var self = this;
	self.message = 'Hello Angular explorers!';

	self.operand1 = null;
	self.operator = null;
	self.operand2 = null;

	self.equals = onEquals;

	self.result = null;

	self.error = null;

	// implementations
	function onEquals() {
		self.result = calculator.calculate(self.operator, self.operand1, self.operand2);

		if (angular.isUndefined(self.result)) {
			self.error = '"' + self.operator + '" is not supported';
		} else {
			self.error = null;
		}
	}
}

angular.module(exports.moduleName, [calculatorModule.moduleName])
	.controller(exports.controllerName, HelloWorldController);
