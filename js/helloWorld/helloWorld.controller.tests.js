'use strict';

var expect = require('chai').expect;
var angular = require('angular');

var helloWorldModule = require('./helloWorld.controller');
var calculatorModule = require('../services/calculator/calculator.service');

describe('helloWorld', function() {
	var $controller;
	var mockCalculator;

	beforeEach(function() {
		angular.mock.module(helloWorldModule.moduleName);

		mockCalculator = {
			calculateResult: null,
			calculate: sinon.spy(function() { return mockCalculator.calculateResult; }),
		};

		angular.mock.module(function ($provide) {
			$provide.value(calculatorModule.factoryName, mockCalculator);
		});

		angular.mock.inject(['$controller', function(_$controller_) {
			$controller = _$controller_;
		}]);
	});

	it ('should have a message', function() {
		var controller = buildController();
		expect(controller.message).to.equal('Hello Angular explorers!')
	});

	function buildController() {
		return $controller(helloWorldModule.controllerName);
	}
});
