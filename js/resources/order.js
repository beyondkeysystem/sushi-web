(function() {

	'use strict';

	angular.module('resources.order', [
		'resources.resource'
	]).factory('Order', [
		'Resource',
		function(Resource) {

			var Order = function(config) {
				var defaultProperties = {
					id: undefined,
					userId: undefined,
					date: undefined,
					dateFrom: undefined,
					timeFrom: undefined,
					dateTo: undefined,
					timeTo: undefined,
					paid: undefined,
					deliver: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('Order', Order);

			return Order;
		}
	]);
})();
