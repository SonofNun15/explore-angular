'use strict';

var angular = require('angular');

exports.moduleName = 'exp-ang.services.calculator';
exports.factoryName = 'calculator';

function calculatorFactory() {
	// public interface
	var service = {
		calculate: onCalculate,
	};

	// initialization
	var operations = {
		'+': add,

		'-': subtract,

		'*': multiply,
		'x': multiply,

		'/': divide,

		'^': power,
	}


	return service;

	function onCalculate(operator, operand1, operand2) {
		var operation = operations[operator];

		if (!angular.isUndefined(operation)) {
			return operation(operand1, operand2);
		}
	}

	function add(x, y) {
		return x + y;
	}

	function subtract(x, y) {
		return x - y;
	}

	function multiply(x, y) {
		return x * y;
	}

	function divide(x, y) {
		return x / y;
	}

	function power(x, y) {
		return Math.pow(x, y);
	}
}

angular.module(exports.moduleName, [])
	.factory(exports.factoryName, calculatorFactory);
