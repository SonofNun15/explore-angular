'use strict';

var angular = require('angular');
var Rx = require('rx');

exports.moduleName = 'exp-ang.behaviors.mouseOver';
exports.directiveName = 'eaMouseOver';

function mouseOverDirective() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			var eventStream = Rx.Observable.fromEvent(element, 'mousemove');

			// Use the value of the eaMouseOver attribute as the name to save to on the scope
			scope[attributes.eaMouseOver] = eventStream;
		},
	};
}

angular.module(exports.moduleName, [])
	.directive(exports.directiveName, mouseOverDirective);
