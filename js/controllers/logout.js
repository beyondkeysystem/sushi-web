(function() {

	'use strict';

	angular.module('controllers.logout', [
		'ngRoute',
		'services.global',
		'services.auth'
	]).controller('LogoutController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'AuthService',
		function($scope, $location, $routeParams, GlobalService, AuthService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			if (AuthService.isOnline()) {
				AuthService.reset();
			}
			$location.path('/'+$scope.branch+'/login');
		}
	]);
})();
