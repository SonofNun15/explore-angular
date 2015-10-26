'use strict';

var expect = require('chai').expect;
var angular = require('angular');

var calculatorModule = require('./calculator.service');

describe('calculator', function() {
	var calculator;

	beforeEach(function() {
		angular.mock.module(calculatorModule.moduleName);
		angular.mock.inject([calculatorModule.factoryName, function(_calculator_) {
			calculator = _calculator_;
		}]);
	});

	it ('should add two numbers', function() {
		var result = calculator.calculate('+', 5, 3);
		expect(result).to.equal(8);
	});

	it ('should subtract two numbers', function() {
		var result = calculator.calculate('-', 5, 3);
		expect(result).to.equal(2);
	});

	it ('should multiply two numbers', function() {
		var result = calculator.calculate('*', 5, 3);
		expect(result).to.equal(15);

		var result = calculator.calculate('x', 10, 3);
		expect(result).to.equal(30);
	});

	it ('should divide two numbers', function() {
		var result = calculator.calculate('/', 6, 3);
		expect(result).to.equal(2);
	});

	it ('should raise a number to a power', function() {
		var result = calculator.calculate('^', 2, 8);
		expect(result).to.equal(256);
	});
});
