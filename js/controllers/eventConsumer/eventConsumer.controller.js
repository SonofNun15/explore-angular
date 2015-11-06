'use strict';

var angular = require('angular');
var Rx = require('rx');

var customStream = require('../../services/customStream/customStream.service');
var arraySource = require('../../services/arraySource/arraySource.service');

exports.moduleName = 'exp-ang.controllers.eventConsumer';
exports.controllerName = 'EventConsumerController';

EventConsumerController.$inject = ['$scope', customStream.serviceName, arraySource.serviceName];
function EventConsumerController($scope, customStream, arraySource) {
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

	// Array
	self.arrayCurrentValue = null;
	self.arrayFinished = false;
	self.arrayError = null;

	// --- initialize ---
	consumeEventStream();
	consumeCustomStream();
	consumeArrayStream();

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

	function consumeArrayStream() {
		// Use controlled() to cause stream to only supply values on request
		var controlledArraySource = arraySource.get().controlled();
		var pullData;

		// Display each value from the stream
		controlledArraySource.subscribe(function(value) {
			self.arrayCurrentValue = value;
		}, function(error) {
			self.arrayError = error;
		}, function() {
			self.arrayFinished = true;
			pullData.dispose();
		});

		// Request values at regular intervals
		pullData = Rx.Observable.interval(1000).subscribe(function() {
			$scope.$apply(function() { controlledArraySource.request(1); });
		});
	}
}

angular.module(exports.moduleName, [customStream.moduleName, arraySource.moduleName])
	.controller(exports.controllerName, EventConsumerController);
