(function() {

	'use strict';

	angular.module('resources.product', [
		'services.population-engine',
		'resources.resource',
		'resources.category'
	]).factory('Product', [
		'$http',
		'PopulationEngine',
		'Resource',
		'Category',
		function($http, PopulationEngine, Resource, Category) {

			var resourceMap = {
				category: Category
			};

			var Product = function(config) {
				var defaultProperties, populationEngine;
				defaultProperties = {
					id: undefined,
					name: undefined,
					plu: undefined,
					description: undefined,
					image: undefined,
					price: undefined,
					amount: undefined,
					category: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				populationEngine = PopulationEngine(this, resourceMap);
				populationEngine.setPopulated(true);
				return this;
			};

			Resource.$extend('Product', Product);

			return Product;
		}
	]);
})();
