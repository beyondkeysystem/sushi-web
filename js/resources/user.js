(function() {

	'use strict';

	angular.module('resources.user', [
		'resources.resource'
	]).factory('User', [
		'$http',
		'Resource',
		function($http, Resource) {

			var _prepareUI = function(obj) {
				obj.logo = obj.network;
				if (obj.network == 'google') {
					obj.logo = obj.network + '-plus';
				}
				return obj;
			};

			var User = function(config) {
				var defaultProperties = {
					_id: null,
					name: null,
					email: null,
					photo: null,
					network: null,
					logo: null,
					created: null
				};
				angular.extend(defaultProperties, new Resource(config));
				angular.extend(this, defaultProperties);
				return _prepareUI(this);
			};

			Resource.$extend('User', User);

			User.GetSession = function() {
				return User.Fetch('session', true);
			};

			User.GetExpirationDate = function() {
				return $http.get('/api/v1/user/expiration-date').then(
					function(response) {
						return response.data.expires;
					}
				);
			};

			User.Register = function(data) {
				return User.Save(data, false);
			};

			User.Login = function(email, pass) {
				var params = {email: email, password: pass};
				return Resource.Save('user/session', params).then(
					function(response) {
						return response.data;
					}
				);
			};

			User.Logout = function() {
				return $http['delete']('/api/v1/user/session').then(
					function(response) {
						return response.data;
					}
				);
			};

			return User;
		}
	]);
})();
