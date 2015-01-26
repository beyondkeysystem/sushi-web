(function() {

	'use strict';

	angular.module('resources.category', [
		'resources.resource'
	]).factory('Category', [
		'$http',
		'Resource',
		function($http, Resource) {

			var Category = function(config) {
				var defaultProperties = {
					id: null,
					name: null,
					image: null,
					description: null,
					order: null
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('Category', Category);

			return Category;
		}
	]);
})();
