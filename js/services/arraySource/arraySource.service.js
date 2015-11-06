'use strict';

var angular = require('angular');
var Rx = require('rx');

exports.moduleName = 'exp-ang.services.arraySource';
exports.serviceName = 'arraySource';

function arraySourceFactory() {
	var data;

	// public interface
	var service = {
		get: function() {
			return Rx.Observable.from(data);
		},
	};

	// initialization
	data = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 ];

	return service;
}

angular.module(exports.moduleName, [])
	.factory(exports.serviceName, arraySourceFactory);
