(function() {

	'use strict';

	angular.module('resources.order-item', [
		'resources.resource'
	]).factory('OrderItem', [
		'Resource',
		function(Resource) {

			var OrderItem = function(config) {
				var defaultProperties = {
					id: undefined,
					orderId: undefined,
					productId: undefined,
					amount: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('OrderItem', OrderItem);

			return OrderItem;
		}
	]);
})();
