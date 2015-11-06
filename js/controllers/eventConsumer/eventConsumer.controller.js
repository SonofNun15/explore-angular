'use strict';

var angular = require('angular');

exports.moduleName = 'exp-ang.controllers.eventConsumer';
exports.controllerName = 'EventConsumerController';

EventConsumerController.$inject = ['$scope'];
function EventConsumerController($scope) {
	var self = this;

	consumeEventStream();

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
				$scope.$apply(function() { self.error = error; });
			}, function() {
				$scope.$apply(function() { self.finished = true; });
			});
		});
	}
}

angular.module(exports.moduleName, [])
	.controller(exports.controllerName, EventConsumerController);
