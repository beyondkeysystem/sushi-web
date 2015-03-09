(function() {

	'use strict';

	angular.module('resources.general', [
		'resources.resource'
	]).factory('General', [
		'Resource',
		function(Resource) {

			var General = function(config) {
				var defaultProperties = {
					id: undefined,
					name: undefined,
					value: undefined
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return this;
			};

			Resource.$extend('General', General);

			return General;
		}
	]);
})();
