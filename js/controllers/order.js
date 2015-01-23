(function() {

	'use strict';
	angular.module('controllers.order', [
		'ngRoute',
	]).controller('OrderController', [
		'$scope',
		'$location',
		'$routeParams',
		function($scope, $location, $routeParams) {
			var _branches = ['funes', 'rosario'];

			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}
		}
	]);
})();
