(function() {

	'use strict';

	angular.module('resources.article', [
		'resources.resource'
	]).factory('Article', [
		'Resource',
		function(Resource) {

			var Article = function(config) {
				var defaultProperties = {
					id: undefined,
					title: undefined,
					description: undefined,
					image: undefined,
					order: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('Article', Article);

			return Article;
		}
	]);
})();
