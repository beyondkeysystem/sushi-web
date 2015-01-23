(function() {

	'use strict';

	angular.module('controllers.logout', [
		'ngRoute',
		'services.auth'
	]).controller('LogoutController', [
		'$scope',
		'$location',
		'$routeParams',
		'AuthService',
		function($scope, $location, $routeParams, AuthService) {
			var _branches = ['funes', 'rosario'];
			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}
			if (AuthService.isOnline()) {
				AuthService.reset();
			}
			$location.path('/'+$scope.branch+'/login');
		}
	]);
})();
