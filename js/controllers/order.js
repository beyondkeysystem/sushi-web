(function() {

	'use strict';
	angular.module('controllers.order', [
		'ngRoute',
		'services.global',
		'directives.categories',
		'directives.products',
		'directives.order'
	]).controller('OrderController', [
		'$scope',
		'$routeParams',
		'GlobalService',
		function($scope, $routeParams, GlobalService) {
			$scope.isMobile = angular.isMobile();
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
		}
	]);
})();
