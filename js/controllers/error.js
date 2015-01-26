(function() {

	'use strict';

	angular.module('controllers.error', [
		'ngRoute',
		'services.error'
	]).controller('ErrorController', [
		'$scope',
		'$location',
		'$routeParams',
		'ErrorService',
		function($scope, $location, $routeParams, ErrorService) {
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
