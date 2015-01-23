(function() {

	'use strict';

	angular.module('controllers.error', [
		'ngRoute',
		'services.error'
	]).controller('ErrorController', [
		'$scope',
		'$routeParams',
		'ErrorService',
		function($scope, $routeParams, ErrorService) {
			var _branches = ['funes', 'rosario'];
			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}
			$scope.code = $routeParams.error;
			$scope.error = ErrorService.getCurrent();
			if (angular.isObject($scope.error) && !$scope.error.shown) {
				$scope.error.shown = true;
			} else {
				$scope.error = {
					title: 'Página no encontrada',
					description: 'La página solicitada no existe',
					shown: true
				};
			}
		}
	]);
})();
