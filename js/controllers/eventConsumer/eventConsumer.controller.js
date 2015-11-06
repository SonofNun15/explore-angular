'use strict';

var angular = require('angular');
var customStream = require('../../services/customStream/customStream.service');

exports.moduleName = 'exp-ang.controllers.eventConsumer';
exports.controllerName = 'EventConsumerController';

EventConsumerController.$inject = ['$scope', customStream.serviceName];
function EventConsumerController($scope, customStream) {
	var self = this;

	// --- public interface ---
	// Event
	self.hitCount = 0;
	self.xPos = null;
	self.finished = false;
	self.eventError = null;

	// Custom
	self.customCurrentValue = null;
	self.customFinished = false;
	self.customError = null;

	self.finishCustom = customStream.end;
	self.generateCustomError = customStream.error;

	// --- initialize ---
	consumeEventStream();
	consumeCustomStream();

	function consumeEventStream() {
		var oldSubscription;

		self.hitCount = 0;

		$scope.$watch('eventStream', function(newValue) {
			if (oldSubscription) {
				oldSubscription.dispose();
			}

			var xCoordStream = newValue.map(function(event) {
				return {
					position: event.offsetX,
				};
			}).sample(1000 /*ms*/);

			oldSubscription = xCoordStream.subscribe(function(data) {
				$scope.$apply(function() { self.hitCount++; self.xPos = data.position; });
			}, function(error) {
				$scope.$apply(function() { self.eventError = error; });
			}, function() {
				$scope.$apply(function() { self.finished = true; });
			});
		});
	}

	function consumeCustomStream() {
		// Use controlled() to cause stream to only supply values on request
		var customSourceStream = customStream.get();

		customSourceStream.subscribe(function(value) {
			$scope.$apply(function() {
				self.currentCustomValue = value;
			});
		}, function(error) {
			self.customError = error;
		}, function() {
			self.customFinished = true;
		});
	}
}

angular.module(exports.moduleName, [customStream.moduleName])
	.controller(exports.controllerName, EventConsumerController);
