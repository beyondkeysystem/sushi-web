(function() {

	'use strict';
	angular.module('controllers.order', [
		'ngRoute',
		'services.global',
		'services.general',
		'directives.categories',
		'directives.products',
		'directives.order'
	]).controller('OrderController', [
		'$scope',
		'$routeParams',
		'GlobalService',
		'GeneralService',
		function($scope, $routeParams, GlobalService, GeneralService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			$scope.config = GeneralService.GetConfig();
		}
	]);
})();
