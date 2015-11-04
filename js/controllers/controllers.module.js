'use strict';

var angular = require('angular');

var eventConsumerModule = require('./eventConsumer/eventConsumer.controller');

exports.moduleName = 'exp-ang.controllers';

angular.module(exports.moduleName, [
	eventConsumerModule.moduleName,
]);
