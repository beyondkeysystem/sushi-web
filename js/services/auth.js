(function() {

	'use strict';

	angular.module('services.auth', [
			'ngRoute',
			'resources.resource',
			'resources.user'
		]).factory('AuthService', [
			'$q',
			'Resource',
			'User',
			function($q, Resource, User) {

				var _user = {
						id: undefined,
						firstName: undefined,
						lastName: undefined,
						email: undefined,
						phone: undefined,
						address: undefined,
						isAdmin: undefined,
						currentPage: undefined,
						expires: undefined,
						lastExpirationCheck: 0
					},
					_isConnected = false,
					_timeout = 60 * 1000;

				var _reset = function() {
					_user.id = undefined;
					_user.firstName = undefined;
					_user.lastName = undefined;
					_user.email = undefined;
					_user.phone = undefined;
					_user.address = undefined;
					_user.isAdmin = undefined;
					_user.expires = undefined;
					_user.lastExpirationCheck = 0;
					_isConnected = false;
					Resource.Clear();
				};

				var _set = function(data) {
					_reset();
					var isValid = angular.isObject(data) &&
						angular.isString(data.id) && data.id.length > 0 &&
						angular.isString(data.firstName) && data.firstName.length > 0;
						console.log(isValid, data);
					if (isValid) {
						_user.id = data.id;
						_user.firstName = data.firstName;
						_user.lastName = data.lastName;
						_user.email = data.email;
						_user.phone = data.phone;
						_user.address = data.address;
						_user.isAdmin = data.isAdmin;
						_user.expires = data.expires;
						_user.lastExpirationCheck = Date.now();
						_isConnected = true;
					}
					return _isConnected;
				};

				var _connect = function() {
					var defer;
					if (_isConnected) {
						if (Date.now() - _user.lastExpirationCheck > _timeout) {
							return User.GetExpirationDate().then(
								function(expires) {
									_user.expires = expires;
									_user.lastExpirationCheck = Date.now();
								}
							);
						} else {
							defer = $q.defer();
							defer.resolve(_user);
							return defer.promise;
						}
					} else {
						return User.GetSession().then(
							function(user) {
								if (angular.isObject(user) && angular.isString(user.id) && user.id.length > 0) {
									_set(user);
									_isConnected = true;
									User.GetExpirationDate().then(
										function(expires) {
											_user.expires = expires;
											_user.lastExpirationCheck = Date.now();
										}
									);
								}
								return _user;
							},
							function(err) {
								console.error(err);
								return _user;
							}
						);
					}
				};

				var _login = function(email, password) {
					return User.Login(email, password).then(
						function(response) {
							return _set(response.data);
						}
					);
				};

				var _register = function(data) {
					return User.Register(data).then(
						function(response) {
							return _set(response.data);
						}
					);
				};

				var _logout = function() {
					return User.Logout().then(
						function() {
							_reset();
						},
						function(err) {
							console.error(err);
						}
					);
				};

				_reset();

				return {
					connect: function() {
						return _connect();
					},
					reset: function() {
						return _reset();
					},
					login: function(email, password) {
						return _login(email, password);
					},
					register: function(data) {
						return _register(data);
					},
					logout: function() {
						return _logout();
					},
					getUser: function() {
						return _user;
					},
					isOnline: function() {
						return angular.isString(_user.id) && _user.id.length;
					},
					isPrivatePage: function(pageAccess) {
						return angular.isArray(pageAccess) && pageAccess.length;
					}
				};
			}
		]);
})();
