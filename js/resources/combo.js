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
					id: null,
					name: null,
					description: null,
					image: null,
					price1: null,
					amount1: null,
					price2: null,
					amount2: null,
					price3: null,
					amount3: null,
					price4: null,
					amount4: null
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
