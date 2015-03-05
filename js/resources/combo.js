(function() {

	'use strict';

	angular.module('resources.combo', [
		'resources.resource'
	]).factory('Combo', [
		'$http',
		'Resource',
		function($http, Resource) {

			var Combo = function(config) {
				var defaultProperties = {
					id: undefined,
					name: undefined,
					description: undefined,
					image: undefined,
					price1: undefined,
					amount1: undefined,
					price2: undefined,
					amount2: undefined,
					price3: undefined,
					amount3: undefined,
					price4: undefined,
					amount4: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('Combo', Combo);

			return Combo;
		}
	]);
})();
