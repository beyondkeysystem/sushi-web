(function() {

	'use strict';

	angular.module('delimall', [
		'ngRoute',
		'config.routes',
		'controllers.error',
		'controllers.index',
		'controllers.home',
		'controllers.order',
		'controllers.admin',
		'controllers.admin-combos',
		'controllers.admin-general',
		'controllers.admin-products',
		'controllers.login',
		'controllers.logout',
		'services.auth',
		'services.global',
		'services.general',
		'services.error',
		'directives.header',
		'directives.navbar',
		'directives.footer',
	]).config([
		'$routeProvider',
		'$httpProvider',
		'RoutesProvider',
		function($routeProvider, $httpProvider, RoutesProvider) {
			var routes = RoutesProvider.getRoutes(), 
				expires = 0;
			angular.forEach(routes, function(route) {
				var resolve = route.hasOwnProperty('resolve') ? route.resolve : {};
				$routeProvider.when(route.url, {
					templateUrl: route.template,
					controller: route.controller + 'Controller',
					access: route.roles,
					resolve: route.resolve
				});
			});
			$routeProvider.otherwise({ redirectTo: '/error/404' });
			$httpProvider.interceptors.push([
				'$q',
				'$location',
				'$routeParams',
				'GlobalService',
				'ErrorService',
				function($q, $location, $routeParams, GlobalService, ErrorService) {
					return {
						'responseError': function(response) {
							var branch = GlobalService.Branch($routeParams.branch, false);
							var redirect = ErrorService.parse($location.path(), response);
							switch (redirect) {
								case 401:
									if($location.path().indexOf('/login') < 0){
										$location.path('/'+branch+'/logout');
									}
									break;
								case 403:
									$location.path('/error/403');
									break;
								case 404:
									$location.path('/error/404');
									break;
							}
							return $q.reject(response);
						}
					}
				}
			]);
			/**
			 * Setting default http headers for post requests with angulars $http provider
			 */
			 $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

			/**
			* The workhorse; converts an object to x-www-form-urlencoded serialization.
			* @param {Object} obj
			* @return {String}
			*/ 
			var param = function(obj) {
				var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
				for(name in obj) {
					value = obj[name];
					if(value instanceof Array) {
						for(i=0; i<value.length; ++i) {
							subValue = value[i];
							fullSubName = name + '[' + i + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if(value instanceof Object) {
						for(subName in value) {
							subValue = value[subName];
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if(value !== undefined && value !== null) {
						query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
					}
				}
				return query.length ? query.substr(0, query.length - 1) : query;
			};

			// Override $http service's default transformRequest
			$httpProvider.defaults.transformRequest = [function(data) {
				return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
			}];
		}
	]).run([
		'$rootScope',
		'$location',
		'$http',
		'AuthService',
		function($rootScope, $location, $http, AuthService) {
			$rootScope.$on("$routeChangeStart", function(event, next, current) {
				var user = AuthService.getUser();
				if (angular.isString(next.controller) && next.controller.length > 0) {
					user.currentPage = next.controller.substr(0, next.controller.indexOf("Controller")).toLowerCase();
				} else {
					user.currentPage = '';
				}
				AuthService.connect().then(
					function() {
						var branch = next.params.branch;
						if(next.controller === 'AdminController' && angular.isUndefined(branch)) {
							branch = 'rosario';
						}
						if (AuthService.isPrivatePage(next.access)) {
							if (!AuthService.isOnline()) {
								console.warn('Redirecting from "' + next.controller + '" to "login"');
								$location.path('/'+branch+'/login');
							}
						}
					}
				);
			});
		}
	]).controller('MainController', [
		'$scope',
		'GeneralService',
		function($scope, GeneralService) {
			$scope.config = GeneralService.GetConfig();
		}
	]);
})();
