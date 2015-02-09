(function() {

	'use strict';
	angular.module('controllers.home', [
		'ngRoute',
		'services.global',
		'directives.home-slider'
	]).controller('HomeController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		function($scope, $location, $routeParams, GlobalService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			if(angular.isMobile()){
				$location.path('/'+$scope.branch+'/pedidos');
			}
			$scope.page = GlobalService.Page();
		}
	]);
})();
