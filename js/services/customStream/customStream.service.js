'use strict';

var angular = require('angular');
var Rx = require('rx');

exports.moduleName = 'exp-ang.services.customStream';
exports.serviceName = 'customStream';

function customStreamFactory() {
	var subject;
	// public interface
	var service = {
		get: function() {
			return subject;
		},
		error: function() {
			subject.onError('An error was triggered');
		},
		end: function() {
			subject.onCompleted();
			subscription.dispose();
		},
	};

	// initialization
	subject = new Rx.Subject();

	var subscription = Rx.Observable.interval(1000)
		.map(function(x) { return x * 10; })
		.subscribe(function(x10) {
			subject.onNext(x10);
		})

	return service;
}

angular.module(exports.moduleName, [])
	.factory(exports.serviceName, customStreamFactory);
