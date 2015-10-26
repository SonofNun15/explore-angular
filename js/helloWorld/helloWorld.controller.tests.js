'use strict';

var expect = require('chai').expect;
var angular = require('angular');

var helloWorldModule = require('./helloWorld.controller');

describe('helloWorld', function() {
	var $controller;

	beforeEach(function() {
		angular.mock.module(helloWorldModule.moduleName);
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
